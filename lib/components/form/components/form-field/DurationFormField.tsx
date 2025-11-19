// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import * as React from "react";
import type { ReactNode } from "react";
import { Controller } from "react-hook-form";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";

const HOURS_MAX_LENGTH = 2;
const MINUTES_MAX_LENGTH = 2;
const MINUTES_MAX_LENGTH_NO_HOURS = 3;
const SECONDS_MAX_LENGTH = 2;
const FIELD_SEPARATOR = ":";
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;

// Pad numbers with leading zeros
const padHours = (value: string): string => {
  return value === "" ? "" : value.padStart(HOURS_MAX_LENGTH, "0");
};

const padMinutes = (value: string, showHours: boolean): string => {
  if (value === "") return "";
  const maxLength = showHours
    ? MINUTES_MAX_LENGTH
    : MINUTES_MAX_LENGTH_NO_HOURS;
  return value.padStart(maxLength, "0");
};

const padSeconds = (value: string): string => {
  return value === "" ? "" : value.padStart(SECONDS_MAX_LENGTH, "0");
};

// Convert overflow values (minutes >= 60 to hours, seconds >= 60 to minutes)
const normalizeDuration = (
  hours: string,
  minutes: string,
  seconds: string,
  showHours: boolean,
) => {
  let hoursNumber = parseInt(hours || "0", 10);
  let minutesNumber = parseInt(minutes || "0", 10);
  let secondsNumber = parseInt(seconds || "0", 10);

  // Convert seconds >= 60 to minutes
  if (!isNaN(secondsNumber) && secondsNumber >= SECONDS_PER_MINUTE) {
    minutesNumber += Math.floor(secondsNumber / SECONDS_PER_MINUTE);
    secondsNumber = secondsNumber % SECONDS_PER_MINUTE;
  }

  // Convert minutes >= 60 to hours only if hours are shown
  if (showHours && !isNaN(minutesNumber) && minutesNumber >= MINUTES_PER_HOUR) {
    hoursNumber += Math.floor(minutesNumber / MINUTES_PER_HOUR);
    minutesNumber = minutesNumber % MINUTES_PER_HOUR;
  }

  return {
    hours: padHours(hoursNumber.toString()),
    minutes: padMinutes(minutesNumber.toString(), showHours),
    seconds: padSeconds(secondsNumber.toString()),
  };
};

// Convert UI format (hhh:mm:ss) to form value format (mmm:ss)
const convertUIToFormValue = (
  hours: string,
  minutes: string,
  seconds: string,
  showHours: boolean,
  showMinutes: boolean,
  showSeconds: boolean,
): string => {
  if (!showHours) {
    // When hours are not shown, use mmm:ss format directly
    const parts = [];
    if (showMinutes) parts.push(padMinutes(minutes, false));
    if (showSeconds) parts.push(padSeconds(seconds));
    return parts.join(FIELD_SEPARATOR);
  }

  // When hours are shown, convert hhh:mm:ss to mmm:ss
  const hoursNumber = parseInt(hours || "0", 10);
  const minutesNumber = parseInt(minutes || "0", 10);
  const totalMinutes = hoursNumber * MINUTES_PER_HOUR + minutesNumber;

  const parts = [];
  if (showMinutes) parts.push(padMinutes(totalMinutes.toString(), false)); // Always use 3-digit format for form value
  if (showSeconds) parts.push(padSeconds(seconds));
  return parts.join(FIELD_SEPARATOR);
};

// Convert form value format (mmm:ss) to UI format (hhh:mm:ss)
const convertFormValueToUI = (
  value: string,
  showHours: boolean,
  showMinutes: boolean,
  showSeconds: boolean,
) => {
  if (!showHours) {
    // When hours are not shown, parse as mmm:ss directly
    return parseFormatString(value, false, showMinutes, showSeconds);
  }

  // When hours are shown, convert mmm:ss to hhh:mm:ss
  const parsed = parseFormatString(value, false, showMinutes, showSeconds);
  const totalMinutes = parseInt(parsed.minutes || "0", 10);
  const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
  const minutes = totalMinutes % MINUTES_PER_HOUR;

  return {
    hours: padHours(hours.toString()),
    minutes: padMinutes(minutes.toString(), showHours),
    seconds: padSeconds(parsed.seconds || ""),
  };
};

