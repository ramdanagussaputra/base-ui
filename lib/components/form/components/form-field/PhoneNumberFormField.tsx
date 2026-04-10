import { useState, useCallback } from "react";
import { Controller, FieldValues } from "react-hook-form";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FieldsetSelectOption, FormFieldProps } from "#/components/form/model";

import { extractMaxLengthValue } from "#/utils";
import {
  getDisplayValue,
  getFullValue,
} from "#/components/form/utils/inputWithPrefix";

type PhoneNumberFormFieldProps<TFieldValues extends FieldValues = any> = Omit<
  FormFieldProps<TFieldValues>,
  "type" | "onChange"
> & {
  type?: "text" | "email" | "number";
  onChange?: (value: string) => void;
  includePrefix?: boolean;
  options: FieldsetSelectOption[];
  prefixDefaultValue?: string;
  onPrefixChange?: (value: string) => void;
  disablePrefix?: boolean;
};

const DEFAULT_PREFIX = "+62";

export function PhoneNumberFormField<TFieldValues extends FieldValues = any>({
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
  disablePrefix = false,
}: Readonly<PhoneNumberFormFieldProps<TFieldValues>>) {
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
            disablePrefix={disablePrefix}
            onChange={(value) =>
              handlePrefixChange(value, field.onChange, field.value)
            }
            options={options}
          >
            <div className="w-full">
              <Fieldset.TextInput
                type={type}
                placeholder={placeholder}
                value={getInputDisplayValue(field.value)}
                onChange={(inputValue) =>
                  handleInputChange(inputValue, field.onChange)
                }
                onBlur={field.onBlur}
                lengthCap={maxLength}
                className="grow rounded-l-none border-l-0"
              />
            </div>
          </Fieldset.SelectPrefix>

          {fieldState.error?.message && (
            <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
          )}
        </Fieldset>
      )}
    />
  );
}
