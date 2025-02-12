// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Controller } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeSlash } from "iconsax-react";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";

interface PasswordFormFieldProps
  extends Omit<FormFieldProps, "type" | "isError"> {
  isConfirmPassword?: boolean;
  passwordName?: string;
}

export function PasswordFormField({
  name,
  rules,
  label,
  fieldName,
  isRequired = false,
  isDisabled = false,
  placeholder,
  control,
  onChange = () => {},
  size = "medium",
  isConfirmPassword = false,
  passwordName,
}: Readonly<PasswordFormFieldProps>) {
  const [isShow, setIsShow] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: {
          value: isRequired,
          message: `${fieldName || label} is required`,
        },
        validate: {
          validate: (value, formValue) => {
            if (!isConfirmPassword && !passwordName) return true;
            return (
              value === formValue[passwordName!] || "Password does not match"
            );
          },
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
          <Fieldset.Label>{label}</Fieldset.Label>

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
