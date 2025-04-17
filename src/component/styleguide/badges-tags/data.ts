type BadgeConfig = {
  color:
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "warning"
    | "info1"
    | "info2";
  size: "medium" | "small";
};

export const badgesConfigs: BadgeConfig[] = [
  {
    color: "primary",
    size: "medium",
  },
  {
    color: "primary",
    size: "small",
  },
  {
    color: "secondary",
    size: "medium",
  },
  {
    color: "secondary",
    size: "small",
  },
  {
    color: "error",
    size: "medium",
  },
  {
    color: "error",
    size: "small",
  },
  {
    color: "success",
    size: "medium",
  },
  {
    color: "success",
    size: "small",
  },
  {
    color: "warning",
    size: "medium",
  },
  {
    color: "warning",
    size: "small",
  },
  {
    color: "info1",
    size: "medium",
  },
  {
    color: "info1",
    size: "small",
  },
  {
    color: "info2",
    size: "medium",
  },
  {
    color: "info2",
    size: "small",
  },
];
