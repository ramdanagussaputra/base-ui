import {
  GroupBase,
  OptionProps,
  SelectComponentsConfig,
  SingleValue,
} from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";

import { FieldsetSelectOption } from "#/components/form/model";
import { FieldsetSelectDropdownIndicator } from "#/components/form/components/fieldset/FieldsetSelectDropdownIndicator";
import { FieldsetSelectDefaultOptionComponent } from "#/components/form/components/fieldset/FieldsetSelectDefaultOptionComponent";
import { FieldsetSelectClearIndicator } from "#/components/form/components/fieldset/FieldsetSelectClearIndicator";
import { FieldsetSelectMultiValueRemove } from "#/components/form/components/fieldset/FieldsetSelectMultiValueRemove";
import { createFieldsetSelectOptionWithSelectedState } from "#/components/form/components/fieldset/FieldsetSelectOptionWithSelectedState";
import { createFieldsetSelectCheckboxOption } from "#/components/form/components/fieldset/FieldsetSelectCheckboxOption";

import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";
import { cn } from "#/utils";
import {
  calculateMaxHeight,
  createValueContainerStyle,
} from "#/components/form/components/fieldset/utils/multiselectUtils";

interface LoadOptionsResponse {
  options: FieldsetSelectOption[];
  hasMore: boolean;
  additional?: any;
}

interface FieldsetAsyncPaginateProps {
  placeholder: string;
  defaultOptions?: FieldsetSelectOption[] | boolean;
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
  menuPortalTarget?: HTMLElement | null;
  // New props for already selected functionality
  alreadySelectedValues?: FieldsetSelectOption[];
  showAlreadySelectedText?: boolean;
  alreadySelectedText?: string;
  // AsyncPaginate specific props
  loadOptions: (
    inputValue: string,
    loadedOptions: readonly FieldsetSelectOption[],
    additional?: any,
  ) => Promise<LoadOptionsResponse>;
  additional?: any;
  defaultAdditional?: any;
  debounceTimeout?: number;
  shouldLoadMore?: (
    scrollHeight: number,
    clientHeight: number,
    scrollTop: number,
  ) => boolean;
  reduceOptions?: (
    prevOptions: readonly FieldsetSelectOption[],
    loadedOptions: readonly FieldsetSelectOption[],
    additional?: any,
  ) => FieldsetSelectOption[];
  cacheUniqs?: any[];
  loadOptionsOnMenuOpen?: boolean;
  clearCacheOnSearchChange?: boolean;
  clearCacheOnMenuClose?: boolean;
  reloadOnErrorTimeout?: number;
  // Multi-select checkbox configuration
  enableCheckboxes?: boolean;
  checkboxPosition?: "left" | "right";
  // Multiselect height constraints
  maxHeight?: number | string;
}

export function FieldsetAsyncPaginate({
  onBlur,
  onChange,
  onFocus,
  defaultOptions = true,
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
  additional,
  defaultAdditional,
  debounceTimeout = 300,
  shouldLoadMore,
  reduceOptions,
  cacheUniqs,
  loadOptionsOnMenuOpen = true,
  clearCacheOnSearchChange = false,
  clearCacheOnMenuClose = false,
  reloadOnErrorTimeout,
  enableCheckboxes = false,
  checkboxPosition = "left",
  maxHeight,
}: Readonly<FieldsetAsyncPaginateProps>) {
  const { isDisabled, isError, isLarge, isMedium, isSmall } =
    useFieldsetContext();

  // Calculate max height for multiselect using shared utility
  const calculatedMaxHeight = isMultiSelect
    ? calculateMaxHeight(maxHeight, isLarge, isMedium, isSmall)
    : undefined;

  // Create the custom option component with already selected state if needed
  const OptionComponent =
    children ??
    (enableCheckboxes && isMultiSelect
      ? createFieldsetSelectCheckboxOption(checkboxPosition)
      : alreadySelectedValues.length > 0
        ? createFieldsetSelectOptionWithSelectedState({
            alreadySelectedValues,
            currentValue: value,
            showAlreadySelectedText,
            alreadySelectedText,
          })
        : FieldsetSelectDefaultOptionComponent);

  return (
    <AsyncPaginate
      defaultOptions={defaultOptions}
      loadOptions={loadOptions as any}
      placeholder={placeholder}
      onChange={(value) => {
        onChange?.(value as SingleValue<FieldsetSelectOption>);
      }}
      onBlur={onBlur}
      isMulti={isMultiSelect}
      onFocus={onFocus}
      menuPlacement="auto"
      menuPosition="fixed"
      isDisabled={isDisabled}
      isSearchable={isSearchable}
      defaultValue={defaultValue}
      closeMenuOnSelect={enableCheckboxes ? false : !isMultiSelect}
      hideSelectedOptions={enableCheckboxes ? false : undefined}
      value={value}
      menuPortalTarget={menuPortalTarget}
      additional={additional}
      defaultAdditional={defaultAdditional}
      debounceTimeout={debounceTimeout}
      shouldLoadMore={shouldLoadMore}
      reduceOptions={reduceOptions as any}
      cacheUniqs={cacheUniqs}
      loadOptionsOnMenuOpen={loadOptionsOnMenuOpen}
      clearCacheOnSearchChange={clearCacheOnSearchChange}
      clearCacheOnMenuClose={clearCacheOnMenuClose}
      reloadOnErrorTimeout={reloadOnErrorTimeout}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: isDisabled ? null : FieldsetSelectDropdownIndicator,
        ClearIndicator: FieldsetSelectClearIndicator,
        Option: OptionComponent,
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
