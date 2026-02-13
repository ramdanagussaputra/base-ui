// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import {
  Controller,
  UseFormSetError,
  UseFormClearErrors,
  FormState,
} from "react-hook-form";
import { useEffect, useRef } from "react";
import { validateFileExtension, readFileAsDataURL } from "#/utils";
import { Warning2 } from "iconsax-react";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";
import { SmallMessageBox } from "#/components/messagebox";
import Icon from "#/components/icon/Icon";
import { useModal } from "#/components/modal";
import { ImageCropModal } from "#/components/form/components/image-crop/ImageCropModal";

type UploadPhotoFormFieldProps = Omit<
  FormFieldProps,
  "onChange" | "type" | "placeholder"
> & {
  onChange?: (value: File | null) => void;
  accept?: string;
  placeholderIcon?: React.ReactNode;
  footerElement?: React.ReactNode;
  maxSize?: number;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
  formState: FormState<any>;
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
  setError,
  clearErrors,
  formState,
}: Readonly<UploadPhotoFormFieldProps>) {
  const { showModal, closeModal } = useModal();
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fieldError = formState.errors[name];

  // Auto-clear error after 5 seconds
  useEffect(() => {
    // Clear any existing timeout
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = null;
    }

    // Set new timeout if there's an error
    if (fieldError) {
      errorTimeoutRef.current = setTimeout(() => {
        clearErrors(name);
        errorTimeoutRef.current = null;
      }, 5000);
    }

    // Cleanup on unmount or when error changes
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
        errorTimeoutRef.current = null;
      }
    };
  }, [fieldError, name, clearErrors]);

  const handleCropImage = async (file: File): Promise<File | null> => {
    const imageSrc = await readFileAsDataURL(file);

    return new Promise((resolve) => {
      showModal({
        component: (
          <ImageCropModal
            aspectRatio={1}
            imageSrc={imageSrc}
            fileName={file.name}
            onSave={(croppedFile) => {
              closeModal();
              resolve(croppedFile);
            }}
            onCancel={() => {
              closeModal();
              resolve(null);
            }}
          />
        ),
        isClickOutsideClose: false,
      });
    });
  };

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
          fileExtension: (file: File | string | null) => {
            if (!file) return true;
            // Skip validation if value is a URL string (pre-uploaded image)
            if (typeof file === "string") return true;
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
              onBeforeChange={handleCropImage}
              placeholderIcon={placeholderIcon}
              maxSize={maxSize}
              setError={(message) => {
                if (message) {
                  setError(name, { type: "manual", message });
                } else {
                  clearErrors(name);
                }
              }}
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
