// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Controller } from "react-hook-form";
import { useCallback } from "react";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";
import { getHeightClass } from "#/components/form/utils/getHeightClass";
import {
  getDisplayValue,
  getFullValue,
} from "#/components/form/utils/inputWithPrefix";

import { cn, extractMaxLengthValue } from "#/utils";

type FormatedWebsiteFormFieldProps = Omit<
  FormFieldProps,
  "type" | "onChange"
> & {
  type?: "text" | "email" | "number";
  onChange?: (value: string) => void;
  includePrefix?: boolean;
};

export function WebsiteFormField({
  name,
  rules,
  label,
  fieldName,
  placeholder,
  control,
  isRequired = false,
  isDisabled = false,
  onChange = () => {},
  type = "text",
  size = "medium",
  withoutTagLabel = false,
  includePrefix = true,
}: Readonly<FormatedWebsiteFormFieldProps>) {
  const maxLength = rules?.maxLength
    ? extractMaxLengthValue(rules.maxLength)
    : undefined;

  const handleInputChange = useCallback(
    (inputValue: string, fieldOnChange: (value: string) => void) => {
      const value = includePrefix
        ? getFullValue(inputValue, "https://")
        : inputValue;
      fieldOnChange(value);
      onChange?.(value);
    },
    [includePrefix, onChange],
  );

  const getInputDisplayValue = useCallback(
    (fieldValue: string) => {
      if (!includePrefix) return fieldValue || "";
      return getDisplayValue(fieldValue, "https://");
    },
    [includePrefix],
  );

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
          isError={!!fieldState.error}
          isRequired={isRequired}
          isDisabled={isDisabled}
          size={size}
        >
          {label && (
            <Fieldset.Label withoutTag={withoutTagLabel}>
              {label}
            </Fieldset.Label>
          )}

          <div className="flex items-center">
            <div
              className={cn(
                "border-primary-600/20 bg-primary-50 flex items-center rounded-md rounded-e-none border",
                getHeightClass(size),
              )}
            >
              <span className="text-b3-400 text-primary-600 px-[0.8125em]">
                https://
              </span>
            </div>

            <Fieldset.TextInput
              type={type}
              placeholder={placeholder}
              value={getInputDisplayValue(field.value)}
              onChange={(inputValue) =>
                handleInputChange(inputValue, field.onChange)
              }
              onBlur={field.onBlur}
              lengthCap={maxLength}
              className="grow rounded-s-none border-s-0"
            />
          </div>

          {fieldState.error?.message && (
            <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
          )}
        </Fieldset>
      )}
    />
  );
}
