import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";
import { cn, extractNumbersFromString } from "#/utils";
import { useCallback } from "react";

interface FieldsetInputProps {
  readonly placeholder: string;
  readonly value: string | readonly string[] | undefined;
  readonly lengthCap?: number;
  readonly children?: React.ReactNode;
  readonly type: "text" | "email" | "password" | "number";
  readonly isReverseIcon?: boolean;
  readonly onChange?: (
    event: React.ChangeEvent<HTMLInputElement> | string,
  ) => void;
  readonly onBlur?: () => void;
  readonly onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
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
}: FieldsetInputProps) {
  const { isLarge, isMedium, isSmall, isDisabled, isError } =
    useFieldsetContext();

  const isNumber = type === "number";

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const number = extractNumbersFromString(event.target.value);

      onChange(event);

      if (isNumber) {
        onChange(number);
      } else {
        onChange(event);
      }
    },
    [isNumber, onChange],
  );

  return (
    <div
      className={cn(
        "border-secondary-100 bg-neutral-0 flex items-center justify-between gap-2 rounded-md border px-[0.8125rem]",
        {
          "h-[3rem] gap-1.5": isLarge,
          "h-[2.5rem] gap-1.5": isMedium,
          "h-[2rem] gap-1": isSmall,
          "bg-neutral-50": isDisabled,
          "bg-error-0 border-error-200": isError,
          "flex-row-reverse": isReverseIcon,
        },
      )}
    >
      <input
        placeholder={placeholder}
        maxLength={lengthCap}
        disabled={isDisabled}
        value={value ?? ""}
        type={isNumber ? "text" : type}
        onBlur={onBlur}
        onChange={handleChange}
        onFocus={onFocus}
        className={cn(
          "placeholder:text-secondary-400 disabled:text-secondary-400 disabled:placeholder:text-secondary-400 text-secondary-800 h-full w-full bg-transparent outline-none autofill:bg-transparent",
          {
            "text-b2-500 placeholder:text-b2-500": isLarge,
            "text-b3-500 placeholder:text-b3-500": isMedium,
            "text-b4-500 placeholder:text-b4-500": isSmall,
          },
        )}
      />

      {/* Icon slot */}
      <span className="shrink-0">{children}</span>
    </div>
  );
}
