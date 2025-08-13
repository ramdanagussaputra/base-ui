// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Controller } from "react-hook-form";
import {
  GroupBase,
  OptionProps,
  SelectComponentsConfig,
  SingleValue,
} from "react-select";

import { FieldsetSelectOption, FormFieldProps } from "#/components/form/model";
import { Fieldset } from "#/components/form/components/fieldset/Fieldset";

interface SelectCreatableFormFieldProps<MultiSelect extends boolean = false>
  extends Omit<FormFieldProps, "type" | "onChange"> {
  options: FieldsetSelectOption[];
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
}

export function SelectCreatableFormField<MultiSelect extends boolean = false>({
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
}: Readonly<SelectCreatableFormFieldProps<MultiSelect>>) {
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
            fieldName={fieldName || label}
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
