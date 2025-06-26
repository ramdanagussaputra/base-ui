// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Controller } from "react-hook-form";

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
                "border-primary-600/20 bg-primary-50 flex items-center rounded-md rounded-e-none border border-e-0",
                getHeightClass(size),
              )}
            >
              <span className="text-b3-400 text-primary-600 px-[0.75em]">
                https://
              </span>
            </div>

            <Fieldset.TextInput
              type={type}
              placeholder={placeholder}
              value={
                includePrefix
                  ? getDisplayValue(field.value, "https://")
                  : field.value
              }
              onChange={(inputValue) => {
                const value = includePrefix
                  ? getFullValue(inputValue, "https://")
                  : inputValue;
                field.onChange(value);
                onChange?.(value);
              }}
              onBlur={field.onBlur}
              lengthCap={maxLength}
              className="border-s-primary-600/20 grow rounded-s-none"
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
