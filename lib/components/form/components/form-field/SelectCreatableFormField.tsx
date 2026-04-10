import { Controller, FieldValues } from "react-hook-form";
import {
  GroupBase,
  MenuPlacement,
  OptionProps,
  SelectComponentsConfig,
  SingleValue,
} from "react-select";

import {
  FieldsetSelectOption,
  FieldsetSelectOptionOrGroup,
  FormFieldProps,
} from "#/components/form/model";
import { Fieldset } from "#/components/form/components/fieldset/Fieldset";

interface SelectCreatableFormFieldProps<
  MultiSelect extends boolean = false,
  TFieldValues extends FieldValues = any,
> extends Omit<FormFieldProps<TFieldValues>, "type" | "onChange"> {
  options: FieldsetSelectOptionOrGroup[];
  onChange?: (
    value: MultiSelect extends true
      ? FieldsetSelectOption[]
      : SingleValue<FieldsetSelectOption>,
  ) => void;
  isSearchable?: boolean;
  isMultiSelect?: boolean;
  defaultValue?: MultiSelect extends true
    ? FieldsetSelectOption[]
    : SingleValue<FieldsetSelectOption> | null;
  children?: React.ComponentType<
    OptionProps<unknown, boolean, GroupBase<unknown>>
  >; // for option component
  selectComponentOptions?: Partial<
    SelectComponentsConfig<unknown, boolean, GroupBase<unknown>>
  >;
  menuPortalTarget?: HTMLElement | null;
  menuPlacement?: MenuPlacement;
  // Multiselect height constraints
  maxHeight?: number | string;
}

export function SelectCreatableFormField<
  MultiSelect extends boolean = false,
  TFieldValues extends FieldValues = any,
>({
  control,
  name,
  label,
  options,
  onChange,
  isSearchable = true,
  isMultiSelect = false,
  defaultValue,
  placeholder,
  fieldName,
  isDisabled = false,
  isRequired = false,
  rules,
  size = "medium",
  withoutTagLabel = false,
  children,
  selectComponentOptions,
  menuPortalTarget,
  menuPlacement,
  maxHeight,
}: Readonly<SelectCreatableFormFieldProps<MultiSelect, TFieldValues>>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: {
          value: isRequired,
          message: `${fieldName || label} is required`,
        },
        ...rules,
      }}
      render={({ field, fieldState }) => (
        <Fieldset
          size={size}
          isRequired={isRequired}
          isDisabled={isDisabled}
          isError={!!fieldState.error}
        >
          {label && (
            <Fieldset.Label withoutTag={withoutTagLabel}>
              {label}
            </Fieldset.Label>
          )}

          <Fieldset.SelectCreatable
            isMultiSelect={isMultiSelect}
            isSearchable={isSearchable}
            placeholder={placeholder}
            options={options}
            onChange={(value) => {
              field.onChange(value);
              onChange?.(value);
            }}
            defaultValue={defaultValue}
            value={field.value}
            onBlur={field.onBlur}
            selectComponentOptions={selectComponentOptions}
            menuPortalTarget={menuPortalTarget}
            menuPlacement={menuPlacement}
            fieldName={fieldName || label}
            maxHeight={maxHeight}
          >
            {children}
          </Fieldset.SelectCreatable>

          {fieldState.error?.message && (
            <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
          )}
        </Fieldset>
      )}
    />
  );
}
