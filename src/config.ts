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

export const myConfig: Config = {
  advisory: {
    period: 0,
    name: "Advisory",
    classroom: "https://classroom.google.com/c/NDg3MTc1NDUyNTJa",
    meeting:
      "https://us02web.zoom.us/j/86805607101?pwd=Q21OcjlDWDEzSXV6K1VVMlRiRXpvZz09",
  },
  classes: [
    {
      period: 1,
      name: "Calc BC",
      classroom: "https://classroom.google.com/c/MTI2MDA2MTQ5NzU0",
      meeting: "https://meet.google.com/lookup/e6mjyvo3e7?authuser=0&hs=179",
    },
    {
      period: 2,
      name: "AP Enviro",
      classroom: "https://classroom.google.com/c/MTI2NzQ2NTk2MDIx",
      meeting:
        "https://zoom.us/j/91381285154?pwd=Nk1raWliOS9NOGdlTldwRTFYL1Vmdz09",
    },
    {
      period: 3,
      name: "Sci-Fi Lit",
      classroom: "https://classroom.google.com/c/MTIyODY1MzUxODMz",
      meeting:
        "https://us02web.zoom.us/j/5815081216?pwd=R1doM0ozQngyRXJKZUVJL0tnSGQrZz09",
    },
    {
      period: 4,
      name: "Lunch",
      classroom: null,
      meeting: null,
    },
    {
      period: 5,
      name: "Civics",
      classroom: "https://classroom.google.com/c/MTIzNTM5MDgyNTM1",
      meeting:
        "https://zoom.us/j/98641987304?pwd=WUo3RFVuaW5EN3FyZ21KcFk2QzNXZz09",
    },
    {
      period: 6,
      name: "Adventure Ed",
      classroom: "https://classroom.google.com/c/MTI2MDAwOTM4ODg2",
      meeting: "https://meet.google.com/lookup/hubgat3za4?authuser=0&hs=179",
    },
    {
      period: 7,
      name: "A Capella Choir",
      classroom: "https://classroom.google.com/c/MTIyMDczNzE1MTI3",
      meeting:
        "https://us02web.zoom.us/j/82400999508?pwd=a2I0RU53LzVReEVER1djVFBWdUpCQT09",
    },
    {
      period: 8,
      name: "AP Physics",
      classroom: "https://classroom.google.com/c/MTI2NjU5ODMzMTg5",
      meeting:
        "https://us02web.zoom.us/j/82465963057?pwd=Z29rQ3lKNHNqaWRTYjE1VXU0dk9YUT09",
    },
  ],
};
