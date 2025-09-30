import {
  GroupBase,
  MenuPlacement,
  OptionProps,
  SelectComponentsConfig,
  SingleValue,
} from "react-select";

import CreatableSelect from "react-select/creatable";

import { FieldsetSelectOption } from "#/components/form/model";
import { FieldsetSelectDropdownIndicator } from "#/components/form/components/fieldset/FieldsetSelectDropdownIndicator";
import { FieldsetSelectDefaultOptionComponent } from "#/components/form/components/fieldset/FieldsetSelectDefaultOptionComponent";
import { FieldsetSelectClearIndicator } from "#/components/form/components/fieldset/FieldsetSelectClearIndicator";
import { FieldsetSelectMultiValueRemove } from "#/components/form/components/fieldset/FieldsetSelectMultiValueRemove";

import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";
import { cn } from "#/utils";
import {
  calculateMaxHeight,
  createValueContainerStyle,
  generateCreateLabel,
} from "#/components/form/components/fieldset/utils/multiselectUtils";

interface FieldsetSelectCreatableProps<MultiSelect extends boolean = false> {
  placeholder: string;
  options: FieldsetSelectOption[];
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
  fieldName?: string;
  menuPlacement?: MenuPlacement;
  // Multiselect height constraints
  maxHeight?: number | string;
}

export function FieldsetSelectCreatable<MultiSelect extends boolean = false>({
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
  fieldName,
  onInputChange,
  menuPlacement = "auto",
  maxHeight,
}: Readonly<FieldsetSelectCreatableProps<MultiSelect>>) {
  const { isDisabled, isError, isLarge, isMedium, isSmall } =
    useFieldsetContext();

  // Calculate max height for multiselect using shared utility
  const calculatedMaxHeight = isMultiSelect
    ? calculateMaxHeight(maxHeight, isLarge, isMedium, isSmall)
    : undefined;

  return (
    <CreatableSelect
      options={options}
      placeholder={placeholder}
      onChange={(value) => {
        onChange?.(
          value as MultiSelect extends true
            ? FieldsetSelectOption[]
            : SingleValue<FieldsetSelectOption>,
        );
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
      value={value}
      formatCreateLabel={(inputValue) =>
        generateCreateLabel(inputValue, fieldName)
      }
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: isDisabled ? null : FieldsetSelectDropdownIndicator,
        ClearIndicator: FieldsetSelectClearIndicator,
        Option: children ?? FieldsetSelectDefaultOptionComponent,
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
