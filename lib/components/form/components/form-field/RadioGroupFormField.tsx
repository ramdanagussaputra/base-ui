// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Control, Controller } from "react-hook-form";
import { Field } from "@headlessui/react";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";

interface RadioGroupFormFieldProps {
  name: string;
  control: Control<any>;
  fields: { label?: string; value: string }[];
}

export function RadioGroupFormField({
  control,
  name,
  fields,
}: Readonly<RadioGroupFormFieldProps>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Fieldset>
          <Fieldset.RadioGroup
            name={name}
            value={field.value}
            onChange={field.onChange}
          >
            {fields.map((item) => (
              <Field
                key={item.value}
                className="flex items-center gap-[0.375rem]"
              >
                <Fieldset.Radio id={item.value} value={item.value} />
                <Fieldset.Label
                  onClick={() => field.onChange(field.value)}
                  id={field.value}
                >
                  {item.label}
                </Fieldset.Label>
              </Field>
            ))}
          </Fieldset.RadioGroup>
        </Fieldset>
      )}
    />
  );
}