// Parse format string based on visible fields
const parseFormatString = (
  value: string,
  showHours: boolean,
  showMinutes: boolean,
  showSeconds: boolean,
) => {
  if (!value.includes(FIELD_SEPARATOR)) {
    // Single value - assign to the first visible field
    if (showHours) return { hours: padHours(value), minutes: "", seconds: "" };
    if (showMinutes)
      return { hours: "", minutes: padMinutes(value, showHours), seconds: "" };
    if (showSeconds)
      return { hours: "", minutes: "", seconds: padSeconds(value) };
    return { hours: "", minutes: "", seconds: "" };
  }

  const parts = value.split(FIELD_SEPARATOR);
  let hours = "";
  let minutes = "";
  let seconds = "";
  let partIndex = 0;

  if (showHours && partIndex < parts.length) {
    hours = padHours(parts[partIndex] || "");
    partIndex++;
  }
  if (showMinutes && partIndex < parts.length) {
    minutes = padMinutes(parts[partIndex] || "", showHours);
    partIndex++;
  }
  if (showSeconds && partIndex < parts.length) {
    seconds = padSeconds(parts[partIndex] || "");
    partIndex++;
  }

  return { hours, minutes, seconds };
};

// Calculate dynamic grid layout based on visible fields
const generateGridColumns = (
  showHours: boolean,
  showMinutes: boolean,
  showSeconds: boolean,
): string => {
  const visibleFieldsCount = [showHours, showMinutes, showSeconds].filter(
    Boolean,
  ).length;
  const totalColumns = visibleFieldsCount * 2 - 1; // fields + separators
  return Array(totalColumns)
    .fill(0)
    .map((_, index) => (index % 2 === 0 ? "1fr" : "max-content"))
    .join("_");
};

// ========== TYPES ==========

type DurationFormFieldProp = Omit<FormFieldProps, "type" | "onChange"> & {
  onChange?: (value: string) => void;
  onBlur?: () => void;
  endElement?: ReactNode;
  name: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  /** Whether to show the hours field (2 digits max). Default: true */
  showHours?: boolean;
  /** Whether to show the minutes field (2 digits max). Default: true */
  showMinutes?: boolean;
  /** Whether to show the seconds field (2 digits max). Default: true */
  showSeconds?: boolean;
};

