// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Controller } from "react-hook-form";
import { GroupBase, SelectComponentsConfig, SingleValue } from "react-select";

import { FieldsetSelectOption, FormFieldProps } from "#/components/form/model";
import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FieldsetSelectSongOptionComponent } from "#/components/form/components/fieldset/FIeldsetSelectSongOptionComponent";

type SelectSongOptions = FieldsetSelectOption & {
  secondLabel: string;
  imageUrl: string;
};

interface AsyncSelectSongFormFieldProps
  extends Omit<FormFieldProps, "type" | "onChange"> {
  defaultOptions: SelectSongOptions[];
  onChange?: (value: SingleValue<SelectSongOptions>) => void;
  isSearchable?: boolean;
  isMultiSelect?: boolean;
  defaultValue?: SingleValue<SelectSongOptions> | null;
  selectComponentOptions?: Partial<
    SelectComponentsConfig<unknown, boolean, GroupBase<unknown>>
  >;
  loadOptions?: (inputValue: string) => Promise<SelectSongOptions[]>;
}

export function AsyncSelectSongFormField({
  control,
  name,
  label,
  defaultOptions,
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
  selectComponentOptions,
  loadOptions,
}: Readonly<AsyncSelectSongFormFieldProps>) {
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

          <Fieldset.AsyncSelect
            loadOptions={loadOptions}
            isMultiSelect={isMultiSelect}
            isSearchable={isSearchable}
            placeholder={placeholder}
            defaultOptions={defaultOptions}
            onChange={(value) => {
              field.onChange(value);
              onChange?.(value as SingleValue<SelectSongOptions>);
            }}
            defaultValue={defaultValue}
            value={field.value}
            onBlur={field.onBlur}
            selectComponentOptions={selectComponentOptions}
          >
            {(props) => <FieldsetSelectSongOptionComponent {...props} />}
          </Fieldset.AsyncSelect>

          {fieldState.error?.message && (
            <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
          )}
        </Fieldset>
      )}
    />
  );
}
