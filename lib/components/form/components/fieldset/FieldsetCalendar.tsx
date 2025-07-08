import { Button } from "#/components/button/Button";
import { cn } from "#/utils";
import {
  DateRange,
  DayPicker,
  DropdownProps,
  getDefaultClassNames,
} from "react-day-picker";
import "react-day-picker/style.css";

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

type FieldsetCalendarProps =
  | FieldsetDatePickerSingleProps
  | FieldsetDatePickerMultipleProps
  | FieldsetDatePickerRangeProps;

export function FieldsetCalendar(props: FieldsetCalendarProps) {
  const { mode = "single", date, onChange } = props;

  const defaultClassNames = getDefaultClassNames();

  // Calculate year range (current year +/- 10 years)
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 20;
  const endYear = currentYear + 20;

  return (
    <>
      <DayPicker
        animate
        mode={mode as any}
        selected={date as any}
        onSelect={onChange as any}
        captionLayout="dropdown"
        startMonth={new Date(startYear, 0)}
        endMonth={new Date(endYear, 11)}
        classNames={{
          ...defaultClassNames,
          root: cn(
            defaultClassNames.root,
            "bg-neutral-0 border p-3 rounded-md border-secondary-100 shadow-(--shadow-select-panel)",
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
          day: "text-b3-400 text-secondary-800 hover:bg-primary-100 rounded-xl",
          range_start: cn("bg-primary-600! text-neutral-0! rounded-xl", {
            "rounded-r-none":
              mode === "range" &&
              (date as DateRange)?.to?.toISOString() !==
                (date as DateRange)?.from?.toISOString(),
          }),
          range_end: cn("bg-primary-600! text-neutral-0! rounded-xl", {
            "rounded-l-none":
              mode === "range" &&
              (date as DateRange)?.to?.toISOString() !==
                (date as DateRange)?.from?.toISOString(),
          }),
          range_middle: cn({
            "rounded-none!": mode === "range",
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
          MonthsDropdown,
          YearsDropdown,
        }}
      />
    </>
  );
}

export function MonthsDropdown(props: DropdownProps) {
  const { options, value, onChange } = props;

  const formatMonthName = (label: string | undefined) => {
    if (!label) return "Month";
    return label.slice(0, 3);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="small"
        color="secondary"
        className="min-w-[70px] justify-between"
      >
        {value
          ? formatMonthName(
              options?.find((option) => option.value === value)?.label,
            )
          : "Month"}
        <svg
          className="ml-2 h-4 w-4 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>

      <select
        className="absolute inset-0 h-full w-full cursor-pointer text-base opacity-0"
        value={value}
        onChange={(e) => onChange?.(e)}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function YearsDropdown(props: DropdownProps) {
  const { options, value, onChange } = props;

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="small"
        color="secondary"
        className="min-w-[70px] justify-between"
      >
        {value
          ? options?.find((option) => option.value === value)?.label
          : "Year"}
        <svg
          className="ml-2 h-4 w-4 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>

      <select
        className="absolute inset-0 h-full w-full cursor-pointer text-base opacity-0"
        value={value}
        onChange={(e) => onChange?.(e)}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
