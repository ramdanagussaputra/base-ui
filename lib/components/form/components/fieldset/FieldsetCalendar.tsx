import {
  DateRange,
  DayPicker,
  getDefaultClassNames,
  Matcher,
  Numerals,
} from "react-day-picker";
import "react-day-picker/style.css";

import { cn } from "#/utils";
import { FieldsetCalendarDropdown } from "#/components/form/components/fieldset/FieldsetCalendarDropdown";
import { Button } from "#/components/button/Button";
import { enUS, id, fr } from "react-day-picker/locale";

// Helper: Compute a safe default month Date for react-day-picker, simplified and type-safe
function computeDefaultMonthValue(
  mode: "single" | "multiple" | "range",
  value: Date | Date[] | DateRange | undefined,
  shouldJumpToSelectedDate: boolean = true,
): Date | undefined {
  if (!shouldJumpToSelectedDate || !value) return undefined;

  if (mode === "single" && value instanceof Date) {
    return value;
  }

  if (mode === "multiple" && Array.isArray(value) && value.length > 0) {
    return value[0];
  }

  if (mode === "range" && typeof value === "object" && value !== null) {
    const range = value as DateRange;
    return range.from ?? range.to;
  }

  return undefined;
}

type FieldsetDatePickerSingleProps = {
  mode: "single";
  date?: Date;
  onChange?: (date: Date | undefined) => void;
};

type FieldsetDatePickerMultipleProps = {
  mode: "multiple";
  date?: Date[];
  onChange?: (date: Date[] | undefined) => void;
};

type FieldsetDatePickerRangeProps = {
  mode: "range";
  date?: DateRange;
  onChange?: (date: DateRange | undefined) => void;
};

type FieldsetCalendarProps = (
  | FieldsetDatePickerSingleProps
  | FieldsetDatePickerMultipleProps
  | FieldsetDatePickerRangeProps
) & {
  yearBefore?: number;
  yearAfter?: number;
  handleClose?: () => void;
  disabledDate?: Matcher | Matcher[];
  jumpToSelectedDate?: boolean;
  locale?: "enUS" | "id" | "fr";
  numerals?: Numerals;
};

export function FieldsetCalendar(props: FieldsetCalendarProps) {
  const {
    mode = "single",
    date,
    onChange,
    yearBefore = 20,
    yearAfter = 20,
    handleClose = () => {},
    disabledDate,
    jumpToSelectedDate = true,
    locale = "enUS",
    numerals,
  } = props;

  const usedLocales = {
    enUS: enUS,
    id: id,
    fr: fr,
  };

  const defaultClassNames = getDefaultClassNames();

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - yearBefore;
  const endYear = currentYear + yearAfter;

  const isRangeMode = mode === "range";
  const isRangeWithDifferentDates =
    isRangeMode &&
    (date as DateRange)?.to?.toDateString() !==
      (date as DateRange)?.from?.toDateString();

  const formatMonthLabel = (label: string | undefined) => {
    if (!label) return "Month";
    return label.slice(0, 3);
  };

  // Call helper with properly-typed date value according to mode
  let defaultMonthValue: Date | undefined;
  if (mode === "single") {
    defaultMonthValue = computeDefaultMonthValue(
      "single",
      date as Date | undefined,
      jumpToSelectedDate,
    );
  } else if (mode === "multiple") {
    defaultMonthValue = computeDefaultMonthValue(
      "multiple",
      date as Date[] | undefined,
      jumpToSelectedDate,
    );
  } else {
    defaultMonthValue = computeDefaultMonthValue(
      "range",
      date as DateRange | undefined,
      jumpToSelectedDate,
    );
  }

  return (
    <DayPicker
      animate
      locale={usedLocales[locale]}
      mode={mode as any}
      selected={date as any}
      onSelect={onChange as any}
      captionLayout="dropdown"
      disabled={disabledDate}
      defaultMonth={defaultMonthValue}
      footer={
        mode !== "single" && (
          <Button
            size="extra-small"
            className="ms-auto mt-1"
            onClick={handleClose}
            type="button"
          >
            Apply
          </Button>
        )
      }
      startMonth={new Date(startYear, 0)}
      endMonth={new Date(endYear, 11)}
      numerals={numerals}
      classNames={{
        ...defaultClassNames,
        root: cn(
          defaultClassNames.root,
          "bg-neutral-0 border rounded-xl p-3 border-secondary-100 shadow-(--shadow-select-panel)",
        ),
        chevron: cn(
          defaultClassNames.chevron,
          "fill-primary-600! size-5 rounded-md",
        ),
        today: "bg-primary-100 rounded-xl",
        selected: "bg-primary-600! text-neutral-0! rounded-xl",
        caption_label: cn(
          defaultClassNames.caption_label,
          "text-b3-600 text-secondary-800",
        ),
        day: "text-b3-400 text-secondary-800 hover:bg-primary-50 rounded-xl",
        range_start: cn("bg-primary-600! text-neutral-0! rounded-xl", {
          "rounded-r-none": isRangeWithDifferentDates,
        }),
        range_end: cn("bg-primary-600! text-neutral-0! rounded-xl", {
          "rounded-l-none": isRangeWithDifferentDates,
        }),
        range_middle: cn({
          "rounded-none!": isRangeMode,
        }),
        day_button: "size-9 cursor-pointer",
        dropdown_root: "relative inline-block",
        dropdown:
          "absolute inset-0 w-full h-full cursor-pointer opacity-0 z-10",
        dropdown_month:
          "bg-neutral-0 border border-secondary-100 rounded-md px-3 py-1 text-b4-400 text-secondary-800 min-w-[80px] text-center relative pointer-events-none",
        dropdown_year:
          "bg-neutral-0 border border-secondary-100 rounded-md px-3 py-1 text-b4-400 text-secondary-800 min-w-[70px] text-center relative pointer-events-none",
      }}
      components={{
        MonthsDropdown: (props) => (
          <FieldsetCalendarDropdown
            {...props}
            placeholder="Month"
            formatLabel={formatMonthLabel}
          />
        ),
        YearsDropdown: (props) => (
          <FieldsetCalendarDropdown {...props} placeholder="Year" />
        ),
      }}
    />
  );
}
