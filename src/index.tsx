import React, {
  FunctionComponent,
  useState,
  useEffect,
  useReducer,
} from "react";
import ReactDOM from "react-dom";
import { MdHome, MdSettings } from "react-icons/md";
import cx from "classnames";

const PopupLazy = React.lazy(() =>
  //@ts-ignore
  import("reactjs-popup").then((x) => ({ default: x })),
);

import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import { insideRange, weeksFrom } from "./data";
import * as data from "./data";
import { dispatch as configReduce } from "./config";
import { Calendar } from "./calendar";
import { defaultConfig, Config } from "./config";
import { HashRouter, Link, Route, useRouteMatch } from "react-router-dom";
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

const App: FunctionComponent = () => {
  useEffect(() => {
    const id = setInterval(() => {
      setActiveDay(data.calendarDayFromDate(dayjs()));
    }, 1000 * 60 * 10); // 10 minutes
    return () => clearInterval(id);
  });
  const [tooltipActive, setTooltipActive] = useState(false);
  const [config, dispatchConfig] = useReducer(
    configReduce,
    null,
    (): Config => {
      const cfg = localStorage.getItem("calConfig");
      if (cfg) {
        return JSON.parse(cfg);
      }
      return defaultConfig;
    },
  );
  useEffect(() => {
    if (localStorage.getItem("calConfig")) return;
    const id = setTimeout(() => setTooltipActive(true), 2000);
    return () => clearTimeout(id);
  }, []);
  const [month, setMonth] = useState(() => YearMonth.thisMonth());
  const [activeDay, setActiveDay] = useState<data.CalendarDay>(() =>
    data.calendarDayFromDate(dayjs()),
  );
  return (
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
            <Calendar onDayClick={setActiveDay} month={month} config={config} />
          </div>
          <SchedulePanel day={activeDay} config={config} />
        </Route>
        <div className="sidebar">
          <SidebarIcon exact to="/" icon={MdHome} />
          <Popup
            trigger={<SidebarIcon to="/settings" icon={MdSettings} />}
            open={tooltipActive}
            position="left bottom"
            onClose={() => setTooltipActive(false)}
          >
            <span>go to settings to fill in classes</span>
          </Popup>
        </div>
      </HashRouter>
    </div>
  );
};

const Popup: FunctionComponent<import("reactjs-popup").Props> = (props) => (
  <React.Suspense fallback={props.trigger || null}>
    <PopupLazy {...props} />
  </React.Suspense>
);

const SidebarIcon: FunctionComponent<
  import("react-router-dom").LinkProps & {
    to: string;
    icon: IconType;
    exact?: boolean;
  }
> = React.forwardRef(({ icon: Icon, exact, ...props }, ref) => {
  const matched = useRouteMatch({ path: props.to, exact });
  return (
    <Link {...props} ref={ref as any}>
      <Icon className={cx("sidebaricon", !!matched && "activeicon")} />
    </Link>
  );
});

ReactDOM.render(<App />, document.getElementById("app"));
