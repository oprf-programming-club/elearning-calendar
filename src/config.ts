import produce from "immer";

export interface Class {
  period: number;
  name: string;
  classroom: string | null;
  meeting: string | null;
}

export interface Config {
  advisory: Class;
  classes: [Class, Class, Class, Class, Class, Class, Class, Class];
}

export interface WithConfig {
  config: Config;
}

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

export const defaultConfig: Config = {
  advisory: {
    period: 0,
    name: "Advisory",
    classroom: null,
    meeting: null,
  },
  classes: [
    {
      period: 1,
      name: "Class 1",
      classroom: null,
      meeting: null,
    },
    {
      period: 2,
      name: "Class 2",
      classroom: null,
      meeting: null,
    },
    {
      period: 3,
      name: "Class 3",
      classroom: null,
      meeting: null,
    },
    {
      period: 4,
      name: "Class 4",
      classroom: null,
      meeting: null,
    },
    {
      period: 5,
      name: "Class 5",
      classroom: null,
      meeting: null,
    },
    {
      period: 6,
      name: "Class 6",
      classroom: null,
      meeting: null,
    },
    {
      period: 7,
      name: "Class 7",
      classroom: null,
      meeting: null,
    },
    {
      period: 8,
      name: "Class 8",
      classroom: null,
      meeting: null,
    },
  ],
};
