import { format } from "date-fns";

const DATE_FORMAT = "dd/MM/yyyy";

export const formatCalendarDisplayValue = (
  mode: "single" | "multiple" | "range",
  value: any,
): string => {
  if (mode === "single") {
    return value && value instanceof Date ? format(value, DATE_FORMAT) : "";
  }

  if (mode === "multiple") {
    return value && Array.isArray(value) && value.length > 0
      ? value
          .filter((date: Date) => date instanceof Date)
          .map((date: Date) => format(date, DATE_FORMAT))
          .join(", ")
      : "";
  }

  if (mode === "range") {
    if (value && value.from && value.from instanceof Date) {
      if (value.to && value.to instanceof Date) {
        return `${format(value.from, DATE_FORMAT)} - ${format(value.to, DATE_FORMAT)}`;
      } else {
        return format(value.from, DATE_FORMAT);
      }
    }
    return "";
  }

  return "";
};
