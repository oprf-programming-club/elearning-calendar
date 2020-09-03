import React, {
  FunctionComponent,
  useState,
  useEffect,
  useReducer,
} from "react";
import { MdSettings } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import cx from "classnames";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import { YearMonth } from "./data";
import * as data from "./data";
import { dispatch as configReduce } from "./config";
import { Calendar } from "./calendar";
import { defaultConfig, Config } from "./config";
import { HashRouter, Link, Route, useRouteMatch } from "react-router-dom";
import { IconType } from "react-icons/lib";
import ConfigMenu from "./configMenu";
import SchedulePanel from "./schedule";

let lstorageResult: string | null | undefined = undefined;
const getStorage = () => {
  if (lstorageResult === undefined) {
    lstorageResult = localStorage.getItem("calConfig");
  }
  return lstorageResult;
};

export const App: FunctionComponent = () => {
  useEffect(() => {
    const id = setInterval(() => {
      setActiveDay(data.calendarDayFromDate(dayjs()));
    }, 1000 * 60 * 10); // 10 minutes
    return () => clearInterval(id);
  });
  const [tooltipEnabled, setTooltipEnabled] = useState(() => !getStorage());
  const [tooltipActive, setTooltipActive] = useState(false);
  const [config, dispatchConfig] = useReducer(
    configReduce,
    null,
    (): Config => {
      const cfg = getStorage();
      if (cfg) {
        return JSON.parse(cfg);
      }
      return defaultConfig;
    },
  );
  useEffect(() => {
    if (getStorage()) return;
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
          <SidebarIcon exact to="/" icon={IoMdCalendar} />
          <Popup
            enable={tooltipEnabled}
            trigger={<SidebarIcon to="/settings" icon={MdSettings} />}
            open={tooltipActive}
            position="left bottom"
            onClose={() => {
              setTooltipActive(false);
              setTooltipEnabled(false);
            }}
          >
            <span>go to settings to fill in classes</span>
          </Popup>
        </div>
      </HashRouter>
    </div>
  );
};

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

const PopupLazy = React.lazy(() =>
  // @ts-ignore
  import("reactjs-popup").then((x) =>
    // this is about the dumbest thing i've ever seen
    process.env.NODE_ENV == "production" ? x : { default: x },
  ),
);
const Popup: FunctionComponent<
  import("reactjs-popup").Props & {
    trigger: React.ReactElement;
    enable: boolean;
  }
> = (props) => {
  if (!props.enable) return props.trigger;
  return (
    <React.Suspense fallback={props.trigger}>
      <PopupLazy {...props} />
    </React.Suspense>
  );
};
