import Select, { GroupBase, OptionProps, SingleValue } from "react-select";

import { FieldsetSelectOption } from "#/components/form/model";
import { FieldsetSelectDropdownIndicator } from "#/components/form/components/fieldset/FieldsetSelectDropdownIndicator";
import { FieldsetSelectDefaultOptionComponent } from "#/components/form/components/fieldset/FieldsetSelectDefaultOptionComponent";

import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";
import { cn } from "#/utils";

interface FieldsetSelectProps {
  placeholder: string;
  options: FieldsetSelectOption[];
  onChange: (value: SingleValue<FieldsetSelectOption>) => void;
  onBlur?: () => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  isSearchable?: boolean;
  defaultValue?: SingleValue<FieldsetSelectOption> | null;
  value: SingleValue<FieldsetSelectOption> | null;
  children?: React.ComponentType<
    OptionProps<unknown, boolean, GroupBase<unknown>>
  >; // for option component
}

export function FieldsetSelect({
  onBlur,
  onChange,
  onFocus,
  options,
  placeholder,
  isSearchable = true,
  defaultValue = null,
  value = null,
  children,
}: Readonly<FieldsetSelectProps>) {
  const { isDisabled, isError, isLarge, isMedium, isSmall } =
    useFieldsetContext();

  return (
    <Select
      options={options}
      placeholder={placeholder}
      onChange={(value) => {
        onChange?.(value as SingleValue<FieldsetSelectOption>);
      }}
      onBlur={onBlur}
      onFocus={onFocus}
      menuPlacement="auto"
      menuPosition="fixed"
      isDisabled={isDisabled}
      isSearchable={isSearchable}
      defaultValue={defaultValue}
      value={value}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: FieldsetSelectDropdownIndicator,
        Option: children ?? FieldsetSelectDefaultOptionComponent,
      }}
      // className="duration-150"
      classNames={{
        container: () => cn("cursor-pointer h-8!"),
        control: (state) =>
          cn(
            "rounded-md! border-(--fieldset-border-color)! duration-150! cursor-pointer! gap-[0.625rem]",
            {
              "ring-0! border-(--fieldset-border-color--error)! hover:border-(--fieldset-border-color--error)! bg-(--fieldset-bg--error)!":
                isError,
              "ring-0! border-(--fieldset-border-color--focus)! hover:border-(--fieldset-border-color--focus)!":
                state.isFocused,
              "h-(--fieldset-height-large)! min-h-(--fieldset-height-large)! px-[0.875rem]":
                isLarge,
              "h-(--fieldset-height-medium)! min-h-(--fieldset-height-medium)! px-3":
                isMedium,
              "h-(--fieldset-height-small)! min-h-(--fieldset-height-small)! px-[0.625rem]":
                isSmall,
            },
          ),
        dropdownIndicator() {
          return cn({
            "size-[1.125rem]": isLarge,
            "size-4": isMedium,
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
      }}
    />
  );
}
