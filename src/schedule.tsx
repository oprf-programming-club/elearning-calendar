import React, { FunctionComponent } from "react";
import cx from "classnames";
import {
  CalendarDay,
  getClassesForDay,
  ClassWithTime,
  formatRange,
  getClassTimes,
} from "./data";
import { WithConfig } from "./config";
import dayjs, { Dayjs } from "dayjs";

interface SchedulePanelProps extends WithConfig {
  day: CalendarDay;
  viewMenuCb: () => void;
}
export const SchedulePanel: FunctionComponent<SchedulePanelProps> = ({
  day,
  config,
  viewMenuCb,
}) => {
  return (
    <div className="schedule-panel colflex">
      <div>
        <h3>{day.date.format("MMM D YYYY")}</h3>
        <ul>
          {getClassesForDay(day, config).map((c) => (
            <ClassItem key={c.cls.period} cls={c} day={day} />
          ))}
        </ul>
      </div>
      <p>
        <button onClick={viewMenuCb}>Edit Classes</button>
      </p>
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
let now = dayjs("aug 20 2020 7:20 am");
const ClassItem: FunctionComponent<ClassItemProps> = ({
  cls: { cls, dayPeriod },
  day,
}) => {
  const times = getClassTimes(dayPeriod);
  const start = sameDay(times[0], day.date),
    end = sameDay(times[1], day.date);
  const upcoming = dayjs().isBetween(start.subtract(15, "m"), end);
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
          <a href={cls.meeting}>Meeting Link</a>
        </p>
      )}
    </li>
  );
};

const sameDay = (d: Dayjs, today: Dayjs) =>
  d.date(today.date()).month(today.month()).year(today.year());
