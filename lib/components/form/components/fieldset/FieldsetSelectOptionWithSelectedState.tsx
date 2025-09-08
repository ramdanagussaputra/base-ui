import { OptionProps, GroupBase } from "react-select";
import { cn } from "#/utils";
import { FieldsetSelectOption } from "#/components/form/model";

interface FieldsetSelectOptionWithSelectedStateProps {
  alreadySelectedValues?: FieldsetSelectOption[];
  currentValue?: FieldsetSelectOption | null;
  showAlreadySelectedText?: boolean;
  alreadySelectedText?: string;
}

// Custom Option component to show selected values as disabled
export const createFieldsetSelectOptionWithSelectedState =
  ({
    alreadySelectedValues = [],
    currentValue,
    showAlreadySelectedText = true,
    alreadySelectedText = "(Already selected)",
  }: FieldsetSelectOptionWithSelectedStateProps) =>
  (props: OptionProps<unknown, boolean, GroupBase<unknown>>) => {
    // Type guard to ensure data is FieldsetSelectOption
    const data = props.data as FieldsetSelectOption;

    const isAlreadySelected = alreadySelectedValues?.some(
      (selectedOption) =>
        selectedOption?.value === data.value &&
        currentValue?.value !== data.value, // Don't mark current value as already selected
    );

    // If already selected, prevent selection by overriding the onClick behavior
    const handleClick = (e: React.MouseEvent) => {
      if (isAlreadySelected) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      // Call the original selectOption if not disabled
      if (props.selectOption) {
        props.selectOption(props.data);
      }
    };

    return (
      <div
        className={cn(
          "flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-(length:--fieldset-select-option-font-size)! leading-(--fieldset-select-option-line-height)! font-(--fieldset-select-option-font-weight)! font-normal! duration-150! hover:bg-(--fieldset-select-option-bg--hover)",
          {
            // Disabled/Already selected styling
            "cursor-not-allowed bg-gray-50 opacity-60": isAlreadySelected,
            // Available options styling
            "transition-colors duration-150": !isAlreadySelected,
            "bg-(--fieldset-select-option-bg--hover)":
              props.isFocused && !isAlreadySelected,
            "bg-(--fieldset-select-option-bg--hover)! font-(--fieldset-select-option-font-weight--selected)! text-(--fieldset-select-option-color)!":
              props.isSelected && !isAlreadySelected,
          },
        )}
        onClick={handleClick}
        onMouseDown={(e) => {
          if (isAlreadySelected) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <div
          className={cn("flex w-full items-center justify-between", {
            "text-gray-400": isAlreadySelected,
            "text-(--fieldset-select-option-color)": !isAlreadySelected,
          })}
        >
          <span>{data.label}</span>
          {isAlreadySelected && showAlreadySelectedText && (
            <span className="ml-2 text-xs text-gray-400">
              {alreadySelectedText}
            </span>
          )}
        </div>
      </div>
    );
  };
