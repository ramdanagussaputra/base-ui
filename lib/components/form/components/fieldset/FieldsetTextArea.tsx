import { useCallback, useEffect, useRef } from "react";

import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";
import { cn } from "#/utils";

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
  isResizable?: boolean;
  fieldSizeFollowContent?: boolean;
  autoUppercase?: boolean;
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
  isResizable = true,
  fieldSizeFollowContent = false,
  autoUppercase = false,
}: Readonly<FieldsetTextAreaProps>) {
  const { isDisabled, isError } = useFieldsetContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = useCallback(() => {
    if (!fieldSizeFollowContent || !textareaRef.current) return;

    const textarea = textareaRef.current;
    const minHeightValue = minHeight || 200;
    const maxHeightValue = maxHeight || 600;

    // Reset height to auto to get the actual scrollHeight
    textarea.style.height = "auto";

    // Calculate the new height based on content
    const newHeight = Math.min(
      Math.max(textarea.scrollHeight, minHeightValue),
      maxHeightValue,
    );

    // Set the new height
    textarea.style.height = `${newHeight}px`;
  }, [fieldSizeFollowContent, minHeight, maxHeight]);

  useEffect(() => {
    if (fieldSizeFollowContent) {
      autoResize();
    }
  }, [value, autoResize, fieldSizeFollowContent]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      let inputValue = event.target.value;

      if (autoUppercase) {
        inputValue = inputValue.toUpperCase();
      }

      onChange(inputValue);
      if (fieldSizeFollowContent) {
        // Delay auto-resize to next tick to ensure DOM is updated
        setTimeout(autoResize, 0);
      }
    },
    [autoUppercase, onChange, fieldSizeFollowContent, autoResize],
  );

  return (
    <textarea
      ref={textareaRef}
      placeholder={placeholder}
      maxLength={lengthCap}
      disabled={isDisabled}
      value={value}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={handleChange}
      className={cn(
        "text-b3-500 placeholder:text-b3-500 rounded-md border border-(--fieldset-border-color) bg-(--fieldset-bg) px-3 py-2.5 text-(--fieldset-text-color) duration-100 outline-none placeholder:text-(--fieldset-placeholder-color) autofill:bg-transparent focus:border-(--fieldset-border-color--focus) disabled:text-(--fieldset-text-color--disabled) disabled:placeholder:text-(--fieldset-placeholder-color--disabled)",
        {
          "resize-y": isResizable && !fieldSizeFollowContent,
          "resize-none": !isResizable || fieldSizeFollowContent,
          "bg-(--fieldset-bg--disabled)": isDisabled,
          "border-(--fieldset-border-color--error) bg-(--fieldset-bg--error)":
            isError,
        },
      )}
      style={{
        height: fieldSizeFollowContent ? "auto" : `${height}px`,
        minHeight: minHeight ? `${minHeight}px` : undefined,
        maxHeight: maxHeight ? `${maxHeight}px` : undefined,
      }}
    />
  );
}
