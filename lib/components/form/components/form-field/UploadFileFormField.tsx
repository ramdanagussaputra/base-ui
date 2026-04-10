import { Add } from "iconsax-react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { useRef } from "react";

import { cn } from "#/utils";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { Button } from "#/components/button/Button";
import Icon from "#/components/icon/Icon";

interface UploadFileFormFieldProps<TFieldValues extends FieldValues = any> {
  name: Path<TFieldValues> | string;
  accept?: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, any>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  withoutTagLabel?: boolean;
  placeholder: string;
  label: string;
  fieldName?: string;
  maxSize?: number;
  isRequired?: boolean;
  isDisabled?: boolean;
  buttonText?: string;
  control: Control<TFieldValues>;
  footerElement?: React.ReactNode;
}

export function UploadFileFormField<TFieldValues extends FieldValues = any>({
  name,
  accept,
  rules,
  withoutTagLabel,
  placeholder,
  label,
  fieldName,
  isRequired = false,
  maxSize = 1 * 1024 * 1024,
  isDisabled = false,
  buttonText = "Browse File",
  control,
  footerElement,
}: Readonly<UploadFileFormFieldProps<TFieldValues>>) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Controller
      name={name as any}
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
          <input
            type="file"
            accept={accept}
            disabled={isDisabled}
            className="absolute h-0 w-0 overflow-hidden"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              field.onChange(file);
            }}
            ref={inputRef}
          />
          <div className="flex flex-col gap-2">
            <div className="flex w-full items-center gap-3">
              <button
                className={cn("w-full cursor-pointer", {
                  "pointer-events-none": isDisabled,
                })}
                type="button"
                onClick={() => {
                  inputRef?.current?.click();
                }}
              >
                <div className="relative">
                  <Fieldset.TextInput
                    type="text"
                    placeholder={placeholder}
                    className="pointer-events-none relative"
                    value={
                      (field.value as any) instanceof File
                        ? (field.value as any).name
                        : field.value
                    }
                  />
                  {(field.value as any) instanceof File ? (
                    <button
                      type="button"
                      className="absolute top-0 right-0 z-50 me-2 h-full cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        field.onChange(null);
                      }}
                    >
                      <Fieldset.Icon>
                        <Icon icon={Add} className="rotate-45" />
                      </Fieldset.Icon>
                    </button>
                  ) : null}
                </div>
              </button>

              <Button
                type="button"
                variant="light"
                color="primary"
                isDisabled={isDisabled}
                onClick={() => {
                  inputRef?.current?.click();
                }}
              >
                {buttonText}
              </Button>
            </div>
            {footerElement}
          </div>

          {fieldState.error?.message && (
            <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
          )}
        </Fieldset>
      )}
    />
  );
}
