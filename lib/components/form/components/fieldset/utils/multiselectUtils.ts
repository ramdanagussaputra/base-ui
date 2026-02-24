import { OptionProps, GroupBase } from "react-select";
import { FieldsetSelectOption } from "#/components/form/model";
import { createFieldsetSelectOptionWithSelectedState } from "#/components/form/components/fieldset/FieldsetSelectOptionWithSelectedState";
import { FieldsetSelectDefaultOptionComponent } from "#/components/form/components/fieldset/FieldsetSelectDefaultOptionComponent";
import { FieldsetSelectMultiCheckboxOption } from "#/components/form/components/fieldset/FieldsetSelectMultiCheckboxOption";

/**
 * Calculates the maximum height for multiselect valueContainer
 * @param maxHeight - Custom height or undefined for default
 * @param isLarge - Large size variant
 * @param isMedium - Medium size variant
 * @param isSmall - Small size variant
 * @returns Height string for CSS or undefined if not multiselect
 */
export const calculateMaxHeight = (
  maxHeight: number | string | undefined,
  isLarge: boolean,
  isMedium: boolean,
  isSmall: boolean,
): string | undefined => {
  if (maxHeight) {
    return typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;
  }

  // Default heights based on size variants
  if (isLarge) return "180px";
  if (isMedium) return "150px";
  if (isSmall) return "120px";
  return "150px"; // fallback
};

/**
 * Creates the appropriate option component based on already selected values
 * @param children - Custom option component
 * @param alreadySelectedValues - Already selected options
 * @param value - Current value
 * @param showAlreadySelectedText - Show already selected text
 * @param alreadySelectedText - Already selected text
 * @param isMultiSelect - Whether multiselect is enabled
 * @returns Option component
 */
export const createOptionComponent = (
  children:
    | React.ComponentType<OptionProps<unknown, boolean, GroupBase<unknown>>>
    | undefined,
  alreadySelectedValues: FieldsetSelectOption[],
  value: any,
  showAlreadySelectedText: boolean,
  alreadySelectedText: string,
  useCheckboxOptions: boolean = false,
) => {
  if (children) return children;

  // Use checkbox option for multiselect
  if (useCheckboxOptions) {
    return FieldsetSelectMultiCheckboxOption;
  }

  if (alreadySelectedValues.length > 0) {
    return createFieldsetSelectOptionWithSelectedState({
      alreadySelectedValues,
      currentValue: Array.isArray(value) ? null : value,
      showAlreadySelectedText,
      alreadySelectedText,
    });
  }

  return FieldsetSelectDefaultOptionComponent;
};

/**
 * Creates a standardized valueContainer style for react-select
 * @param provided - React-select provided styles
 * @param calculatedMaxHeight - The calculated max height
 * @returns Style object for valueContainer
 */
export const createValueContainerStyle = (
  provided: any,
  calculatedMaxHeight: string | undefined,
) => ({
  ...provided,
  ...(calculatedMaxHeight && {
    maxHeight: calculatedMaxHeight,
    overflowY: "auto" as const,
  }),
});

/**
 * Generates a create label for creatable selects
 * @param inputValue - The input value
 * @param fieldName - Optional field name for context
 * @returns Formatted create label
 */
export const generateCreateLabel = (
  inputValue: string,
  fieldName?: string,
): string => `Add new ${fieldName ? `${fieldName} "` : '"'}${inputValue}"`;

/**
 * Checks if the maximum selected limit has been reached
 * @param value - Current selected value(s)
 * @param maxSelected - Maximum number of selections allowed
 * @param isMultiSelect - Whether multiselect is enabled
 * @returns True if limit is reached, false otherwise
 */
export const isMaxSelectedReached = (
  value: any,
  maxSelected: number | undefined,
  isMultiSelect: boolean,
): boolean => {
  if (!isMultiSelect || !maxSelected) return false;

  if (Array.isArray(value)) {
    return value.length >= maxSelected;
  }

  return false;
};

/**
 * Handles exclusive group logic for multi-select
 * When an option with exclusiveGroup is selected, it removes all other options (both exclusive and non-exclusive)
 * When an option without exclusiveGroup is selected, it removes all options with exclusiveGroup
 * @param currentValue - Current selected values
 * @param newOption - Newly selected/deselected option
 * @param isSelected - Whether the option is being selected (true) or deselected (false)
 * @returns Filtered array of selected options
 */
export const handleExclusiveGroupSelection = (
  currentValue: FieldsetSelectOption[],
  newOption: FieldsetSelectOption,
  isSelected: boolean,
): FieldsetSelectOption[] => {
  // If deselecting, just remove the option
  if (!isSelected) {
    return currentValue.filter((item) => item.value !== newOption.value);
  }

  // If the new option has an exclusive group
  if (newOption.exclusiveGroup) {
    // Remove ALL other options - only keep the new one
    // This ensures that selecting any exclusive option clears everything else
    return [newOption];
  }

  // If the new option DOESN'T have an exclusive group
  // Remove all options that have an exclusive group
  const withoutExclusive = currentValue.filter((item) => !item.exclusiveGroup);

  // Add the new option if not already present
  if (!withoutExclusive.some((item) => item.value === newOption.value)) {
    return [...withoutExclusive, newOption];
  }

  return withoutExclusive;
};
