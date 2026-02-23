import { Control, Controller } from "react-hook-form";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";

interface ToggleFormFieldProps {
  name: string;
  control: Control<any>;
  size?: "extra-small" | "small" | "medium" | "large";
  isDisabled?: boolean;
  onChange?: (value: boolean) => void;
}

export function ToggleFormField({
  name,
  control,
  size,
  isDisabled = false,
  onChange,
}: Readonly<ToggleFormFieldProps>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange: fieldOnChange, value } }) => (
        <Fieldset size={size} isDisabled={isDisabled}>
          <Fieldset.Toggle
            onChange={(state) => {
              fieldOnChange(state);
              // Additional onChange callback for external use
              onChange?.(state);
            }}
            value={value}
          />
        </Fieldset>
      )}
    />
  );
}