export function DurationFormField({
  name,
  rules,
  label = "Duration",
  fieldName,
  control,
  isRequired = false,
  isDisabled = false,
  onChange = () => {},
  onBlur = () => {},
  size = "medium",
  withoutTagLabel = false,
  endElement,
  setValue,
  watch,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
}: Readonly<DurationFormFieldProp>) {
  // Ensure at least one field is enabled
  if (!showHours && !showMinutes && !showSeconds) {
    console.warn(
      "DurationFormField: At least one field (hours, minutes, or seconds) must be enabled",
    );
  }

  const formValue = watch(name) || "";
  const [hours, setHours] = React.useState("");
  const [minutes, setMinutes] = React.useState("");
  const [seconds, setSeconds] = React.useState("");
  const isUpdatingFromForm = React.useRef(false);

  // Sync local state with form value
  React.useEffect(() => {
    if (formValue && !isUpdatingFromForm.current) {
      const {
        hours: hoursFromForm,
        minutes: minutesFromForm,
        seconds: secondsFromForm,
      } = convertFormValueToUI(formValue, showHours, showMinutes, showSeconds);

      setHours(hoursFromForm);
      setMinutes(minutesFromForm);
      setSeconds(secondsFromForm);
    } else if (!formValue && !isUpdatingFromForm.current) {
      setHours("");
      setMinutes("");
      setSeconds("");
    }
  }, [formValue, showHours, showMinutes, showSeconds]);

  // Input change handlers
  const handleHoursChange = (hoursInput: string) => {
    const rawHours = hoursInput.replace(/\D/g, "");
    setHours(rawHours);

    isUpdatingFromForm.current = true;
    const consolidated = convertUIToFormValue(
      rawHours,
      minutes,
      seconds,
      showHours,
      showMinutes,
      showSeconds,
    );
    setValue(name, consolidated);
    onChange?.(consolidated);

    setTimeout(() => {
      isUpdatingFromForm.current = false;
    }, 0);
  };

  const handleMinutesChange = (minutesInput: string) => {
    const rawMinutes = minutesInput.replace(/\D/g, "");
    setMinutes(rawMinutes);

    isUpdatingFromForm.current = true;
    const consolidated = convertUIToFormValue(
      hours,
      rawMinutes,
      seconds,
      showHours,
      showMinutes,
      showSeconds,
    );
    setValue(name, consolidated);
    onChange?.(consolidated);

    setTimeout(() => {
      isUpdatingFromForm.current = false;
    }, 0);
  };

  const handleSecondsChange = (secondsInput: string) => {
    const rawSeconds = secondsInput.replace(/\D/g, "");

    setSeconds(rawSeconds);

    isUpdatingFromForm.current = true;
    const consolidated = convertUIToFormValue(
      hours,
      minutes,
      rawSeconds,
      showHours,
      showMinutes,
      showSeconds,
    );

    setValue(name, consolidated);
    onChange?.(consolidated);

    // Reset flag after a short delay to allow form update to complete
    setTimeout(() => {
      isUpdatingFromForm.current = false;
    }, 0);
  };

  // Blur handlers - pad and normalize values

  // Blur handlers - pad and normalize values
  const handleHoursBlur = () => {
    const {
      hours: normalizedHours,
      minutes: normalizedMinutes,
      seconds: normalizedSeconds,
    } = normalizeDuration(hours, minutes, seconds, showHours);
    setHours(normalizedHours);
    setMinutes(normalizedMinutes);
    setSeconds(normalizedSeconds);

    isUpdatingFromForm.current = true;
    const consolidated = convertUIToFormValue(
      normalizedHours,
      normalizedMinutes,
      normalizedSeconds,
      showHours,
      showMinutes,
      showSeconds,
    );
    setValue(name, consolidated);
    onChange?.(consolidated);
    onBlur?.();

    setTimeout(() => {
      isUpdatingFromForm.current = false;
    }, 0);
  };

  const handleMinutesBlur = () => {
    const {
      hours: normalizedHours,
      minutes: normalizedMinutes,
      seconds: normalizedSeconds,
    } = normalizeDuration(hours, minutes, seconds, showHours);
    setHours(normalizedHours);
    setMinutes(normalizedMinutes);
    setSeconds(normalizedSeconds);

    isUpdatingFromForm.current = true;
    const consolidated = convertUIToFormValue(
      normalizedHours,
      normalizedMinutes,
      normalizedSeconds,
      showHours,
      showMinutes,
      showSeconds,
    );
    setValue(name, consolidated);
    onChange?.(consolidated);
    onBlur?.();

    setTimeout(() => {
      isUpdatingFromForm.current = false;
    }, 0);
  };

  const handleSecondsBlur = () => {
    const {
      hours: normalizedHours,
      minutes: normalizedMinutes,
      seconds: normalizedSeconds,
    } = normalizeDuration(hours, minutes, seconds, showHours);
    setHours(normalizedHours);
    setMinutes(normalizedMinutes);
    setSeconds(normalizedSeconds);

    isUpdatingFromForm.current = true;
    const consolidated = convertUIToFormValue(
      normalizedHours,
      normalizedMinutes,
      normalizedSeconds,
      showHours,
      showMinutes,
      showSeconds,
    );
    setValue(name, consolidated);
    onChange?.(consolidated);
    onBlur?.();

    setTimeout(() => {
      isUpdatingFromForm.current = false;
    }, 0);
  };

  // Calculate dynamic grid layout based on visible fields
  const gridColumns = generateGridColumns(showHours, showMinutes, showSeconds);

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
      render={({ fieldState }) => (
        <Fieldset
          isRequired={isRequired}
          isDisabled={isDisabled}
          size={size}
          isError={!!fieldState.error?.message}
        >
          {label && (
            <Fieldset.Label withoutTag={withoutTagLabel}>
              {label}
            </Fieldset.Label>
          )}
          <div
            className="grid items-center gap-2"
            style={{
              gridTemplateColumns: gridColumns.replace(/_/g, " "),
            }}
          >
            {showHours && (
              <>
                <Fieldset.TextInput
                  type="text"
                  placeholder="hh"
                  value={hours}
                  onChange={handleHoursChange}
                  onBlur={handleHoursBlur}
                  lengthCap={HOURS_MAX_LENGTH}
                >
                  <div className="flex items-center gap-1">{endElement}</div>
                </Fieldset.TextInput>
                {(showMinutes || showSeconds) && (
                  <p className="text-secondary-900 text-[0.8125rem]">
                    {FIELD_SEPARATOR}
                  </p>
                )}
              </>
            )}
            {showMinutes && (
              <>
                <Fieldset.TextInput
                  type="text"
                  placeholder={showHours ? "mm" : "mmm"}
                  value={minutes}
                  onChange={handleMinutesChange}
                  onBlur={handleMinutesBlur}
                  lengthCap={
                    showHours ? MINUTES_MAX_LENGTH : MINUTES_MAX_LENGTH_NO_HOURS
                  }
                >
                  <div className="flex items-center gap-1">{endElement}</div>
                </Fieldset.TextInput>
                {showSeconds && (
                  <p className="text-secondary-900 text-[0.8125rem]">
                    {FIELD_SEPARATOR}
                  </p>
                )}
              </>
            )}
            {showSeconds && (
              <Fieldset.TextInput
                type="text"
                placeholder="ss"
                value={seconds}
                onChange={handleSecondsChange}
                onBlur={handleSecondsBlur}
                lengthCap={SECONDS_MAX_LENGTH}
              >
                <div className="flex items-center gap-1">{endElement}</div>
              </Fieldset.TextInput>
            )}
          </div>
          {/* Error message for consolidated field */}
          {fieldState.error?.message && (
            <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
          )}
        </Fieldset>
      )}
    />
  );
}
