import React from "react";
import { OptionProps, GroupBase } from "react-select";
import { FieldsetSelectOption } from "#/components/form/model";
import { FieldsetCheckbox } from "#/components/form/components/fieldset/FieldsetCheckbox";
import { cn } from "#/utils";

export function createFieldsetSelectCheckboxOption(
  checkboxPosition: "left" | "right" = "left",
) {
  return function FieldsetSelectCheckboxOption({
    data,
    isSelected,
    isFocused,
    innerRef,
    innerProps,
    selectProps,
  }: OptionProps<unknown, boolean, GroupBase<unknown>>) {
    const option = data as FieldsetSelectOption;
    const handleCheckboxClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (selectProps.onChange) {
        const currentValue =
          (selectProps.value as FieldsetSelectOption[]) || [];

        if (isSelected) {
          // Remove the option from selected values
          const newValue = currentValue.filter(
            (item) => item.value !== option.value,
          );
          selectProps.onChange(
            newValue as any,
            { action: "deselect-option", option } as any,
          );
        } else {
          // Add the option to selected values
          const newValue = [...currentValue, option];
          selectProps.onChange(
            newValue as any,
            { action: "select-option", option } as any,
          );
        }
      }
    };

    const handleOptionClick = (e: React.MouseEvent) => {
      // If clicking on checkbox, let the checkbox handler take care of it
      if ((e.target as HTMLElement).closest(".checkbox-container")) {
        return;
      }

      // Otherwise handle normal option click
      if (innerProps.onClick) {
        innerProps.onClick(e as any);
      }
    };

    const CheckboxElement = (
      <div
        className="checkbox-container flex items-center justify-center p-1"
        onClick={handleCheckboxClick}
      >
        <FieldsetCheckbox
          checked={isSelected}
          onChange={() => {}} // Controlled by onClick
          value={option.value}
        />
      </div>
    );

    return (
      <div
        ref={innerRef}
        {...innerProps}
        onClick={handleOptionClick}
        className={cn(
          "flex cursor-pointer items-center rounded-md px-3 py-2",
          "transition-colors duration-150 hover:bg-gray-100",
          {
            "bg-blue-50": isFocused,
            "bg-blue-100": isSelected,
          },
        )}
      >
        {checkboxPosition === "left" && CheckboxElement}

        <div className="flex-1 truncate px-2">{option.label}</div>

        {checkboxPosition === "right" && CheckboxElement}
      </div>
    );
  };
}
