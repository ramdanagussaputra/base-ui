// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Control, Controller } from "react-hook-form";
import { Field } from "@headlessui/react";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { cn } from "#/utils";

interface RadioGroupFormFieldProps {
  name: string;
  control: Control<any>;
  fields: { label?: string; value: string }[];
  isVertical?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  label?: string;
  containerClassName?: string;
  fieldName?: string;
}

export function RadioGroupFormField({
  control,
  name,
  fields,
  label,
  isVertical = false,
  isRequired = false,
  isDisabled = false,
  containerClassName,
  fieldName,
}: Readonly<RadioGroupFormFieldProps>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: {
          value: isRequired,
          message: `${fieldName || label} is required`,
        },
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
            name={name}
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
                  className={cn({
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
