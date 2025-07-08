import { DateRange } from "react-day-picker";
import { Controller } from "react-hook-form";
import { Calendar } from "iconsax-react";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";
import { formatCalendarDisplayValue } from "#/components/form/utils/formatCalendarDisplayValue";
import Icon from "#/components/icon/Icon";
import { useCalendarState } from "#/components/form/hook/useCalendarState";

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
  yearBefore?: number;
  yearAfter?: number;
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
  isDisabled,
  size = "medium",
}: Readonly<FormattedDatePickerFormField>) {
  const { open, setOpen, calendarRef } = useCalendarState();

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
                <div className="absolute top-full z-50 mt-2 bg-white">
                  <Fieldset.Calendar
                    mode={mode}
                    date={field.value}
                    onChange={(value: any) => {
                      field.onChange(value);
                      onChange?.(value);
                    }}
                    yearBefore={yearBefore}
                    yearAfter={yearAfter}
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
