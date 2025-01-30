/* eslint-disable @typescript-eslint/no-explicit-any */
// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import {
  // Control,
  Controller,
  // FieldValues,
  // useFormContext,
} from "react-hook-form";
import { useState } from "react";
import { Eye, EyeSlash } from "iconsax-react";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/components/form-field/model/formField";

interface PasswordFormFieldProps extends FormFieldProps {
  control: any;
}

export function PasswordFormField({
  name,
  rules,
  label,
  fieldName,
  isRequired = false,
  isDisabled = false,
  placeholder,
  onChange = () => {},
  size = "medium",
  control,
}: Readonly<PasswordFormFieldProps>) {
  const [isShow, setIsShow] = useState(false);

  console.log(isShow);

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: {
          value: isRequired,
          message: `${fieldName || label} is required`,
        },
        minLength: {
          value: 8,
          message: `must be at least 8 characters`,
        },
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
          message: "must contain number and letter",
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
            type={isShow ? "text" : "password"}
            placeholder={placeholder}
            value={field.value || ""}
            onChange={(event) => {
              onChange(event);
              field.onChange(event);
            }}
            onBlur={field.onBlur}
          >
            <Fieldset.Icon className="cursor-pointer">
              {isShow ? (
                <EyeSlash onClick={() => setIsShow(false)} />
              ) : (
                <Eye onClick={() => setIsShow(true)} />
              )}
            </Fieldset.Icon>
          </Fieldset.TextInput>

          {fieldState.error?.message && (
            <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
          )}
        </Fieldset>
      )}
    />
  );
}
