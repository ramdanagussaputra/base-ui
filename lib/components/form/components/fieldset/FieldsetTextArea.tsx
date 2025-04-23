import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";
import { cn } from "#/utils";
import { useCallback } from "react";

interface FieldsetTextAreaProps {
  placeholder: string;
  value: string | readonly string[] | undefined;
  lengthCap?: number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  height?: number;
  minHeight?: number;
  maxHeight?: number;
}

export function FieldsetTextArea({
  placeholder,
  value,
  lengthCap,
  onBlur = () => {},
  onChange = () => {},
  onFocus = () => {},
  height = 200,
  minHeight,
  maxHeight,
}: Readonly<FieldsetTextAreaProps>) {
  const { isDisabled, isError } = useFieldsetContext();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <textarea
      placeholder={placeholder}
      maxLength={lengthCap}
      disabled={isDisabled}
      value={value}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={handleChange}
      className={cn(
        "text-b3-500 placeholder:text-b3-500 resize-y rounded-md border border-(--fieldset-border-color) bg-(--fieldset-bg) px-3 py-2.5 text-(--fieldset-text-color) duration-100 outline-none placeholder:text-(--fieldset-placeholder-color) autofill:bg-transparent focus:border-(--fieldset-border-color--focus) disabled:text-(--fieldset-text-color--disabled) disabled:placeholder:text-(--fieldset-placeholder-color--disabled)",
        {
          "bg-(--fieldset-bg--disabled)": isDisabled,
          "border-(--fieldset-border-color--error) bg-(--fieldset-bg--error)":
            isError,
        },
      )}
      style={{
        height: `${height}px`,
        minHeight: minHeight ? `${minHeight}px` : undefined,
        maxHeight: maxHeight ? `${maxHeight}px` : undefined,
      }}
    />
  );
}
