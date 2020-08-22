import * as config from "./config";
import dayjs, { Dayjs } from "dayjs";
import iterate from "iterare";

export class YearMonth {
  public readonly date: Dayjs;
  public readonly startDate: Dayjs;
  public readonly endDate: Dayjs;
  constructor(public readonly year: number, public readonly month: number) {
    this.date = dayjs().year(this.year).month(this.month);
    this.startDate = this.date.startOf("M");
    this.endDate = this.date.endOf("M");
  }
  static fromDate(d: Dayjs) {
    return new YearMonth(d.year(), d.month());
  }
  static thisMonth() {
    return YearMonth.fromDate(dayjs());
  }
  add(n: number) {
    return YearMonth.fromDate(this.date.add(n, "M"));
  }
  *weeks(weekdaysOnly: boolean = false) {
    const { startDate, endDate } = this;
    let start = startDate;
    if (weekdaysOnly && startDate.day() == 6) {
      start = start.add(1, "w");
    }
    for (const curWeek of weeksFrom(start)) {
      const isLast = curWeek.isSame(endDate, "w");
      const skip = isLast && weekdaysOnly && endDate.day() == 0;
      if (!skip) yield curWeek;
      if (isLast) break;
    }
  }
  inside(d: Dayjs) {
    return insideRange(d, this.date, "w");
  }
}

// sorted array of off days, e.g. labor day 🌹
export const skippedDays: Dayjs[] = [dayjs("September 7 2020")];

export const isSkipped = (d: Dayjs) =>
  skippedDays.some((skipped) => d.isSame(skipped, "d"));

export const isWeekend = (d: Dayjs) => {
  const day = d.day();
  return day === 0 || day === 6;
};

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

export function* daysInWeek(w: Dayjs): Iterable<Dayjs> {
  let curDay = w.startOf("w");
  while (curDay.isSame(w, "week")) {
    yield curDay;
    curDay = curDay.add(1, "d");
  }
}

export function* weeksFrom(d: Dayjs) {
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
  let isA =
    isSkipped(day) || day.isBefore(firstDay) || isWeekend(day)
      ? null
      : isAWeek(week);
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
): Iterable<ClassWithTime>;
export function getClassesForDay(
  day: CalendarDay,
  config: config.Config,
  includeNoAdvisory: true,
): Iterable<ClassWithTime | null>;
export function* getClassesForDay(
  day: CalendarDay,
  config: config.Config,
  includeNoAdvisory?: boolean,
): Iterable<ClassWithTime | null> {
  if (isAdvisoryDay(day.date)) {
    yield { dayPeriod: -1, cls: config.advisory };
  } else if (includeNoAdvisory) {
    yield null;
  }
  const firstPeriod = day.isA ? 0 : 4;
  let i = 0;
  yield* iterate(config.classes)
    .slice(firstPeriod, firstPeriod + 5)
    .map((cls) => ({ dayPeriod: i++, cls }));
}
