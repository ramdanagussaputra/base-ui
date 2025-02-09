// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Controller } from "react-hook-form";
import { SingleValue } from "react-select";

import { FieldsetSelectOption, FormFieldProps } from "#/components/form/model";
import { Fieldset } from "#/components/form/components/fieldset/Fieldset";

interface SelectFormFieldProps
  extends Omit<FormFieldProps, "type" | "onChange"> {
  options: FieldsetSelectOption[];
  onChange?: (value: SingleValue<FieldsetSelectOption>) => void;
  isSearchable?: boolean;
  defaultValue?: SingleValue<FieldsetSelectOption> | null;
}

function SelectFormField({
  control,
  name,
  label,
  options,
  onChange,
  isSearchable = true,
  defaultValue,
  placeholder,
  fieldName,
  isDisabled = false,
  isRequired = false,
  rules,
  size = "medium",
}: SelectFormFieldProps) {
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
      render={({ field }) => (
        <Fieldset size={size} isRequired={isRequired} isDisabled={isDisabled}>
          <Fieldset.Select
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
          />
        </Fieldset>
      )}
    />
  );
}

export default SelectFormField;
