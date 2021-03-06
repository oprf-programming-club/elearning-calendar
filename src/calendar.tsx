import { WithConfig } from "./config";
import {
  YearMonth,
  isAWeek,
  daysInWeek,
  isSkipped,
  CalendarDay,
  isWeekend,
} from "./data";
import * as data from "./data";

import iterate from "iterare";

import React, { FunctionComponent } from "react";
import cx from "classnames";

interface CalendarProps extends WithConfig {
  month: YearMonth;
  onDayClick: (day: CalendarDay) => void;
}
export const Calendar: FunctionComponent<CalendarProps> = ({
  month,
  config,
  onDayClick,
}) => {
  const weeks = month.weeks(true);
  const rows = iterate(weeks).map((week) => {
    let curDayIsA = isAWeek(week);
    return (
      <tr key={+week}>
        {iterate(daysInWeek(week))
          .map((day) => {
            const isA = curDayIsA;
            const skip = isSkipped(day) || isWeekend(day);
            if (!skip) curDayIsA = !curDayIsA;
            const hide =
              skip || day.isBefore(data.firstDay) || day.isAfter(data.lastDay);
            const calDay: CalendarDay = {
              date: day,
              isA: hide ? null : isA,
            };
            return (
              <td
                onClick={() => onDayClick(calDay)}
                key={+day}
                className={cx(
                  "calday",
                  hide ? "noday" : isA ? "aday" : "bday",
                  (day < month.startDate || day > month.endDate) && "notmonth",
                )}
              >
                <CalDay day={calDay} config={config} />
              </td>
            );
          })
          .toArray()}
      </tr>
    );
  });
  return (
    <table>
      <tbody className="calendargrid">{rows.toArray()}</tbody>
    </table>
  );
};

interface CalDayProps extends WithConfig {
  day: CalendarDay;
}
const CalDay: FunctionComponent<CalDayProps> = ({ day, config }) => {
  return (
    <>
      <p className="lmar">
        <b>{day.date.format("MMM D")}</b>
      </p>
      {day.isA == null ? null : (
        <ul className="nomartop">
          {iterate(data.getClassesForDay(day, config, true))
            .map((c) => {
              if (c == null)
                return <React.Fragment key={-1}>{"\u200b"}</React.Fragment>;
              const { dayPeriod, cls } = c;
              const sched = data.classifySchedule(day.date);
              return (
                <li key={cls.period} className="calClassItem">
                  <span className="calClassTime">
                    {data.getClassTimes(sched, dayPeriod)[0].format("hh:mm")}
                    {" - "}
                  </span>
                  {cls.name}
                </li>
              );
            })
            .toArray()}
        </ul>
      )}
    </>
  );
};
