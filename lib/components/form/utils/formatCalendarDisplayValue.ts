import { format } from "date-fns";

const DATE_FORMAT = "dd/MM/yyyy";

// Helper function to convert value to Date if it's a valid date string
const convertToDate = (value: any): Date | null => {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsedDate = new Date(value);
    // Check if the parsed date is valid
    return !isNaN(parsedDate.getTime()) ? parsedDate : null;
  }

  return null;
};

export const formatCalendarDisplayValue = (
  mode: "single" | "multiple" | "range",
  value: any,
): string => {
  if (mode === "single") {
    const dateValue = convertToDate(value);
    return dateValue ? format(dateValue, DATE_FORMAT) : "";
  }

  if (mode === "multiple") {
    return value && Array.isArray(value) && value.length > 0
      ? value
          .map((item: any) => convertToDate(item))
          .filter((date: Date | null): date is Date => date !== null)
          .map((date: Date) => format(date, DATE_FORMAT))
          .join(", ")
      : "";
  }

  if (mode === "range") {
    if (value) {
      const fromDate = convertToDate(value.from);
      const toDate = convertToDate(value.to);

      if (fromDate) {
        if (toDate) {
          return `${format(fromDate, DATE_FORMAT)} - ${format(toDate, DATE_FORMAT)}`;
        } else {
          return format(fromDate, DATE_FORMAT);
        }
      }
    }
    return "";
  }

  return "";
};
