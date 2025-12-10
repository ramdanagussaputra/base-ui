import { DateRange, Matcher, Numerals } from "react-day-picker";
import { Controller } from "react-hook-form";
import { Add, Calendar } from "iconsax-react";
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

type MenuPlacement = "auto" | "top" | "bottom";

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
  menuPlacement?: MenuPlacement;
  locale?: "enUS" | "id" | "fr";
  numerals?: Numerals;
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
  menuPlacement = "auto",
  locale,
  numerals,
}: Readonly<FormattedDatePickerFormField>) {
  const { open, setOpen, calendarRef } = useCalendarState();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { openUpward, position } = useCalendarPosition({
    isOpen: open,
    triggerRef,
    calendarHeight: 320,
  });

  // Determine final placement based on menuPlacement prop
  const shouldOpenUpward =
    menuPlacement === "top"
      ? true
      : menuPlacement === "bottom"
        ? false
        : openUpward;

  const finalPosition =
    menuPlacement === "auto"
      ? position
      : shouldOpenUpward
        ? { bottom: "100%", top: undefined }
        : { top: "100%", bottom: undefined };

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

            <div ref={calendarRef} className="relative">
              <button
                ref={triggerRef}
                type="button"
                className={cn("w-full cursor-pointer", {
                  "pointer-events-none": isDisabled,
                })}
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
              >
                <Fieldset.TextInput
                  className={cn("pointer-events-none relative", {
                    "border border-(--fieldset-border-color--focus)": open,
                  })}
                  placeholder={placeholder}
                  value={displayValue}
                  type="text"
                >
                  {!open && (
                    <Fieldset.Icon>
                      <Icon icon={Calendar} />
                    </Fieldset.Icon>
                  )}
                </Fieldset.TextInput>
              </button>
              {open && (
                <Fieldset.Icon className="absolute top-2 right-2.5 z-10 cursor-pointer">
                  <Icon
                    id="calendar-clear"
                    icon={Add}
                    className="size-6 rotate-45"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setOpen(false);
                      field.onChange(undefined);
                    }}
                  />
                </Fieldset.Icon>
              )}

              {open && (
                <div
                  className={cn("absolute z-50", {
                    "mt-2": !shouldOpenUpward,
                    "mb-2": shouldOpenUpward,
                  })}
                  style={finalPosition}
                >
                  <Fieldset.Calendar
                    mode={mode}
                    locale={locale}
                    numerals={numerals}
                    disabledDate={disabledDate}
                    date={field.value}
                    onChange={(value: any) => {
                      console.log(value);
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
