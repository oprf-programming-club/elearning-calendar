import * as config from "./config";
import dayjs, { Dayjs } from "dayjs";

// sorted array of off days, e.g. labor day 🌹
export const skippedDays: Dayjs[] = [dayjs("September 7 2020")];

export const isSkipped = (d: Dayjs) =>
  skippedDays.some((skipped) => d.isSame(skipped, "d"));

export const numSkippedInWeek = (w: Dayjs) => {
  let n = 0;
  let reachedWeek = false;
  for (const d of skippedDays) {
    if (insideRange(d, w, "w")) {
      n += 1;
      reachedWeek = true;
    } else if (reachedWeek) break;
  }
  return n;
};

export const firstDay: Dayjs = dayjs("19 aug 2020");

// [week, isAWeek]
export const rootWeeks: [Dayjs, boolean][] = [[firstDay.startOf("w"), true]];

export const isAdvisoryDay = (d: Dayjs) => d.day() == 3; // wednesday

export type DateRange = [Dayjs, Dayjs];

const oclock = (h: number, m: number) => dayjs().hour(h).minute(m).startOf("m");

export const advisoryRange: DateRange = [oclock(8, 35), oclock(8, 45)];

const classRanges: DateRange[] = [];
let start = oclock(9, 0);
for (let i = 0; i < 4; i++) {
  const end = start.add(1, "hour");
  classRanges.push([start, end]);
  start = end.add(30, "m");
}

export const getClassTimes = (daypd: number) =>
  daypd == -1 ? advisoryRange : classRanges[daypd];

const rangeFmt = "h:mm";
export const formatRange = ([start, end]: DateRange) =>
  `${start.format(rangeFmt)}-${end.format(rangeFmt)}`;

export function insideRange(d: Dayjs, range: Dayjs, ty: dayjs.OpUnitType) {
  return d.isBetween(range.startOf(ty), range.endOf(ty));
}

export function daysInWeek(w: Dayjs): Dayjs[];
export function daysInWeek<T>(w: Dayjs, map: (d: Dayjs) => T): T[];
export function daysInWeek(w: Dayjs, map?: (d: Dayjs) => any): any[] {
  const days = [];
  const endDate = w.endOf("w");
  let curDay = w.startOf("w");
  while (curDay.isBefore(endDate)) {
    days.push(map ? map(curDay) : curDay);
    curDay = curDay.add(1, "d");
  }
  return days;
}

function* weeksFrom(d: Dayjs) {
  let cur = d.startOf("w");
  while (true) {
    yield cur;
    cur = cur.add(1, "w");
  }
}

export const isAWeek = (w: Dayjs): boolean => {
  for (const [rootW, isA] of rootWeeks) {
    if (rootW.isSame(w, "w")) {
      return isA;
    }
    if (rootW.isBefore(w)) {
      let curA = isA;
      for (const week of weeksFrom(rootW)) {
        if (week.isSame(w, "w")) {
          return curA;
        }
        if (numSkippedInWeek(week) % 2 == 0) {
          curA = !curA;
        }
      }
    }
  }
  return false;
};

export interface CalendarDay {
  date: Dayjs;
  isA: boolean | null;
}

export const calendarDayFromDate = (d: Dayjs): CalendarDay => {
  const day = d.startOf("d");
  const week = day.startOf("w");
  let isA = isSkipped(day) || day.isBefore(firstDay) ? null : isAWeek(week);
  let curDay = day.day(1);
  if (isA != null) {
    while (true) {
      if (curDay.isSame(day)) break;
      if (!isSkipped(curDay)) isA = !isA;
      curDay = curDay.add(1, "d");
    }
  }
  return { date: day, isA };
};

export interface ClassWithTime {
  cls: config.Class;
  dayPeriod: number;
}

export function getClassesForDay(
  day: CalendarDay,
  config: config.Config,
  includeNoAdvisory?: false,
): ClassWithTime[];
export function getClassesForDay(
  day: CalendarDay,
  config: config.Config,
  includeNoAdvisory: true,
): Array<ClassWithTime | null>;
export function getClassesForDay(
  day: CalendarDay,
  config: config.Config,
  includeNoAdvisory?: boolean,
): Array<ClassWithTime | null> {
  return [
    ...(isAdvisoryDay(day.date)
      ? [{ dayPeriod: -1, cls: config.advisory }]
      : includeNoAdvisory
      ? [null]
      : []),
    ...(day.isA
      ? config.classes.slice(0, 4)
      : config.classes.slice(4, 8)
    ).map((cls, i) => ({ dayPeriod: i, cls })),
  ];
}
