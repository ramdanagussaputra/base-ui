// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Controller } from "react-hook-form";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";
import { extractMaxLengthValue, formValidations } from "#/utils";

type FormatedFormFieldProps = Omit<FormFieldProps, "type" | "onChange"> & {
  type?: "text" | "email" | "number";
  onChange?: (value: string) => void;
  onBlur?: () => void;
  endElement?: React.ReactNode;
  suffix?: string;
  prefix?: string;
  noWhitespace?: boolean;
  autoUppercase?: boolean;
  // New validation props
  blockedValues?: string[];
  blockedValuesMessage?: string;
  lettersOnly?: boolean;
  lettersOnlyMessage?: string;
  noSpacesValidation?: boolean;
  noSpacesMessage?: string;
  // Letters and numbers validation
  lettersAndNumbers?: boolean;
  lettersAndNumbersMessage?: string;
  lettersAndNumbersWithSpaces?: boolean;
  lettersAndNumbersWithSpacesMessage?: string;
};

export function TextFormField({
  name,
  rules,
  label,
  fieldName,
  placeholder,
  control,
  isRequired = false,
  isDisabled = false,
  onChange = () => {},
  onBlur = () => {},
  type = "text",
  size = "medium",
  withoutTagLabel = false,
  endElement,
  suffix,
  prefix,
  noWhitespace = false,
  autoUppercase = false,
  // New validation props
  blockedValues,
  blockedValuesMessage,
  lettersOnly = false,
  lettersOnlyMessage,
  noSpacesValidation = false,
  noSpacesMessage,
  // Letters and numbers validation
  lettersAndNumbers = false,
  lettersAndNumbersMessage,
  lettersAndNumbersWithSpaces = false,
  lettersAndNumbersWithSpacesMessage,
}: Readonly<FormatedFormFieldProps>) {
  const emailValidation =
    type === "email"
      ? {
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Enter a valid email address",
          },
        }
      : {};

  // Build additional validation rules based on props
  const additionalValidations: Record<string, any> = {};

  // Add blocked values validation
  if (blockedValues && blockedValues.length > 0) {
    Object.assign(
      additionalValidations,
      formValidations.blockedValues(blockedValues, blockedValuesMessage),
    );
  }

  // Add letters only validation
  if (lettersOnly) {
    // If noSpacesValidation is also true, use lettersOnlyNoSpaces
    if (noSpacesValidation) {
      Object.assign(
        additionalValidations,
        formValidations.lettersOnlyNoSpaces(lettersOnlyMessage),
      );
    } else {
      Object.assign(
        additionalValidations,
        formValidations.lettersOnly(lettersOnlyMessage),
      );
    }
  }
  // Add letters and numbers validation
  else if (lettersAndNumbers) {
    Object.assign(
      additionalValidations,
      formValidations.lettersAndNumbers(lettersAndNumbersMessage),
    );
  }
  // Add letters and numbers with spaces validation
  else if (lettersAndNumbersWithSpaces) {
    // If noSpacesValidation is also true, use lettersAndNumbers instead (no spaces)
    if (noSpacesValidation) {
      Object.assign(
        additionalValidations,
        formValidations.lettersAndNumbers(
          lettersAndNumbersMessage || noSpacesMessage,
        ),
      );
    } else {
      Object.assign(
        additionalValidations,
        formValidations.lettersAndNumbersWithSpaces(
          lettersAndNumbersWithSpacesMessage,
        ),
      );
    }
  }
  // If only noSpacesValidation is true (without other character restrictions)
  else if (noSpacesValidation) {
    Object.assign(
      additionalValidations,
      formValidations.noSpaces(noSpacesMessage),
    );
  }

  // Merge validate functions properly
  const mergedValidateFunction = (value: string, formValues: any) => {
    // First run the props-based validations
    if (additionalValidations.validate) {
      const propsValidationResult = additionalValidations.validate(
        value,
        formValues,
      );
      if (
        propsValidationResult !== true &&
        propsValidationResult !== undefined
      ) {
        return propsValidationResult;
      }
    }

    // Then run custom validation if provided
    if (rules?.validate) {
      // Handle both single function and object with multiple validators
      if (typeof rules.validate === "function") {
        const customValidationResult = rules.validate(value, formValues);
        if (
          customValidationResult !== true &&
          customValidationResult !== undefined
        ) {
          return customValidationResult;
        }
      } else if (typeof rules.validate === "object") {
        // Handle multiple validators
        for (const [, validator] of Object.entries(rules.validate)) {
          const result = validator(value, formValues);
          if (result !== true && result !== undefined) {
            return result;
          }
        }
      }
    }

    return true;
  };

  // Prepare final rules without conflicting validate functions
  const { validate: customValidate, ...restRules } = rules || {};
  const { validate: propsValidate, ...restAdditionalValidations } =
    additionalValidations;

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
        ...emailValidation,
        ...restAdditionalValidations,
        ...restRules,
        // Add the merged validate function only if there are validations to run
        ...(propsValidate || customValidate
          ? { validate: mergedValidateFunction }
          : {}),
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

          <Fieldset.TextInput
            type={type}
            placeholder={placeholder}
            value={field.value || ""}
            onChange={(value) => {
              let tempValue = value;
              if (noWhitespace) {
                tempValue = value.replace(/\s/g, "");
              }
              if (autoUppercase) {
                tempValue = tempValue.toUpperCase();
              }
              field.onChange(tempValue);
              onChange?.(tempValue);
            }}
            onBlur={() => {
              field.onBlur();
              onBlur?.();
            }}
            lengthCap={maxLength}
            prefix={prefix}
            suffix={suffix}
            autoUppercase={autoUppercase}
          >
            <div className="flex items-center gap-1">{endElement}</div>
          </Fieldset.TextInput>

          {fieldState.error?.message && (
            <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
          )}
        </Fieldset>
      )}
    />
  );
}
