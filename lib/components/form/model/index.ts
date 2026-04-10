import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import type { FieldsetProps } from "#/components/form/components/fieldset/Fieldset";

export interface FormFieldProps<TFieldValues extends FieldValues = any>
  extends Omit<
    FieldsetProps,
    "children" | "className" | "isError" | "isSuccess"
  > {
  label: string;
  name: Path<TFieldValues> | string;
  placeholder: string;
  control: Control<TFieldValues>;
  fieldName?: string;
  type?: "text" | "email" | "password" | "number";
  rules?: Omit<
    RegisterOptions<TFieldValues, any>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | string) => void;
  withoutTagLabel?: boolean;
}

export interface FieldsetSelectOption {
  value: string | number | boolean;
  label: string;
  hideCheckbox?: boolean; // Hide checkbox for this option in multi-select
  exclusiveGroup?: string; // Options with the same exclusiveGroup behave like single select
}

export interface FieldsetSelectOptionGroup {
  label: string;
  options: FieldsetSelectOption[];
}

export type FieldsetSelectOptionOrGroup =
  | FieldsetSelectOption
  | FieldsetSelectOptionGroup;
