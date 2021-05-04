import React, { FunctionComponent } from "react";
import cx from "classnames";
import {
  CalendarDay,
  getClassesForDay,
  ClassWithTime,
  formatRange,
  getClassTimes,
  classifySchedule,
  periodCountdownMinutes,
} from "./data";
import { WithConfig } from "./config";
import dayjs, { Dayjs } from "dayjs";
import iterate from "iterare";

interface SchedulePanelProps extends WithConfig {
  day: CalendarDay;
}
export const SchedulePanel: FunctionComponent<SchedulePanelProps> = ({
  day,
  config,
}) => {
  return (
    <div className="schedule-panel colflex">
      <div>
        <h3>{day.date.format("MMM D YYYY")}</h3>
        {day.isA == null ? (
          <p>Nothing for today!</p>
        ) : (
          <ul>
            {iterate(getClassesForDay(day, config))
              .map((c) => <ClassItem key={c.cls.period} cls={c} day={day} />)
              .toArray()}
          </ul>
        )}
      </div>
      <p>
        <a href="https://github.com/oprf-programming-club/elearning-calendar">
          Made with ❤️ by the OPRF programming club
        </a>
      </p>
    </div>
  );
};

interface ClassItemProps {
  cls: ClassWithTime;
  day: CalendarDay;
}
const ClassItem: FunctionComponent<ClassItemProps> = ({
  cls: { cls, dayPeriod },
  day,
}) => {
  const sched = classifySchedule(day.date);
  const times = getClassTimes(sched, dayPeriod);
  const start = sameDay(times[0], day.date),
    end = sameDay(times[1], day.date);
  const upcoming = dayjs().isBetween(
    start.subtract(periodCountdownMinutes[sched], "m"),
    end,
  );
  return (
    <li className={cx(upcoming && "cls-upcoming")}>
      <p>
        {formatRange(times)} - {cls.name}
      </p>
      {cls.classroom == null ? null : (
        <p>
          <a href={cls.classroom}>Google Classroom</a>
        </p>
      )}
      {cls.meeting == null ? null : (
        <p>
          <a href={cls.meeting} target="_blank" rel="noopener noreferrer">
            Meeting Link
          </a>
        </p>
      )}
    </li>
  );
};

const sameDay = (d: Dayjs, today: Dayjs) =>
  d.date(today.date()).month(today.month()).year(today.year());

export default SchedulePanel;
