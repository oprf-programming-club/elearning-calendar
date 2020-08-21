import React, {
  FunctionComponent,
  useState,
  useEffect,
  useReducer,
} from "react";
import ReactDOM from "react-dom";
import { MdHome, MdSettings } from "react-icons/md";

import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import { insideRange } from "./data";
import * as data from "./data";
import { dispatch as configReduce } from "./config";
import { Calendar } from "./calendar";
import { defaultConfig, Config } from "./config";
import { HashRouter, Link, Route } from "react-router-dom";
import { IconType } from "react-icons/lib";
import ConfigMenu from "./configMenu";
import SchedulePanel from "./schedule";

export class YearMonth {
  constructor(public year: number, public month: number) {}
  static fromDate(d: Dayjs) {
    return new YearMonth(d.year(), d.month());
  }
  static thisMonth() {
    return YearMonth.fromDate(dayjs());
  }
  add(n: number) {
    return YearMonth.fromDate(this.date.add(n, "M"));
  }
  get date() {
    return dayjs().year(this.year).month(this.month);
  }
  get startDate() {
    return this.date.startOf("M");
  }
  get endDate() {
    return this.date.endOf("M");
  }
  get weeks() {
    const { startDate, endDate } = this;
    const weeks = [];
    let curWeek = startDate.startOf("w");
    while (curWeek.isBefore(endDate)) {
      weeks.push(curWeek);
      curWeek = curWeek.add(1, "w");
    }
    return weeks;
  }
  inside(d: Dayjs) {
    return insideRange(d, this.date, "w");
  }
}

const App: FunctionComponent = () => {
  useEffect(() => {
    const id = setInterval(() => {
      setActiveDay(data.calendarDayFromDate(dayjs()));
    }, 1000 * 60 * 10); // 10 minutes
    return () => clearInterval(id);
  });
  const [config, dispatchConfig] = useReducer(
    configReduce,
    null,
    (): Config => {
      const cfg = localStorage.getItem("calConfig");
      return cfg ? JSON.parse(cfg) : defaultConfig;
    },
  );
  const [month, setMonth] = useState(() => YearMonth.thisMonth());
  const [activeDay, setActiveDay] = useState<data.CalendarDay>(() =>
    data.calendarDayFromDate(dayjs()),
  );
  return (
    <React.Suspense fallback={<></>}>
      <div className="flexbar">
        <HashRouter hashType="noslash">
          <Route path="/settings">
            <ConfigMenu dispatch={dispatchConfig} config={config} />
          </Route>
          <Route exact path="/">
            <div className="calcontainer">
              <div className="flexbar">
                <button onClick={() => setMonth(month.add(-1))}>{"<"}</button>
                <div>
                  <b>{month.date.format("MMM YYYY")}</b>
                </div>
                <button onClick={() => setMonth(month.add(1))}>{">"}</button>
              </div>
              <Calendar
                onDayClick={setActiveDay}
                month={month}
                config={config}
              />
            </div>
            <SchedulePanel day={activeDay} config={config} />
          </Route>
          <div className="sidebar">
            <SidebarIcon to="/" icon={MdHome} />
            <SidebarIcon to="/settings" icon={MdSettings} />
          </div>
        </HashRouter>
      </div>
    </React.Suspense>
  );
};

const SidebarIcon: FunctionComponent<{ to: string; icon: IconType }> = ({
  icon: Icon,
  to,
}) => (
  <Link to={to}>
    <Icon size="2vw" className="sidebaricon" />
  </Link>
);

ReactDOM.render(<App />, document.getElementById("app"));
