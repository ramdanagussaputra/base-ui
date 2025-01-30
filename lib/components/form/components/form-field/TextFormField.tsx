// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Controller, FieldValues, RegisterOptions } from "react-hook-form";

import {
  Fieldset,
  FieldsetProps,
} from "#/components/form/components/fieldset/Fieldset";

interface TextFormFieldProps
  extends Omit<FieldsetProps, "children" | "className"> {
  readonly label: string;
  readonly name: string;
  readonly placeholder: string;
  readonly fieldName?: string;
  readonly type?: "text" | "email" | "password" | "number";
  readonly rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  readonly onChange?: (
    event: React.ChangeEvent<HTMLInputElement> | string,
  ) => void;
}

export function TextFormField({
  name,
  rules,
  label,
  fieldName,
  isRequired = false,
  isDisabled = false,
  placeholder,
  onChange = () => {},
  type = "text",
  size = "medium",
}: TextFormFieldProps) {
  return (
    <Controller
      name={name}
      rules={{
        required: {
          value: isRequired,
          message: `${fieldName || label} is required`,
        },
        ...rules,
      }}
      render={({ field, fieldState }) => (
        <Fieldset
          isError={!!fieldState.error}
          isRequired={isRequired}
          isDisabled={isDisabled}
          size={size}
        >
          <Fieldset.Label type={isRequired ? "required" : "optional"}>
            {label}
          </Fieldset.Label>

          <Fieldset.TextInput
            type={type}
            placeholder={placeholder}
            value={field.value || ""}
            onChange={(event) => {
              onChange(event);
            }}
            onBlur={field.onBlur}
          />

          {fieldState.error?.message && (
            <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
          )}
        </Fieldset>
      )}
    />
  );
}
