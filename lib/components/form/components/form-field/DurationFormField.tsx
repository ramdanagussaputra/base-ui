// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import * as React from "react";
import type { ReactNode } from "react";
import { Controller } from "react-hook-form";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";

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
    console.warn("DurationFormField: At least one field (hours, minutes, or seconds) must be enabled");
  }

  const formValue = watch(name) || "";
  const [hours, setHours] = React.useState("");
  const [minutes, setMinutes] = React.useState("");
  const [seconds, setSeconds] = React.useState("");

  // Helper function to build format string based on visible fields
  const buildFormatString = (hr: string, min: string, sec: string) => {
    const parts = [];
    if (showHours) parts.push(hr);
    if (showMinutes) parts.push(min);
    if (showSeconds) parts.push(sec);
    return parts.join(":");
  };

  // Helper function to parse format string based on visible fields
  const parseFormatString = React.useCallback((value: string) => {
    if (!value.includes(":")) {
      // Single value - assign to the first visible field
      if (showHours) return { hours: value, minutes: "", seconds: "" };
      if (showMinutes) return { hours: "", minutes: value, seconds: "" };
      if (showSeconds) return { hours: "", minutes: "", seconds: value };
      return { hours: "", minutes: "", seconds: "" };
    }

    const parts = value.split(":");
    let hr = "", min = "", sec = "";
    let partIndex = 0;

    if (showHours && partIndex < parts.length) {
      hr = parts[partIndex] || "";
      partIndex++;
    }
    if (showMinutes && partIndex < parts.length) {
      min = parts[partIndex] || "";
      partIndex++;
    }
    if (showSeconds && partIndex < parts.length) {
      sec = parts[partIndex] || "";
      partIndex++;
    }

    return { hours: hr, minutes: min, seconds: sec };
  }, [showHours, showMinutes, showSeconds]);

  // Sync local state with form value

  // Utility: pad numbers with leading zeros
  function padHours(val: string) {
    return val === "" ? "" : val.padStart(3, "0");
  }
  function padMinutes(val: string) {
    return val === "" ? "" : val.padStart(2, "0");
  }
  function padSeconds(val: string) {
    return val === "" ? "" : val.padStart(2, "0");
  }

  // Utility: convert minutes >= 60 to hours/minutes and seconds >= 60 to minutes/seconds
  function normalizeDuration(hr: string, min: string, sec: string) {
    let hrNum = parseInt(hr || "0", 10);
    let minNum = parseInt(min || "0", 10);
    let secNum = parseInt(sec || "0", 10);

    // Convert seconds >= 60 to minutes
    if (!isNaN(secNum) && secNum >= 60) {
      minNum += Math.floor(secNum / 60);
      secNum = secNum % 60;
    }

    // Convert minutes >= 60 to hours
    if (!isNaN(minNum) && minNum >= 60) {
      hrNum += Math.floor(minNum / 60);
      minNum = minNum % 60;
    }

    return {
      hours: padHours(hrNum.toString()),
      minutes: padMinutes(minNum.toString()),
      seconds: padSeconds(secNum.toString()),
    };
  }

  // Sync local state with form value
  React.useEffect(() => {
    if (formValue) {
      const { hours: hr, minutes: min, seconds: sec } = parseFormatString(formValue);
      setHours(hr);
      setMinutes(min);
      setSeconds(sec);
    } else {
      setHours("");
      setMinutes("");
      setSeconds("");
    }
  }, [formValue, parseFormatString]);

  // Handlers
  const handleHoursChange = (hr: string) => {
    const rawHr = hr.replace(/\D/g, "");
    setHours(rawHr);
    const consolidated = buildFormatString(rawHr, minutes, seconds);
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  const handleMinutesChange = (min: string) => {
    const rawMin = min.replace(/\D/g, "");
    setMinutes(rawMin);
    const consolidated = buildFormatString(hours, rawMin, seconds);
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  const handleSecondsChange = (sec: string) => {
    const rawSec = sec.replace(/\D/g, "");
    setSeconds(rawSec);
    const consolidated = buildFormatString(hours, minutes, rawSec);
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  // Pad and normalize on blur
  const handleHoursBlur = () => {
    const padded = padHours(hours);
    setHours(padded);
    const consolidated = buildFormatString(padded, minutes, seconds);
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  const handleMinutesBlur = () => {
    const {
      hours: normHr,
      minutes: normMin,
      seconds: normSec,
    } = normalizeDuration(hours, minutes, seconds);
    setHours(normHr);
    setMinutes(normMin);
    setSeconds(normSec);
    const consolidated = buildFormatString(normHr, normMin, normSec);
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  const handleSecondsBlur = () => {
    const {
      hours: normHr,
      minutes: normMin,
      seconds: normSec,
    } = normalizeDuration(hours, minutes, seconds);
    setHours(normHr);
    setMinutes(normMin);
    setSeconds(normSec);
    const consolidated = buildFormatString(normHr, normMin, normSec);
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  // Calculate dynamic grid layout based on visible fields
  const visibleFieldsCount = [showHours, showMinutes, showSeconds].filter(Boolean).length;
  const gridCols = Array(visibleFieldsCount * 2 - 1).fill(0).map((_, i) => 
    i % 2 === 0 ? "1fr" : "max-content"
  ).join("_");

  return (
    <Fieldset isRequired={isRequired} isDisabled={isDisabled} size={size}>
      {label && (
        <Fieldset.Label withoutTag={withoutTagLabel}>{label}</Fieldset.Label>
      )}
      <div className={`grid grid-cols-[${gridCols}] items-center gap-2`}>
        {showHours && (
          <>
            <Fieldset.TextInput
              type="text"
              placeholder="hhh"
              value={hours}
              onChange={handleHoursChange}
              onBlur={handleHoursBlur}
              lengthCap={3}
            >
              <div className="flex items-center gap-1">{endElement}</div>
            </Fieldset.TextInput>
            {(showMinutes || showSeconds) && (
              <p className="text-secondary-900 text-[0.8125rem]">:</p>
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
              lengthCap={2}
            >
              <div className="flex items-center gap-1">{endElement}</div>
            </Fieldset.TextInput>
            {showSeconds && (
              <p className="text-secondary-900 text-[0.8125rem]">:</p>
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
            lengthCap={2}
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
