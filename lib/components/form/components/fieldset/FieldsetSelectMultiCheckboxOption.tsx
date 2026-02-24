import { OptionProps, GroupBase } from "react-select";
import { FieldsetSelectOption } from "#/components/form/model";
import { cn } from "#/utils";
import { Fieldset } from "./Fieldset";

/**
 * Multi-select checkbox option component
 * Shows a checkbox on the left side of each option
 */
export function FieldsetSelectMultiCheckboxOption(
  props: OptionProps<unknown, boolean, GroupBase<unknown>>,
) {
  const option = props.data as FieldsetSelectOption;
  const { isSelected, isFocused, innerRef, innerProps } = props;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2.5",
        "text-(length:--fieldset-select-option-font-size)! leading-(--fieldset-select-option-line-height)! font-(--fieldset-select-option-font-weight)!",
        "transition-colors duration-150",
        {
          "bg-(--fieldset-select-option-bg--hover)": isFocused || isSelected,
          "hover:bg-(--fieldset-select-option-bg--hover)": !isFocused,
        },
      )}
    >
      {/* Checkbox - conditionally rendered */}
      {!option.hideCheckbox && (
        <Fieldset.Checkbox checked={isSelected} onChange={() => {}} />
      )}

      {/* Option Label */}
      <span
        className={cn("flex-1 text-(--fieldset-select-option-color)!", {
          "font-(--fieldset-select-option-font-weight--selected)!": isSelected,
        })}
      >
        {option.label}
      </span>
    </div>
  );
}
