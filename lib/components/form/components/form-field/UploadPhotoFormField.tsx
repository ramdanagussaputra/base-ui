// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Controller } from "react-hook-form";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";

type UploadPhotoFormFieldProps = Omit<
  FormFieldProps,
  "onChange" | "type" | "placeholder"
> & {
  onChange?: (value: File | null) => void;
  accept?: string;
  placeholderIcon?: React.ReactNode;
  footerElement?: React.ReactNode;
};

export function UploadPhotoFormField({
  name,
  rules,
  label,
  fieldName,
  control,
  isRequired = false,
  isDisabled = false,
  onChange = () => {},
  withoutTagLabel = false,
  accept = "image/*",
  placeholderIcon,
  footerElement: endElement,
}: Readonly<UploadPhotoFormFieldProps>) {
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

          <div className="flex w-fit flex-col gap-2">
            <Fieldset.UploadPhoto
              value={field.value}
              accept={accept}
              onChange={(file: File | null) => {
                field.onChange(file);
                onChange(file);
              }}
              placeholderIcon={placeholderIcon}
            />

            {endElement}
          </div>

          {fieldState.error?.message && (
            <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
          )}
        </Fieldset>
      )}
    />
  );
}
