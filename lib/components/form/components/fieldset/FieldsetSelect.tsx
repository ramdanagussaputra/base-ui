import Select, {
  GroupBase,
  MenuPlacement,
  OptionProps,
  SelectComponentsConfig,
  SingleValue,
} from "react-select";

import {
  FieldsetSelectOption,
  FieldsetSelectOptionOrGroup,
} from "#/components/form/model";
import { FieldsetSelectDropdownIndicator } from "#/components/form/components/fieldset/FieldsetSelectDropdownIndicator";
import { FieldsetSelectClearIndicator } from "#/components/form/components/fieldset/FieldsetSelectClearIndicator";
import { FieldsetSelectMultiValueRemove } from "#/components/form/components/fieldset/FieldsetSelectMultiValueRemove";
import { FieldsetSelectMultiValue } from "#/components/form/components/fieldset/FieldsetSelectMultiValue";

import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";
import { cn } from "#/utils";
import {
  calculateMaxHeight,
  createOptionComponent,
  createValueContainerStyle,
  isMaxSelectedReached,
  handleExclusiveGroupSelection,
} from "#/components/form/components/fieldset/utils/multiselectUtils";

interface FieldsetSelectProps<MultiSelect extends boolean = false> {
  placeholder: string;
  options: FieldsetSelectOptionOrGroup[];
  onChange: (
    value: MultiSelect extends true
      ? FieldsetSelectOption[]
      : SingleValue<FieldsetSelectOption>,
  ) => void;
  onBlur?: () => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  isMultiSelect?: boolean;
  isSearchable?: boolean;
  defaultValue?: MultiSelect extends true
    ? FieldsetSelectOption[] | null
    : SingleValue<FieldsetSelectOption> | null;
  value: MultiSelect extends true
    ? FieldsetSelectOption[] | null
    : SingleValue<FieldsetSelectOption> | null;
  children?: React.ComponentType<
    OptionProps<unknown, boolean, GroupBase<unknown>>
  >; // for option component
  selectComponentOptions?: Partial<
    SelectComponentsConfig<unknown, boolean, GroupBase<unknown>>
  >;
  menuPortalTarget?: HTMLElement | null;
  onInputChange?: (inputValue: string) => void;
  // New props for already selected functionality
  alreadySelectedValues?: FieldsetSelectOption[];
  showAlreadySelectedText?: boolean;
  alreadySelectedText?: string;
  menuPlacement?: MenuPlacement;
  // Multiselect height constraints
  maxHeight?: number | string;
  // Maximum number of selections (only applies when isMultiSelect is true)
  maxSelected?: number;
  isClearable?: boolean;
  hideSelectedOptions?: boolean;
  useCheckboxOptions?: boolean; // Whether to use checkbox options for multiselect
}

/**
 * FieldsetSelect - A customizable select component with multiselect support and height constraints
 *
 * @template MultiSelect - Boolean type indicating if multiselect is enabled
 * @param props - Component props including select options, styling, and behavior configuration
 * @returns JSX.Element - Rendered select component
 */
