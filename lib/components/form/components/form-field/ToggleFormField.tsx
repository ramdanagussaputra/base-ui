import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";

interface ToggleFormFieldProps<TFieldValues extends FieldValues = any> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  size?: "extra-small" | "small" | "medium" | "large";
  isDisabled?: boolean;
  onChange?: (value: boolean) => void;
}

export function ToggleFormField<TFieldValues extends FieldValues = any>({
  name,
  control,
  size,
  isDisabled = false,
  onChange,
}: Readonly<ToggleFormFieldProps<TFieldValues>>) {
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
