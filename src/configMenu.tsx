import React, { FunctionComponent } from "react";
import produce from "immer";
import { Config } from "./config";

interface ClassAction {
  targetClass: "advisory" | number;
  edit: ["name", string] | ["classroom" | "meeting", string | null];
}

export type Action = ClassAction;

export function dispatch(prev: Config, action: Action): Config {
  const { targetClass, edit } = action;
  const newConfig = produce(prev, (config) => {
    const cls =
      targetClass === "advisory"
        ? config.advisory
        : config.classes[targetClass];
    // incredible, thank you typescript
    // if (edit[0] === "name") {
    //   cls[edit[0]] = edit[1];
    // } else {
    //   cls[edit[0]] = edit[1];
    // }
    // @ts-ignore
    cls[edit[0]] = edit[1];
  });
  localStorage.setItem("calConfig", JSON.stringify(newConfig));
  return newConfig;
}

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
    <div>
      {classes.map(([targetClass, cls]) => (
        <div key={cls.period} className="lmar">
          <label>
            {"Class name: "}
            <input
              value={cls.name}
              onChange={(e) =>
                dispatch({ targetClass, edit: ["name", e.target.value] })
              }
            />
          </label>
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
        </div>
      ))}
    </div>
  );
};
