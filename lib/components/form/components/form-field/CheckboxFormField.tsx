import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { useState } from "react";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";

interface CheckboxFormFieldProps<TFieldValues extends FieldValues = any> {
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  onChange?: () => void;
}

export function CheckboxFormField<TFieldValues extends FieldValues = any>({
  label,
  name,
  control,
  onChange = () => {},
}: Readonly<CheckboxFormFieldProps<TFieldValues>>) {
  const [checked, setChecked] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Fieldset>
          <div className="flex items-center gap-2">
            <Fieldset.Checkbox
              checked={checked}
              value={field.value}
              onChange={(event) => {
                field.onChange(event);
                setChecked((checked) => !checked);
                onChange?.();
              }}
            />
            <Fieldset.Label
              className="text-secondary-900 text-b3-400"
              withoutTag
            >
              {label}
            </Fieldset.Label>
          </div>
        </Fieldset>
      )}
    />
  );
}
