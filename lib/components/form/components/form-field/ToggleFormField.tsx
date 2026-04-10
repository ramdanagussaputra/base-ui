import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";

interface ToggleFormFieldProps<TFieldValues extends FieldValues = any> {
  name: Path<TFieldValues> | string;
  control: Control<TFieldValues>;
  size?: "extra-small" | "small" | "medium" | "large";
  isDisabled?: boolean;
  onChange?: (value: boolean) => void;
  rules?: Omit<
    RegisterOptions<TFieldValues, any>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
}

export function ToggleFormField<TFieldValues extends FieldValues = any>({
  name,
  control,
  size,
  isDisabled = false,
  onChange,
  rules,
}: Readonly<ToggleFormFieldProps<TFieldValues>>) {
  return (
    <Controller
      name={name as any}
      control={control}
      rules={rules}
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
