import { DropdownProps } from "react-day-picker";
import { useCallback, useState } from "react";

import { Button } from "#/components/button/Button";
import { cn } from "#/utils";
import { useOutsideClick } from "#/hook/useOutsideClick";

type FieldsetCalendarDropdownProps = DropdownProps & {
  placeholder?: string;
  formatLabel?: (label: string | undefined) => string;
};

export function FieldsetCalendarDropdown(props: FieldsetCalendarDropdownProps) {
  const {
    options,
    value,
    onChange,
    placeholder = "Select",
    formatLabel,
    className,
  } = props;

  const [open, setOpen] = useState(false);

  const containerRef = useOutsideClick({
    handler: () => setOpen(false),
  });

  const getDisplayLabel = useCallback(() => {
    if (!value) return placeholder;
    const selectedOption = options?.find((option) => option.value === value);
    const label = selectedOption?.label;
    return formatLabel ? formatLabel(label) : label || placeholder;
  }, [value, options, placeholder, formatLabel]);

  const handleSelect = (val: string | number) => {
    if (onChange) {
      const syntheticEvent = {
        target: { value: String(val) },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <Button
        variant="outline"
        size="small"
        color="secondary"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="fieldset-calendar-dropdown-list"
        onClick={() => setOpen((o) => !o)}
        className={cn("justify-between", className)}
      >
        {getDisplayLabel()}
        <svg
          className={cn("ml-2 h-4 w-4 opacity-50 transition-transform", {
            "rotate-180": open,
          })}
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

      {open && (
        <div
          id="fieldset-calendar-dropdown-list"
          role="listbox"
          className={cn(
            "bg-neutral-0 border-secondary-100 text-b3-400 text-secondary-800 absolute z-[9999] mt-2 flex max-h-[350px]! min-w-full flex-col overflow-auto rounded-md border p-2 shadow-(--shadow-select-panel)",
          )}
        >
          {options?.map((option) => {
            const selected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "hover:bg-secondary-50 cursor-pointer rounded-sm px-3 py-1 text-left outline-none",
                  {
                    "bg-secondary-50 hover:bg-secondary-50": selected,
                  },
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
