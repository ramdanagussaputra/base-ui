import { DateRange, Matcher } from "react-day-picker";
import { Controller } from "react-hook-form";
import { Calendar } from "iconsax-react";
import { useRef } from "react";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";
import { formatCalendarDisplayValue } from "#/components/form/utils/formatCalendarDisplayValue";
import Icon from "#/components/icon/Icon";
import { useCalendarState } from "#/components/form/hook/useCalendarState";
import { useCalendarPosition } from "#/components/form/hook/useCalendarPosition";

import { cn } from "#/utils";

// Constants
const DEFAULT_PLACEHOLDER = "DD/MM/YYYY";
const DEFAULT_LABEL = "Select Date";

type FormattedDatePickerFormField = Omit<
  FormFieldProps,
  "type" | "onChange"
> & {
  mode: "single" | "multiple" | "range";
  onChange?: ((value: Date | Date[]) => void) | ((range: DateRange) => void);
  onCalendarClose?: () => void;
  yearBefore?: number;
  yearAfter?: number;
  disabledDate?: Matcher | Matcher[];
  jumpToSelectedDate?: boolean;
};

export function DatePickerFormField({
  placeholder = DEFAULT_PLACEHOLDER,
  label = DEFAULT_LABEL,
  withoutTagLabel = false,
  control,
  isRequired = false,
  fieldName,
  rules,
  name,
  mode,
  yearBefore,
  yearAfter,
  onChange = () => {},
  onCalendarClose = () => {},
  isDisabled,
  size = "medium",
  disabledDate,
  jumpToSelectedDate,
}: Readonly<FormattedDatePickerFormField>) {
  const { open, setOpen, calendarRef } = useCalendarState();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { openUpward, position } = useCalendarPosition({
    isOpen: open,
    triggerRef,
    calendarHeight: 320,
  });

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: {
          value: isRequired,
          message: `${fieldName || label} is required`,
        },
        ...rules,
      }}
      render={({ field, fieldState }) => {
        const displayValue = formatCalendarDisplayValue(mode, field.value);

        const handleClose = () => {
          if (mode === "single") {
            setOpen(false);
          }
        };

        return (
          <Fieldset
            className="relative"
            isError={!!fieldState.error}
            isRequired={isRequired}
            isDisabled={isDisabled}
            size={size}
          >
            {label && (
              <Fieldset.Label withoutTag={withoutTagLabel}>
                {label}
              </Fieldset.Label>
            )}

            <div ref={calendarRef}>
              <button
                ref={triggerRef}
                type="button"
                className={cn("w-full cursor-pointer", {
                  "pointer-events-none": isDisabled,
                })}
                onClick={() => setOpen((prev) => !prev)}
              >
                <Fieldset.TextInput
                  className={cn("pointer-events-none", {
                    "border border-(--fieldset-border-color--focus)": open,
                  })}
                  placeholder={placeholder}
                  value={displayValue}
                  type="text"
                >
                  <Fieldset.Icon>
                    <Icon icon={Calendar} />
                  </Fieldset.Icon>
                </Fieldset.TextInput>
              </button>
              {open && (
                <div
                  className={cn("absolute z-50", {
                    "mt-2": !openUpward,
                    "mb-2": openUpward,
                  })}
                  style={position}
                >
                  <Fieldset.Calendar
                    mode={mode}
                    disabledDate={disabledDate}
                    date={field.value}
                    onChange={(value: any) => {
                      field.onChange(value);
                      onChange?.(value);
                      handleClose();
                    }}
                    yearBefore={yearBefore}
                    yearAfter={yearAfter}
                    jumpToSelectedDate={jumpToSelectedDate}
                    handleClose={() => {
                      onCalendarClose?.();
                      setOpen(false);
                    }}
                  />
                </div>
              )}
            </div>

            {fieldState.error?.message && (
              <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
            )}
          </Fieldset>
        );
      }}
    />
  );
}
