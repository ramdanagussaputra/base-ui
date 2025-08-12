import { Control, Controller } from "react-hook-form";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";

interface ToggleFormFieldProps {
  name: string;
  control: Control<any>;
  size?: "extra-small" | "small" | "medium" | "large";
  isDisabled?: boolean;
}

export function ToggleFormField({
  name,
  control,
  size,
  isDisabled = false,
}: Readonly<ToggleFormFieldProps>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Fieldset size={size} isDisabled={isDisabled}>
          <Fieldset.Toggle onChange={onChange} value={value} />
        </Fieldset>
      )}
    />
  );
}
