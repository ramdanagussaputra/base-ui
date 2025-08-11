// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";

type DurationFormFieldProp = Omit<FormFieldProps, "type" | "onChange"> & {
  onChange?: (value: string) => void;
  endElement?: React.ReactNode;
  name: string;
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
}: Readonly<DurationFormFieldProp>) {
  const { setValue, watch } = useFormContext();
  const formValue = watch(name) || "";
  const [minutes, setMinutes] = React.useState("");
  const [seconds, setSeconds] = React.useState("");

  // Sync local state with form value
  // Helper to pad numbers with leading zeros
  const padMinutes = (val: string) => (val === "" ? "" : val.padStart(3, "0"));
  const padSeconds = (val: string) => (val === "" ? "" : val.padStart(2, "0"));

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
          onBlur={() => {
            const padded = padMinutes(minutes);
            setMinutes(padded);
            const consolidated = `${padded}:${seconds}`;
            setValue(name, consolidated);
            onChange?.(consolidated);
          }}
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
          onBlur={() => {
            let secNum = parseInt(seconds.replace(/\D/g, ""), 10);
            let minNum = parseInt(minutes || "0", 10);
            if (seconds === "" || isNaN(secNum)) {
              setSeconds("");
              const consolidated = `${padMinutes(minNum.toString())}:`;
              setValue(name, consolidated);
              onChange?.(consolidated);
              return;
            }
            if (secNum >= 60) {
              const extraMin = Math.floor(secNum / 60);
              const remainingSec = secNum % 60;
              minNum += extraMin;
              secNum = remainingSec;
            }
            const paddedMin = padMinutes(minNum.toString());
            const paddedSec = padSeconds(secNum.toString());
            setMinutes(paddedMin);
            setSeconds(paddedSec);
            const consolidated = `${paddedMin}:${paddedSec}`;
            setValue(name, consolidated);
            onChange?.(consolidated);
          }}
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
