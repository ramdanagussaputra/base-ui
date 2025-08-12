import React, { useCallback, useState } from "react";

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
  suffix?: string;
  prefix?: string;
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
  suffix,
  prefix,
}: Readonly<FieldsetInputProps>) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
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

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocus(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback(() => {
    setIsFocus(false);
    onBlur?.();
  }, [onBlur]);

  return (
    <div
      className={cn("flex items-center", {
        "h-(--fieldset-height-large)": isLarge,
        "h-(--fieldset-height-medium)": isMedium,
        "h-(--fieldset-height-small)": isSmall,
      })}
    >
      {prefix && (
        <PrefixSuffix
          isFocus={isFocus}
          isLarge={isLarge}
          isMedium={isMedium}
          isSmall={isSmall}
          type="prefix"
        >
          {prefix}
        </PrefixSuffix>
      )}

      <div
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-md border border-(--fieldset-border-color) bg-(--fieldset-bg) px-[0.8125rem] duration-100 focus-within:border-(--fieldset-border-color--focus)",
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
            "rounded-l-none border-l-0 pl-0": !!prefix,
            "rounded-r-none border-r-0 pr-0": !!suffix,
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
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          className={cn(
            "h-full w-full bg-transparent text-(--fieldset-text-color) outline-none placeholder:text-(--fieldset-placeholder-color) autofill:bg-transparent disabled:text-(--fieldset-text-color--disabled) disabled:placeholder:text-(--fieldset-placeholder-color--disabled)",
            {
              "text-b2-400 placeholder:text-b2-400": isLarge,
              "text-b3-400 placeholder:text-b3-400": isMedium,
              "text-b4-400 placeholder:text-b4-400": isSmall,
              "px-[0.8125rem]": !!suffix || !!prefix,
            },
          )}
        />

        {/* Icon slot */}
        <span className="shrink-0">{children}</span>
      </div>

      {suffix && (
        <PrefixSuffix
          isFocus={isFocus}
          isLarge={isLarge}
          isMedium={isMedium}
          isSmall={isSmall}
          type="suffix"
        >
          {suffix}
        </PrefixSuffix>
      )}
    </div>
  );
}

function PrefixSuffix({
  isFocus,
  isLarge,
  isMedium,
  isSmall,
  type,
  children,
}: {
  isFocus: boolean;
  isLarge: boolean;
  isMedium: boolean;
  isSmall: boolean;
  type: "prefix" | "suffix";
  children: React.ReactNode;
}) {
  const isPrefix = type === "prefix";
  const isSuffix = type === "suffix";

  return (
    <div
      className={cn(
        "bg-primary-50 border-primary-600/20 flex h-full w-fit items-center justify-center border",
        {
          "border-(--fieldset-border-color--focus)": isFocus,
          "rounded-r-md": isSuffix,
          "rounded-l-md": isPrefix,
        },
      )}
    >
      <span
        className={cn("text-b4-400 text-primary-600 px-[0.8125em]", {
          "text-b2-400 placeholder:text-b2-400": isLarge,
          "text-b3-400 placeholder:text-b3-400": isMedium,
          "text-b4-400 placeholder:text-b4-400": isSmall,
        })}
      >
        {children}
      </span>
    </div>
  );
}
