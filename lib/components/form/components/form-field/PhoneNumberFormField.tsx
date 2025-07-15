// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { useState, useCallback } from "react";
import { Controller } from "react-hook-form";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FieldsetSelectOption, FormFieldProps } from "#/components/form/model";

import { extractMaxLengthValue } from "#/utils";
import {
  getDisplayValue,
  getFullValue,
} from "#/components/form/utils/inputWithPrefix";

type PhoneNumberFormFieldProps = Omit<FormFieldProps, "type" | "onChange"> & {
  type?: "text" | "email" | "number";
  onChange?: (value: string) => void;
  includePrefix?: boolean;
  options: FieldsetSelectOption[];
  prefixDefaultValue?: string;
  onPrefixChange?: (value: string) => void;
};

const DEFAULT_PREFIX = "+62";

export function PhoneNumberFormField({
  name,
  rules,
  label,
  fieldName,
  placeholder,
  control,
  isRequired = false,
  isDisabled = false,
  onChange = () => {},
  type = "number",
  size = "medium",
  withoutTagLabel = false,
  includePrefix = true,
  options = [],
  prefixDefaultValue = DEFAULT_PREFIX,
  onPrefixChange = () => {},
}: Readonly<PhoneNumberFormFieldProps>) {
  const [prefix, setPrefix] = useState<string>(
    options?.[0]?.value?.toString() || prefixDefaultValue,
  );

  const maxLength = rules?.maxLength
    ? extractMaxLengthValue(rules.maxLength)
    : undefined;

  const handlePrefixChange = (
    newPrefix: string | number | boolean,
    fieldOnChange: (value: string) => void,
    currentValue: string,
  ) => {
    const newPrefixStr = newPrefix?.toString() || DEFAULT_PREFIX;

    let localNumber = currentValue || "";
    if (includePrefix && currentValue?.startsWith(prefix)) {
      localNumber = currentValue.slice(prefix.length);
    }

    const newValue = includePrefix
      ? `${newPrefixStr}${localNumber}`
      : localNumber;

    setPrefix(newPrefixStr);
    onPrefixChange?.(newPrefixStr);
    fieldOnChange(newValue);
    onChange?.(newValue);
  };

  const handleInputChange = useCallback(
    (inputValue: string, fieldOnChange: (value: string) => void) => {
      const value = includePrefix
        ? getFullValue(inputValue, prefix)
        : inputValue;

      fieldOnChange(value);
      onChange?.(value);
    },
    [includePrefix, onChange, prefix],
  );

  const getInputDisplayValue = useCallback(
    (fieldValue: string) => {
      if (!includePrefix) return fieldValue || "";
      return getDisplayValue(fieldValue, prefix);
    },
    [includePrefix, prefix],
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

          <Fieldset.SelectPrefix
            value={prefix}
            onChange={(value) =>
              handlePrefixChange(value, field.onChange, field.value)
            }
            options={options}
          >
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
          </Fieldset.SelectPrefix>

          {fieldState.error?.message && (
            <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
          )}
        </Fieldset>
      )}
    />
  );
}
