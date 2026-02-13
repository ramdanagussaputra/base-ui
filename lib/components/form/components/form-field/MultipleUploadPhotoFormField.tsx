// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Controller, useFormContext } from "react-hook-form";
import { validateFileExtension, readFileAsDataURL } from "#/utils";
import { Warning2 } from "iconsax-react";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FormFieldProps } from "#/components/form/model";
import { SmallMessageBox } from "#/components/messagebox";
import Icon from "#/components/icon/Icon";
import { useModal } from "#/components/modal";
import { ImageCropModal } from "#/components/form/components/image-crop/ImageCropModal";

type MultipleUploadPhotoFormFieldProps = Omit<
  FormFieldProps,
  "onChange" | "type" | "placeholder"
> & {
  onChange?: (value: File[] | null) => void;
  accept?: string;
  placeholderIcon?: React.ReactNode;
  footerElement?: React.ReactNode;
  maxFiles?: number;
  maxSize?: number;
};

export function MultipleUploadPhotoFormField({
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
  maxFiles = 3,
  maxSize = 1 * 1024 * 1024,
}: Readonly<MultipleUploadPhotoFormFieldProps>) {
  const { setError, clearErrors } = useFormContext();
  const { showModal, closeModal } = useModal();

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
          fileExtension: (files: (File | string)[] | null) => {
            if (!files || files.length === 0) return true;
            for (const file of files) {
              // Skip validation if value is a URL string (pre-uploaded image)
              if (typeof file === "string") continue;
              if (!validateFileExtension(file, accept)) {
                return "One or more images have invalid file";
              }
            }
            return true;
          },
        },
        ...rules,
      }}
      render={({ field, fieldState }) => {
        const currentFiles: File[] = field.value || [];

        const updateFiles = (newFiles: File[]) => {
          const limitedFiles = newFiles.slice(0, maxFiles);
          field.onChange(limitedFiles.length > 0 ? limitedFiles : null);
          onChange(limitedFiles.length > 0 ? limitedFiles : null);
        };

        const handleMainUpload = (file: File | null) => {
          if (file) {
            const newFiles = [file, ...currentFiles.slice(1)];
            updateFiles(newFiles);
          } else {
            const newFiles = currentFiles.slice(1);
            updateFiles(newFiles.length > 0 ? newFiles : []);
          }
        };

        const handleAdditionalUpload = (file: File | null, index: number) => {
          if (file) {
            const newFiles = [...currentFiles];

            while (newFiles.length <= index) {
              newFiles.push(null as any);
            }

            newFiles[index] = file;

            const filteredFiles = newFiles.filter(Boolean);
            updateFiles(filteredFiles);
          } else {
            const newFiles = currentFiles.filter((_, i) => i !== index);
            updateFiles(newFiles);
          }
        };

        const additionalSlots = Array.from(
          { length: maxFiles - 1 },
          (_, index) => {
            const slotIndex = index + 1;
            return (
              <Fieldset.UploadPhotoAdditional
                key={`additional-${slotIndex}`}
                accept={accept}
                onChange={(file: File | null) =>
                  handleAdditionalUpload(file, slotIndex)
                }
                onBeforeChange={handleCropImage}
                value={currentFiles[slotIndex] || null}
                maxSize={maxSize}
                setError={(message) => {
                  if (message) {
                    setError(name, { type: "manual", message });
                  } else {
                    clearErrors(name);
                  }
                }}
                customMaxSizeMessage="One or more images are too large"
              />
            );
          },
        );

        return (
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
              <div className="flex flex-col gap-3">
                <Fieldset.UploadPhoto
                  value={currentFiles[0] || null}
                  accept={accept}
                  onChange={handleMainUpload}
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
                  customMaxSizeMessage={
                    currentFiles?.length > 0
                      ? "One or more images are too large"
                      : "Image is too large"
                  }
                />
                {maxFiles > 1 && field?.value?.length > 0 && (
                  <div className="grid w-fit grid-cols-2 gap-3">
                    {additionalSlots}
                  </div>
                )}
              </div>

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
        );
      }}
    />
  );
}
