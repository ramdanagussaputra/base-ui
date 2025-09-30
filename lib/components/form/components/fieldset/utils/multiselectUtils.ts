import { OptionProps, GroupBase } from "react-select";
import { FieldsetSelectOption } from "#/components/form/model";
import { createFieldsetSelectOptionWithSelectedState } from "#/components/form/components/fieldset/FieldsetSelectOptionWithSelectedState";
import { FieldsetSelectDefaultOptionComponent } from "#/components/form/components/fieldset/FieldsetSelectDefaultOptionComponent";

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
) => {
  if (children) return children;

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
