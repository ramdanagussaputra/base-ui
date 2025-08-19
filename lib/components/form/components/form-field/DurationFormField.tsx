// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import * as React from "react";
import type { ReactNode } from "react";
import { Controller } from "react-hook-form";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";

const HOURS_MAX_LENGTH = 3;
const MINUTES_MAX_LENGTH = 2;
const SECONDS_MAX_LENGTH = 2;
const FIELD_SEPARATOR = ":";
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;

// Pad numbers with leading zeros
const padHours = (value: string): string => {
  return value === "" ? "" : value.padStart(HOURS_MAX_LENGTH, "0");
};

const padMinutes = (value: string): string => {
  return value === "" ? "" : value.padStart(MINUTES_MAX_LENGTH, "0");
};

const padSeconds = (value: string): string => {
  return value === "" ? "" : value.padStart(SECONDS_MAX_LENGTH, "0");
};

// Convert overflow values (minutes >= 60 to hours, seconds >= 60 to minutes)
const normalizeDuration = (hours: string, minutes: string, seconds: string) => {
  let hoursNumber = parseInt(hours || "0", 10);
  let minutesNumber = parseInt(minutes || "0", 10);
  let secondsNumber = parseInt(seconds || "0", 10);

  // Convert seconds >= 60 to minutes
  if (!isNaN(secondsNumber) && secondsNumber >= SECONDS_PER_MINUTE) {
    minutesNumber += Math.floor(secondsNumber / SECONDS_PER_MINUTE);
    secondsNumber = secondsNumber % SECONDS_PER_MINUTE;
  }

  // Convert minutes >= 60 to hours
  if (!isNaN(minutesNumber) && minutesNumber >= MINUTES_PER_HOUR) {
    hoursNumber += Math.floor(minutesNumber / MINUTES_PER_HOUR);
    minutesNumber = minutesNumber % MINUTES_PER_HOUR;
  }

  return {
    hours: padHours(hoursNumber.toString()),
    minutes: padMinutes(minutesNumber.toString()),
    seconds: padSeconds(secondsNumber.toString()),
  };
};

// Build format string based on visible fields
const buildFormatString = (
  hours: string,
  minutes: string,
  seconds: string,
  showHours: boolean,
  showMinutes: boolean,
  showSeconds: boolean,
): string => {
  const parts = [];
  if (showHours) parts.push(hours);
  if (showMinutes) parts.push(minutes);
  if (showSeconds) parts.push(seconds);
  return parts.join(FIELD_SEPARATOR);
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
    if (showHours) return { hours: value, minutes: "", seconds: "" };
    if (showMinutes) return { hours: "", minutes: value, seconds: "" };
    if (showSeconds) return { hours: "", minutes: "", seconds: value };
    return { hours: "", minutes: "", seconds: "" };
  }

  const parts = value.split(FIELD_SEPARATOR);
  let hours = "";
  let minutes = "";
  let seconds = "";
  let partIndex = 0;

  if (showHours && partIndex < parts.length) {
    hours = parts[partIndex] || "";
    partIndex++;
  }
  if (showMinutes && partIndex < parts.length) {
    minutes = parts[partIndex] || "";
    partIndex++;
  }
  if (showSeconds && partIndex < parts.length) {
    seconds = parts[partIndex] || "";
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
  endElement?: ReactNode;
  name: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  /** Whether to show the hours field (3 digits max). Default: true */
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

  // Sync local state with form value
  React.useEffect(() => {
    if (formValue) {
      const {
        hours: hoursFromForm,
        minutes: minutesFromForm,
        seconds: secondsFromForm,
      } = parseFormatString(formValue, showHours, showMinutes, showSeconds);
      setHours(hoursFromForm);
      setMinutes(minutesFromForm);
      setSeconds(secondsFromForm);
    } else {
      setHours("");
      setMinutes("");
      setSeconds("");
    }
  }, [formValue, showHours, showMinutes, showSeconds]);

  // Input change handlers
  const handleHoursChange = (hoursInput: string) => {
    const rawHours = hoursInput.replace(/\D/g, "");
    setHours(rawHours);
    const consolidated = buildFormatString(
      rawHours,
      minutes,
      seconds,
      showHours,
      showMinutes,
      showSeconds,
    );
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  const handleMinutesChange = (minutesInput: string) => {
    const rawMinutes = minutesInput.replace(/\D/g, "");
    setMinutes(rawMinutes);
    const consolidated = buildFormatString(
      hours,
      rawMinutes,
      seconds,
      showHours,
      showMinutes,
      showSeconds,
    );
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  const handleSecondsChange = (secondsInput: string) => {
    const rawSeconds = secondsInput.replace(/\D/g, "");
    setSeconds(rawSeconds);
    const consolidated = buildFormatString(
      hours,
      minutes,
      rawSeconds,
      showHours,
      showMinutes,
      showSeconds,
    );
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  // Blur handlers - pad and normalize values

  // Blur handlers - pad and normalize values
  const handleHoursBlur = () => {
    const paddedHours = padHours(hours);
    setHours(paddedHours);
    const consolidated = buildFormatString(
      paddedHours,
      minutes,
      seconds,
      showHours,
      showMinutes,
      showSeconds,
    );
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  const handleMinutesBlur = () => {
    const {
      hours: normalizedHours,
      minutes: normalizedMinutes,
      seconds: normalizedSeconds,
    } = normalizeDuration(hours, minutes, seconds);
    setHours(normalizedHours);
    setMinutes(normalizedMinutes);
    setSeconds(normalizedSeconds);
    const consolidated = buildFormatString(
      normalizedHours,
      normalizedMinutes,
      normalizedSeconds,
      showHours,
      showMinutes,
      showSeconds,
    );
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  const handleSecondsBlur = () => {
    const {
      hours: normalizedHours,
      minutes: normalizedMinutes,
      seconds: normalizedSeconds,
    } = normalizeDuration(hours, minutes, seconds);
    setHours(normalizedHours);
    setMinutes(normalizedMinutes);
    setSeconds(normalizedSeconds);
    const consolidated = buildFormatString(
      normalizedHours,
      normalizedMinutes,
      normalizedSeconds,
      showHours,
      showMinutes,
      showSeconds,
    );
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  // Calculate dynamic grid layout based on visible fields
  const gridColumns = generateGridColumns(showHours, showMinutes, showSeconds);

  return (
    <Fieldset isRequired={isRequired} isDisabled={isDisabled} size={size}>
      {label && (
        <Fieldset.Label withoutTag={withoutTagLabel}>{label}</Fieldset.Label>
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
              placeholder="hhh"
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
              placeholder="mm"
              value={minutes}
              onChange={handleMinutesChange}
              onBlur={handleMinutesBlur}
              lengthCap={MINUTES_MAX_LENGTH}
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
        render={({ fieldState }) =>
          fieldState.error?.message ? (
            <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
          ) : (
            <></>
          )
        }
      />
    </Fieldset>
  );
}
