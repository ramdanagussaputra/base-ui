import React, { useCallback } from "react";

import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";
import { cn, extractNumbersFromString } from "#/utils";

interface FieldsetInputProps {
  placeholder: string;
  value: string | readonly string[] | undefined;
  lengthCap?: number;
  children?: React.ReactNode;
  type: "text" | "email" | "password" | "number";
  isReverseIcon?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  tabIndex?: number;
  id?: string;
  defaultValue?: any;
}

export function FieldsetInput({
  children,
  value,
  placeholder,
  lengthCap,
  isReverseIcon = false,
  onBlur = () => {},
  onChange = () => {},
  onFocus = () => {},
  type = "text",
  className,
  name,
  tabIndex,
  id,
  defaultValue,
}: Readonly<FieldsetInputProps>) {
  const { isLarge, isMedium, isSmall, isDisabled, isError } =
    useFieldsetContext();

  const isNumber = type === "number";

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isNumber) {
        const number = extractNumbersFromString(event.target.value);
        onChange(number);
      } else {
        onChange(event.target.value);
      }
    },
    [isNumber, onChange],
  );

  return (
    <div
      className={cn(
        "border-(--fieldset-border-color) bg-(--fieldset-bg) focus-within:border-(--fieldset-border-color--focus) flex items-center justify-between gap-2 rounded-md border px-[0.8125rem] duration-100",
        {
          "h-(--fieldset-height-large) gap-(--fieldset-container-gap-large)":
            isLarge,
          "h-(--fieldset-height-medium) gap-(--fieldset-container-gap-medium)":
            isMedium,
          "h-(--fieldset-height-small) gap-(--fieldset-container-gap-small)":
            isSmall,
          "bg-(--fieldset-bg--disabled)": isDisabled,
          "border-(--fieldset-border-color--error) bg-(--fieldset-bg--error)":
            isError,
          "flex-row-reverse": isReverseIcon,
        },
        className,
      )}
    >
      <input
        defaultValue={defaultValue}
        id={id}
        name={name}
        tabIndex={tabIndex}
        placeholder={placeholder}
        maxLength={lengthCap}
        disabled={isDisabled}
        value={value ?? ""}
        type={isNumber ? "text" : type}
        onBlur={onBlur}
        onChange={handleChange}
        onFocus={onFocus}
        className={cn(
          "text-(--fieldset-text-color) placeholder:text-(--fieldset-placeholder-color) disabled:text-(--fieldset-text-color--disabled) disabled:placeholder:text-(--fieldset-placeholder-color--disabled) h-full w-full bg-transparent outline-none autofill:bg-transparent",
          {
            "text-b2-400 placeholder:text-b2-400": isLarge,
            "text-b3-400 placeholder:text-b3-400": isMedium,
            "text-b4-400 placeholder:text-b4-400": isSmall,
          },
        )}
      />

      {/* Icon slot */}
      <span className="shrink-0">{children}</span>
    </div>
  );
}
