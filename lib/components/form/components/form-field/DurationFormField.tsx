// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import * as React from "react";
import { Controller } from "react-hook-form";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";

import { UseFormSetValue, UseFormWatch } from "react-hook-form";

type DurationFormFieldProp = Omit<FormFieldProps, "type" | "onChange"> & {
  /** Called when the duration value changes ("mmm:ss") */
  onChange?: (value: string) => void;
  /** Optional element to display at the end of each input */
  endElement?: React.ReactNode;
  /** Function to set the value in the parent form context */
  setValue: UseFormSetValue<any>;
  /** Function to watch the value in the parent form context */
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
  const [minutes, setMinutes] = React.useState("");
  const [seconds, setSeconds] = React.useState("");

  // Sync local state with form value

  // Utility: pad numbers with leading zeros
  function padMinutes(val: string) {
    return val === "" ? "" : val.padStart(3, "0");
  }
  function padSeconds(val: string) {
    return val === "" ? "" : val.padStart(2, "0");
  }

  // Utility: convert seconds >= 60 to minutes/seconds
  function normalizeDuration(min: string, sec: string) {
    let minNum = parseInt(min || "0", 10);
    let secNum = parseInt(sec || "0", 10);
    if (!isNaN(secNum) && secNum >= 60) {
      minNum += Math.floor(secNum / 60);
      secNum = secNum % 60;
    }
    return {
      minutes: padMinutes(minNum.toString()),
      seconds: padSeconds(secNum.toString()),
    };
  }

  // Sync local state with form value
  React.useEffect(() => {
    if (typeof formValue === "string" && formValue.includes(":")) {
      const [min, sec] = formValue.split(":");
      setMinutes(min === "" ? "" : min);
      setSeconds(sec === "" ? "" : sec);
    } else if (typeof formValue === "string") {
      setMinutes(formValue === "" ? "" : formValue);
      setSeconds("");
    }
    if (!formValue) {
      setMinutes("");
      setSeconds("");
    }
  }, [formValue]);

  // Handlers
  const handleMinutesChange = (min: string) => {
    const rawMin = min.replace(/\D/g, "");
    setMinutes(rawMin);
    const consolidated = `${rawMin}:${seconds}`;
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  const handleSecondsChange = (sec: string) => {
    const rawSec = sec.replace(/\D/g, "");
    setSeconds(rawSec);
    const consolidated = `${minutes}:${rawSec}`;
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  // Pad and normalize on blur
  const handleMinutesBlur = () => {
    const padded = padMinutes(minutes);
    setMinutes(padded);
    const consolidated = `${padded}:${seconds}`;
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  const handleSecondsBlur = () => {
    const { minutes: normMin, seconds: normSec } = normalizeDuration(
      minutes,
      seconds,
    );
    setMinutes(normMin);
    setSeconds(normSec);
    const consolidated = `${normMin}:${normSec}`;
    setValue(name, consolidated);
    onChange?.(consolidated);
  };

  return (
    <Fieldset isRequired={isRequired} isDisabled={isDisabled} size={size}>
      {label && (
        <Fieldset.Label withoutTag={withoutTagLabel}>{label}</Fieldset.Label>
      )}
      <div className="grid grid-cols-[1fr_max-content_1fr] items-center gap-2">
        <Fieldset.TextInput
          type="text"
          placeholder="mmm"
          value={minutes}
          onChange={handleMinutesChange}
          onBlur={handleMinutesBlur}
          lengthCap={3}
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
