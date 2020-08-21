import React, { FunctionComponent } from "react";
import { Config, Action } from "./config";

interface ConfigMenuProps {
  dispatch: React.Dispatch<Action>;
  config: Config;
}
export const ConfigMenu: FunctionComponent<ConfigMenuProps> = ({
  dispatch,
  config,
}) => {
  const classes = [
    ["advisory" as const, config.advisory] as const,
    ...config.classes.map((cls, i) => [i, cls] as const),
  ];
  return (
    <div className="flexlist">
      {classes.map(([targetClass, cls]) => (
        <div key={cls.period}>
          {`Period ${cls.period}:`}
          <div className="lmar">
            <p>
              <label>
                {"Class name: "}
                <input
                  value={cls.name}
                  onChange={(e) =>
                    dispatch({ targetClass, edit: ["name", e.target.value] })
                  }
                />
              </label>
            </p>
            <p>
              <label>
                {" Classroom link: "}
                <input
                  value={cls.classroom || ""}
                  placeholder="https://classroom.google.com/c/dQw4w9WgXcQ"
                  onChange={(e) =>
                    dispatch({
                      targetClass,
                      edit: ["classroom", e.target.value || null],
                    })
                  }
                />
              </label>
            </p>
            <p>
              <label>
                {" Video meeting link: "}
                <input
                  value={cls.meeting || ""}
                  placeholder="https://zoom.us/j/123456789?pwd=cG9vcG9vcGVlcGVlZWUK"
                  onChange={(e) =>
                    dispatch({
                      targetClass,
                      edit: ["meeting", e.target.value || null],
                    })
                  }
                />
              </label>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConfigMenu;
