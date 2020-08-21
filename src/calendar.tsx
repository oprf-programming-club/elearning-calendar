import { YearMonth } from "./";
import { WithConfig } from "./config";
import { isAWeek, daysInWeek, isSkipped, CalendarDay } from "./data";
import * as data from "./data";

import React, { FunctionComponent } from "react";

interface CalendarProps extends WithConfig {
  month: YearMonth;
  onDayClick: (day: CalendarDay) => void;
}
export const Calendar: FunctionComponent<CalendarProps> = ({
  month,
  config,
  onDayClick,
}) => {
  const { weeks } = month;
  let curDayIsA: boolean | null = null;
  return (
    <table>
      <tbody className="calendargrid">
        {weeks.map((week) => {
          if (curDayIsA == null) {
            curDayIsA = isAWeek(week);
          }
          return (
            <tr key={+week}>
              {daysInWeek(week, (day) => {
                const isA = curDayIsA;
                const skip = isSkipped(day) || [0, 6].includes(day.day());
                if (!skip) curDayIsA = !curDayIsA;
                const show = !(skip || day.isBefore(data.firstDay));
                const calDay: CalendarDay = {
                  date: day,
                  isA: show ? isA : null,
                };
                return (
                  <td
                    onClick={() => onDayClick(calDay)}
                    key={+day}
                    className={show ? (isA ? "aday" : "bday") : "noday"}
                  >
                    <CalDay day={calDay} config={config} />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
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
          {data.getClassesForDay(day, config, true).map((c) => {
            if (c == null)
              return <React.Fragment key={-1}>{"\u200b"}</React.Fragment>;
            const { dayPeriod, cls } = c;
            return (
              <li key={cls.period}>
                {data.getClassTimes(dayPeriod)[0].format("hh:mm")} - {cls.name}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
