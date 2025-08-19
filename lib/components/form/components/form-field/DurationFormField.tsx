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
}: Readonly<DurationFormFieldProp>) {
  const formValue = watch(name) || "";
  const [hours, setHours] = React.useState("");
  const [minutes, setMinutes] = React.useState("");
  const [seconds, setSeconds] = React.useState("");

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
    if (typeof formValue === "string" && formValue.includes(":")) {
      const parts = formValue.split(":");
      if (parts.length === 3) {
        // Format: hhh:mm:ss
        const [hr, min, sec] = parts;
        setHours(hr === "" ? "" : hr);
        setMinutes(min === "" ? "" : min);
        setSeconds(sec === "" ? "" : sec);
      } else if (parts.length === 2) {
        // Format: mm:ss (backward compatibility)
        const [min, sec] = parts;
        setHours("");
        setMinutes(min === "" ? "" : min);
        setSeconds(sec === "" ? "" : sec);
      }
    } else if (typeof formValue === "string") {
      setHours(formValue === "" ? "" : formValue);
      setMinutes("");
      setSeconds("");
    }
    if (!formValue) {
      setHours("");
      setMinutes("");
      setSeconds("");
    }
  }, [formValue]);

  // Handlers
  const handleHoursChange = (hr: string) => {
    const rawHr = hr.replace(/\D/g, "");
    setHours(rawHr);
    const consolidated = `${rawHr}:${minutes}:${seconds}`;
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  const handleMinutesChange = (min: string) => {
    const rawMin = min.replace(/\D/g, "");
    setMinutes(rawMin);
    const consolidated = `${hours}:${rawMin}:${seconds}`;
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  const handleSecondsChange = (sec: string) => {
    const rawSec = sec.replace(/\D/g, "");
    setSeconds(rawSec);
    const consolidated = `${hours}:${minutes}:${rawSec}`;
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  // Pad and normalize on blur
  const handleHoursBlur = () => {
    const padded = padHours(hours);
    setHours(padded);
    const consolidated = `${padded}:${minutes}:${seconds}`;
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
    const consolidated = `${normHr}:${normMin}:${normSec}`;
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
    const consolidated = `${normHr}:${normMin}:${normSec}`;
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  return (
    <Fieldset isRequired={isRequired} isDisabled={isDisabled} size={size}>
      {label && (
        <Fieldset.Label withoutTag={withoutTagLabel}>{label}</Fieldset.Label>
      )}
      <div className="grid grid-cols-[1fr_max-content_1fr_max-content_1fr] items-center gap-2">
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
        <p className="text-secondary-900 text-[0.8125rem]">:</p>
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
        <p className="text-secondary-900 text-[0.8125rem]">:</p>
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
