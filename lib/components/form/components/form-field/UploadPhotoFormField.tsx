// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Controller } from "react-hook-form";
import { validateFileExtension } from "#/utils";
import { Warning2 } from "iconsax-react";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";
import { SmallMessageBox } from "#/components/messagebox";
import Icon from "#/components/icon/Icon";

type UploadPhotoFormFieldProps = Omit<
  FormFieldProps,
  "onChange" | "type" | "placeholder"
> & {
  onChange?: (value: File | null) => void;
  accept?: string;
  placeholderIcon?: React.ReactNode;
  footerElement?: React.ReactNode;
  maxSize?: number;
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
  maxSize = 1 * 1024 * 1024,
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
        validate: {
          maxSize: (file: File | null) => {
            if (!file) return true;
            if (file.size > maxSize) {
              return "Image is too large";
            }
            return true;
          },
          fileExtension: (file: File | null) => {
            if (!file) return true;
            if (!validateFileExtension(file, accept)) {
              return "Invalid file";
            }
            return true;
          },
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
            <SmallMessageBox
              variant="error"
              icon={<Icon icon={Warning2} variant="Bulk" />}
            >
              {fieldState.error.message}
            </SmallMessageBox>
          )}
        </Fieldset>
      )}
    />
  );
}
