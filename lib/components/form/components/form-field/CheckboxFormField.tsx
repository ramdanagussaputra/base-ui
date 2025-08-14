import { Control, Controller } from "react-hook-form";
import { useState } from "react";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";

interface CheckboxFormFieldProps {
  name: string;
  label: string;
  control: Control<any>;
}

export function CheckboxFormField({
  label,
  name,
  control,
}: Readonly<CheckboxFormFieldProps>) {
  const [checked, setChecked] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Fieldset>
          <div className="flex items-center gap-2">
            <Fieldset.Checkbox
              checked={checked}
              value={value}
              onChange={(event) => {
                onChange(event);
                setChecked((checked) => !checked);
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
