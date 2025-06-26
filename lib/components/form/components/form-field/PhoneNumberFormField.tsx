// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Controller } from "react-hook-form";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";
import { getHeightClass } from "#/components/form/utils/getHeightClass";

import { extractMaxLengthValue, cn } from "#/utils";
import {
  getDisplayValue,
  getFullValue,
} from "#/components/form/utils/inputWithPrefix";

type PhoneNumberFormFieldProps = Omit<FormFieldProps, "type" | "onChange"> & {
  type?: "text" | "email" | "number";
  onChange?: (value: string) => void;
  includePrefix?: boolean;
};

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
}: Readonly<PhoneNumberFormFieldProps>) {
  let maxLength: number;

  if (rules?.maxLength) {
    maxLength = extractMaxLengthValue(rules?.maxLength)!;
  }

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
      render={({ field, fieldState }) => {
        return (
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
                  "bg-secondary-50 border-secondary-200 flex items-center rounded-md rounded-e-none border border-e-0",
                  getHeightClass(size),
                )}
              >
                <span className="text-b3-400 text-secondary-800 px-[0.75em]">
                  +62
                </span>
              </div>
              <Fieldset.TextInput
                type={type}
                placeholder={placeholder}
                value={
                  includePrefix
                    ? getDisplayValue(field.value, "+62")
                    : field.value || ""
                }
                onChange={(inputValue) => {
                  const value = includePrefix
                    ? getFullValue(inputValue, "+62")
                    : inputValue;
                  field.onChange(value);
                  onChange?.(value);
                }}
                onBlur={field.onBlur}
                lengthCap={maxLength}
                className="border-s-secondary-200 grow rounded-s-none"
              />
            </div>

            {fieldState.error?.message && (
              <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
            )}
          </Fieldset>
        );
      }}
    />
  );
}
