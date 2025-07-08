import { DropdownProps } from "react-day-picker";
import { Button } from "#/components/button/Button";

export function FieldsetCalendarMonthsDropdown(props: DropdownProps) {
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
