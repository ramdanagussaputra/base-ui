import type { FieldsetProps } from "#/components/form/components/fieldset/Fieldset";

export interface FormFieldProps
  extends Omit<
    FieldsetProps,
    "children" | "className" | "isError" | "isSuccess"
  > {
  label: string;
  name: string;
  placeholder: string;
  control: any;
  fieldName?: string;
  type?: "text" | "email" | "password" | "number";
  rules?: any;
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
