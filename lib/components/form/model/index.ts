import { Control, FieldValues, RegisterOptions } from "react-hook-form";
import type { FieldsetProps } from "#/components/form/components/fieldset/Fieldset";

export interface FormFieldProps
  extends Omit<
    FieldsetProps,
    "children" | "className" | "isError" | "isSuccess"
  > {
  readonly label: string;
  readonly name: string;
  readonly placeholder: string;
  readonly control: Control<any>;
  readonly fieldName?: string;
  readonly type?: "text" | "email" | "password" | "number";
  readonly rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  readonly onChange?: (
    event: React.ChangeEvent<HTMLInputElement> | string,
  ) => void;
}

export interface FieldsetSelectOption {
  value: string | number | boolean;
  label: string;
}
