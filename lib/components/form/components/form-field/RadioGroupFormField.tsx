// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { Field } from "@headlessui/react";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { cn } from "#/utils";

interface RadioGroupFormFieldProps<TFieldValues extends FieldValues = any> {
  name: Path<TFieldValues> | string;
  control: Control<TFieldValues>;
  fields: { label?: string; value: string }[];
  isVertical?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  label?: string;
  containerClassName?: string;
  fieldName?: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, any>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
}

export function RadioGroupFormField<TFieldValues extends FieldValues = any>({
  control,
  name,
  fields,
  label,
  isVertical = false,
  isRequired = false,
  isDisabled = false,
  containerClassName,
  fieldName,
  rules,
}: Readonly<RadioGroupFormFieldProps<TFieldValues>>) {
  return (
    <Controller
      control={control}
      name={name as any}
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
          className={cn("gap-3", containerClassName)}
        >
          {label && <Fieldset.Label>{label}</Fieldset.Label>}

          <Fieldset.RadioGroup
            name={name as any}
            value={field.value}
            onChange={field.onChange}
            isVertical={isVertical}
          >
            {fields.map((item) => (
              <Field
                key={item.value}
                className="flex items-center gap-[0.375rem]"
              >
                <Fieldset.Radio value={item.value} />
                <Fieldset.Label
                  withoutTag
                  className={cn("text-secondary-900 text-b3-400", {
                    "text-secondary-500 font-normal": isDisabled,
                  })}
                >
                  {item.label}
                </Fieldset.Label>
              </Field>
            ))}
          </Fieldset.RadioGroup>

          {fieldState.error && (
            <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
          )}
        </Fieldset>
      )}
    />
  );
}
