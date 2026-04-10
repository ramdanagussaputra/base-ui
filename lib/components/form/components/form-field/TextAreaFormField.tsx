import { Controller, FieldValues } from "react-hook-form";
import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";
import { extractMaxLengthValue } from "#/utils";

interface TextAreaFormFieldProps<TFieldValues extends FieldValues = any>
  extends Omit<FormFieldProps<TFieldValues>, "type" | "size"> {
  height?: number;
  minHeight?: number;
  maxHeight?: number;
  isResizable?: boolean;
  fieldSizeFollowContent?: boolean;
  autoUppercase?: boolean;
  showCharacterCount?: boolean;
}

export function TextAreaFormField<TFieldValues extends FieldValues = any>({
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
  isResizable = true,
  fieldSizeFollowContent = false,
  autoUppercase = false,
  showCharacterCount = false,
}: Readonly<TextAreaFormFieldProps<TFieldValues>>) {
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
            <div className="flex items-center justify-between">
              <Fieldset.Label withoutTag={withoutTagLabel}>
                {label}
              </Fieldset.Label>
              {showCharacterCount && maxLength && (
                <span className="text-b4-500 text-secondary-400">
                  {field.value?.length || 0}/{maxLength}
                </span>
              )}
            </div>
          )}

          <Fieldset.Textarea
            onBlur={field.onBlur}
            onChange={(value) => {
              let tempValue = value;
              if (autoUppercase) {
                tempValue = tempValue.toUpperCase();
              }
              field.onChange(tempValue);
              onChange(tempValue);
            }}
            value={field.value || ""}
            placeholder={placeholder}
            height={height}
            lengthCap={maxLength}
            maxHeight={maxHeight || 600}
            minHeight={minHeight || 200}
            isResizable={isResizable}
            fieldSizeFollowContent={fieldSizeFollowContent}
            autoUppercase={autoUppercase}
          />

          {!!fieldState.error?.message && (
            <Fieldset.Message>{fieldState.error?.message}</Fieldset.Message>
          )}
        </Fieldset>
      )}
    />
  );
}
