import { Controller } from "react-hook-form";
import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";
import { extractMaxLengthValue } from "#/utils";

interface TextAreaFormFieldProps extends Omit<FormFieldProps, "type" | "size"> {
  height?: number;
  minHeight?: number;
  maxHeight?: number;
}

export function TextAreaFormField({
  control,
  label,
  name,
  placeholder,
  fieldName,
  height,
  minHeight,
  maxHeight,
  rules,
  isDisabled = false,
  isRequired = false,
  onChange = () => {},
  withoutTagLabel = false,
}: Readonly<TextAreaFormFieldProps>) {
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
        >
          {label && (
            <Fieldset.Label withoutTag={withoutTagLabel}>
              {label}
            </Fieldset.Label>
          )}

          <Fieldset.Textarea
            onBlur={field.onBlur}
            onChange={(value) => {
              field.onChange(value);
              onChange(value);
            }}
            value={field.value || ""}
            placeholder={placeholder}
            height={height}
            lengthCap={maxLength}
            maxHeight={maxHeight || 600}
            minHeight={minHeight || 200}
          />

          {!!fieldState.error?.message && (
            <Fieldset.Message>{fieldState.error?.message}</Fieldset.Message>
          )}
        </Fieldset>
      )}
    />
  );
}