export function FieldsetSelect<MultiSelect extends boolean = false>({
  onBlur,
  onChange,
  onFocus,
  options,
  placeholder,
  isSearchable = true,
  isMultiSelect = false,
  defaultValue = null,
  value = null,
  selectComponentOptions,
  children,
  menuPortalTarget,
  onInputChange,
  alreadySelectedValues = [],
  showAlreadySelectedText = true,
  alreadySelectedText = "(Already selected)",
  menuPlacement = "auto",
  maxHeight,
  maxSelected,
  isClearable,
  hideSelectedOptions = true,
  useCheckboxOptions = false,
}: Readonly<FieldsetSelectProps<MultiSelect>>) {
  const { isDisabled, isError, isLarge, isMedium, isSmall, isRequired } =
    useFieldsetContext();

  // Create the option component with proper configuration
  const OptionComponent = createOptionComponent(
    children,
    alreadySelectedValues,
    value,
    showAlreadySelectedText,
    alreadySelectedText,
    useCheckboxOptions,
  );

  // Calculate max height for multiselect
  const calculatedMaxHeight = isMultiSelect
    ? calculateMaxHeight(maxHeight, isLarge, isMedium, isSmall)
    : undefined;

  // Check if max selected limit is reached
  const maxLimitReached = isMaxSelectedReached(
    value,
    maxSelected,
    isMultiSelect,
  );

  return (
    <Select
      options={options}
      isClearable={isClearable ?? !isRequired}
      placeholder={placeholder}
      onChange={(newValue) => {
        if (isMultiSelect && Array.isArray(newValue)) {
          const currentArray = (value as FieldsetSelectOption[]) || [];
          const newArray = newValue as FieldsetSelectOption[];

          // Find what changed
          const addedOption = newArray.find(
            (item) => !currentArray.some((curr) => curr.value === item.value),
          );
          const removedOption = currentArray.find(
            (item) => !newArray.some((newItem) => newItem.value === item.value),
          );

          let processedValue: FieldsetSelectOption[];

          if (addedOption) {
            // Something was added, apply exclusive group logic
            processedValue = handleExclusiveGroupSelection(
              currentArray,
              addedOption,
              true,
            );
          } else if (removedOption) {
            // Something was removed
            processedValue = handleExclusiveGroupSelection(
              currentArray,
              removedOption,
              false,
            );
          } else {
            // Fallback to new value
            processedValue = newArray;
          }

          onChange?.(
            processedValue as MultiSelect extends true
              ? FieldsetSelectOption[]
              : SingleValue<FieldsetSelectOption>,
          );
        } else {
          // Single select, use as-is
          onChange?.(
            newValue as MultiSelect extends true
              ? FieldsetSelectOption[]
              : SingleValue<FieldsetSelectOption>,
          );
        }
      }}
      onBlur={onBlur}
      isMulti={isMultiSelect}
      onFocus={onFocus}
      menuPlacement={menuPlacement}
      menuPortalTarget={menuPortalTarget}
      menuPosition="fixed"
      isDisabled={isDisabled}
      isSearchable={isSearchable}
      onInputChange={onInputChange}
      defaultValue={defaultValue}
      closeMenuOnSelect={!isMultiSelect}
      hideSelectedOptions={hideSelectedOptions}
      value={value}
      isOptionDisabled={(option) => {
        // Disable option if max selected is reached and option is not already selected
        if (maxLimitReached) {
          if (Array.isArray(value)) {
            const typedOption = option as FieldsetSelectOption;
            return !value.some((v) => v.value === typedOption.value);
          }
        }
        return false;
      }}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: isDisabled ? null : FieldsetSelectDropdownIndicator,
        ClearIndicator: FieldsetSelectClearIndicator,
        Option: OptionComponent,
        MultiValue: FieldsetSelectMultiValue,
        MultiValueRemove: FieldsetSelectMultiValueRemove,
        ...selectComponentOptions,
      }}
      styles={{
        valueContainer: (provided) =>
          createValueContainerStyle(provided, calculatedMaxHeight),
      }}
      classNames={{
        container: () => cn("cursor-pointer"),
        menuPortal: () => cn("z-[1000]!"),
        control: (state) =>
          cn(
            "ring-0! rounded-md! border-(--fieldset-border-color)! duration-150! cursor-pointer! gap-[0.625rem]",
            {
              "border-(--fieldset-border-color--error)! hover:border-(--fieldset-border-color--error)! bg-(--fieldset-bg--error)!":
                isError,
              "border-(--fieldset-border-color--focus)! hover:border-(--fieldset-border-color--focus)!":
                state.isFocused,
              "bg-(--fieldset-bg--disabled)!": state.isDisabled,
              " min-h-(--fieldset-height-large)! px-[0.875rem]": isLarge,
              " min-h-(--fieldset-height-medium)! px-3": isMedium,
              " min-h-(--fieldset-height-small)! px-[0.625rem]": isSmall,
            },
          ),
        dropdownIndicator(state) {
          return cn({
            "size-[1.375rem]": isLarge,
            "size-4": isMedium,
            "size-[1.125rem]": isSmall,
            hidden: state.selectProps.menuIsOpen && isMultiSelect,
          });
        },
        clearIndicator() {
          return cn({
            "size-[1.125rem]": isLarge,
            "size-5": isMedium,
            "size-[0.875rem]": isSmall,
          });
        },
        valueContainer: () =>
          cn("p-0!", {
            // Enable scrolling for multiselect with height constraints
            "overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400":
              isMultiSelect,
            // Ensure proper flex behavior for multiselect
            "flex-wrap": isMultiSelect,
          }),
        placeholder: () =>
          cn("m-0! text-(--fieldset-placeholder-color)!", {
            "text-(length:--fieldset-font-size-large)! leading-(--fieldset-line-height-large)! font-(--fieldset-font-weight-large)!":
              isLarge,
            "text-(length:--fieldset-font-size-medium)! leading-(--fieldset-line-height-medium)! font-(--fieldset-font-weight-medium)!":
              isMedium,
            "text-(length:--fieldset-font-size-small)! leading-(--fieldset-line-height-small)! font-(--fieldset-font-weight-small)!":
              isSmall,
          }),
        singleValue: () =>
          cn("m-0! text-(--fieldset-text-color)!", {
            "text-(length:--fieldset-font-size-large)! leading-(--fieldset-line-height-large)! font-(--fieldset-font-weight-large)!":
              isLarge,
            "text-(length:--fieldset-font-size-medium)! leading-(--fieldset-line-height-medium)! font-(--fieldset-font-weight-medium)!":
              isMedium,
            "text-(length:--fieldset-font-size-small)! leading-(--fieldset-line-height-small)! font-(--fieldset-font-weight-small)!":
              isSmall,
            "text-(--fieldset-text-color--disabled)": isDisabled,
          }),
        menu: () => cn("p-[0.625rem] rounded-lg! shadow-secondary-100"),
        option: (state) =>
          cn(
            "text-(--fieldset-select-option-color)! text-(length:--fieldset-select-option-font-size)! leading-(--fieldset-select-option-line-height)! font-(--fieldset-select-option-font-weight)! hover:bg-(--fieldset-select-option-bg--hover) rounded-md cursor-pointer! font-normal! duration-150!",
            {
              "bg-(--fieldset-select-option-bg--hover)! text-(--fieldset-select-option-color)! font-(--fieldset-select-option-font-weight--selected)!":
                state.isSelected || state.isFocused,
            },
          ),
        multiValue: () =>
          cn(
            "border border-secondary-200 bg-secondary-50! rounded-sm! min-h-[1.75rem]!",
          ),
        multiValueLabel: () =>
          cn("text-b3-500! text-secondary-700! flex items-center!"),
        multiValueRemove: () =>
          cn("hover:bg-transparent!", {
            "size-[1.875rem]": isLarge,
            "size-7": isMedium,
            "size-[1.625rem]": isSmall,
          }),
      }}
    />
  );
}
