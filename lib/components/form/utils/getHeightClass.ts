export const getHeightClass = (
  size: "small" | "medium" | "large" | "extra-small",
) => {
  switch (size) {
    case "small":
      return "h-(--fieldset-height-small)";
    case "medium":
      return "h-(--fieldset-height-medium)";
    case "large":
      return "h-(--fieldset-height-large)";
    default:
      return "h-(--fieldset-height-medium)";
  }
};
