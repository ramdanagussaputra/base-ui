import { Control, Controller } from "react-hook-form";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";

interface ToggleFormFieldProps {
  name: string;
  control: Control<any>;
  size?: "extra-small" | "small" | "medium" | "large";
}

export function ToggleFormField({
  name,
  control,
  size,
}: Readonly<ToggleFormFieldProps>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Fieldset size={size}>
          <Fieldset.Toggle onChange={onChange} value={value} />
        </Fieldset>
      )}
    />
  );
}
