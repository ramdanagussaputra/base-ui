import {
  GroupBase,
  MenuPlacement,
  OptionProps,
  SelectComponentsConfig,
  SingleValue,
  InputActionMeta,
} from "react-select";
import AsyncSelect from "react-select/async";

import { FieldsetSelectOption } from "#/components/form/model";
import { FieldsetSelectDropdownIndicator } from "#/components/form/components/fieldset/FieldsetSelectDropdownIndicator";
import { FieldsetSelectDefaultOptionComponent } from "#/components/form/components/fieldset/FieldsetSelectDefaultOptionComponent";
import { FieldsetSelectClearIndicator } from "#/components/form/components/fieldset/FieldsetSelectClearIndicator";
import { FieldsetSelectMultiValueRemove } from "#/components/form/components/fieldset/FieldsetSelectMultiValueRemove";
import { createFieldsetSelectOptionWithSelectedState } from "#/components/form/components/fieldset/FieldsetSelectOptionWithSelectedState";
import {
  calculateMaxHeight,
  createValueContainerStyle,
  isMaxSelectedReached,
} from "#/components/form/components/fieldset/utils";

import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";
import { cn } from "#/utils";

interface FieldsetAsyncSelectProps {
  placeholder: string;
  defaultOptions: FieldsetSelectOption[];
  onChange: (value: SingleValue<FieldsetSelectOption>) => void;
  onBlur?: () => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  isMultiSelect?: boolean;
  isSearchable?: boolean;
  defaultValue?: SingleValue<FieldsetSelectOption> | null;
  value: SingleValue<FieldsetSelectOption> | null;
  children?: React.ComponentType<
    OptionProps<unknown, boolean, GroupBase<unknown>>
  >; // for option component
  selectComponentOptions?: Partial<
    SelectComponentsConfig<unknown, boolean, GroupBase<unknown>>
  >;
  loadOptions?: (inputValue: string) => Promise<FieldsetSelectOption[]>;
  menuPortalTarget?: HTMLElement | null;
  // New props for already selected functionality
  alreadySelectedValues?: FieldsetSelectOption[];
  showAlreadySelectedText?: boolean;
  alreadySelectedText?: string;
  menuPlacement?: MenuPlacement;
  // Multiselect height constraints
  maxHeight?: number | string;
  // Maximum number of selections (only applies when isMultiSelect is true)
  maxSelected?: number;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  openMenuOnFocus?: boolean;
  openMenuOnClick?: boolean;
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
  inputValue?: string;
  menuIsOpen?: boolean;
  isClearable?: boolean;
}

export function FieldsetAsyncSelect({
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  defaultOptions,
  placeholder,
  isSearchable = true,
  isMultiSelect = false,
  defaultValue = null,
  value = null,
  selectComponentOptions,
  children,
  loadOptions,
  menuPortalTarget,
  alreadySelectedValues = [],
  showAlreadySelectedText = true,
  alreadySelectedText = "(Already selected)",
  menuPlacement = "auto",
  maxHeight,
  maxSelected,
  openMenuOnFocus,
  openMenuOnClick,
  onInputChange,
  inputValue,
  menuIsOpen,
  isClearable,
}: Readonly<FieldsetAsyncSelectProps>) {
  const { isDisabled, isError, isLarge, isMedium, isSmall, isRequired } =
    useFieldsetContext();

  // Calculate maxHeight for multiselect when specified
  const calculatedMaxHeight = calculateMaxHeight(
    maxHeight,
    isLarge,
    isMedium,
    isSmall,
  );

  // Create the custom option component with already selected state if needed
  const OptionComponent =
    children ??
    (alreadySelectedValues.length > 0
      ? createFieldsetSelectOptionWithSelectedState({
        alreadySelectedValues,
        currentValue: value,
        showAlreadySelectedText,
        alreadySelectedText,
      })
      : FieldsetSelectDefaultOptionComponent);

  // Check if max selected limit is reached
  const maxLimitReached = isMaxSelectedReached(
    value,
    maxSelected,
    isMultiSelect,
  );

  return (
    <AsyncSelect
      defaultOptions={defaultOptions}
      loadOptions={loadOptions}
      isClearable={isClearable ?? !isRequired}
      placeholder={placeholder}
      onChange={(value) => {
        onChange?.(value as SingleValue<FieldsetSelectOption>);
      }}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onInputChange={onInputChange}
      inputValue={inputValue}
      menuIsOpen={menuIsOpen}
      isMulti={isMultiSelect}
      onFocus={onFocus}
      menuPlacement={menuPlacement}
      menuPosition="fixed"
      isDisabled={isDisabled}
      isSearchable={isSearchable}
      defaultValue={defaultValue}
      closeMenuOnSelect={!isMultiSelect}
      value={value}
      openMenuOnFocus={openMenuOnFocus}
      openMenuOnClick={openMenuOnClick}
      menuPortalTarget={menuPortalTarget}
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
      styles={{
        valueContainer: (provided) =>
          createValueContainerStyle(provided, calculatedMaxHeight),
      }}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: isDisabled ? null : FieldsetSelectDropdownIndicator,
        ClearIndicator: FieldsetSelectClearIndicator,
        Option: OptionComponent,
        MultiValueRemove: FieldsetSelectMultiValueRemove,
        ...selectComponentOptions,
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
        valueContainer: () => cn("p-0!"),
        placeholder: () =>
          cn("m-0! text-(--fieldset-placeholder-color)!", {
            "text-(length:--fieldset-font-size-large)! leading-(--fieldset-line-height-large)! font-(--fieldset-font-weight-large)!":
              isLarge,
            "text-(length:--fieldset-font-size-medium)! leading-(--fieldset-line-height-medium)! font-(--fieldset-font-weight-medium)!":
              isMedium,
            "text-(length:--filedset-font-size-small)! leading-(--fieldset-line-height-small)! font-(--fieldset-font-weight-small)!":
              isSmall,
          }),
        singleValue: () =>
          cn("m-0! text-(--fieldset-text-color)!", {
            "text-(length:--fieldset-font-size-large)! leading-(--fieldset-line-height-large)! font-(--fieldset-font-weight-large)!":
              isLarge,
            "text-(length:--fieldset-font-size-medium)! leading-(--fieldset-line-height-medium)! font-(--fieldset-font-weight-medium)!":
              isMedium,
            "text-(length:--filedset-font-size-small)! leading-(--fieldset-line-height-small)! font-(--fieldset-font-weight-small)!":
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
