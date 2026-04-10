import { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FieldsetSelectOption, FormFieldProps } from "#/components/form/model";

import { extractMaxLengthValue } from "#/utils";

type PassportFormFieldProps<TFieldValues extends FieldValues = any> = Omit<
  FormFieldProps<TFieldValues>,
  "type" | "onChange"
> & {
  type?: "text" | "email" | "number";
  onChange?: (value: string) => void;
  options: FieldsetSelectOption[];
  prefixDefaultValue?: string;
  onPrefixChange?: (value: string) => void;
};

const DEFAULT_PREFIX = "ID";

export function PassportFormField<TFieldValues extends FieldValues = any>({
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
  options = [],
  prefixDefaultValue = DEFAULT_PREFIX,
  onPrefixChange = () => {},
}: Readonly<PassportFormFieldProps<TFieldValues>>) {
  const [prefix, setPrefix] = useState<string>(
    options?.[0]?.value?.toString() || prefixDefaultValue,
  );

  const maxLength = rules?.maxLength
    ? extractMaxLengthValue(rules.maxLength)
    : undefined;

  const handlePrefixChange = (newPrefix: string | number | boolean) => {
    const newPrefixStr = newPrefix?.toString() || DEFAULT_PREFIX;
    setPrefix(newPrefixStr);
    onPrefixChange?.(newPrefixStr);
  };

  return (
    <Controller
      name={name as any}
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
            onChange={(value) => handlePrefixChange(value)}
            options={options}
          >
            <Fieldset.TextInput
              type={type}
              placeholder={placeholder}
              value={field.value || ""}
              onChange={(inputValue) => {
                field.onChange(inputValue);
                onChange?.(inputValue);
                onPrefixChange?.(prefix);
              }}
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
