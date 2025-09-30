// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Controller } from "react-hook-form";
import {
  GroupBase,
  MenuPlacement,
  OptionProps,
  SelectComponentsConfig,
  SingleValue,
} from "react-select";

import { FieldsetSelectOption, FormFieldProps } from "#/components/form/model";
import { Fieldset } from "#/components/form/components/fieldset/Fieldset";

interface AsyncSelectFormFieldProps
  extends Omit<FormFieldProps, "type" | "onChange"> {
  defaultOptions: FieldsetSelectOption[];
  onChange?: (value: SingleValue<FieldsetSelectOption>) => void;
  onBlur?: () => void;
  isSearchable?: boolean;
  isMultiSelect?: boolean;
  defaultValue?: SingleValue<FieldsetSelectOption> | null;
  children?: React.ComponentType<
    OptionProps<unknown, boolean, GroupBase<unknown>>
  >; // for option component
  selectComponentOptions?: Partial<
    SelectComponentsConfig<unknown, boolean, GroupBase<unknown>>
  >;
  loadOptions?: (inputValue: string) => Promise<FieldsetSelectOption[]>;
  menuPortalTarget?: HTMLElement | null;
  // New props for already selected functionality
  alreadySelectedValues?: FieldsetSelectOption[];
  showAlreadySelectedText?: boolean;
  alreadySelectedText?: string;
  menuPlacement?: MenuPlacement;
  // Multiselect height constraints
  maxHeight?: number | string;
}

export function AsyncSelectFormField({
  control,
  name,
  label,
  defaultOptions,
  onChange,
  onBlur = () => {},
  isSearchable = true,
  isMultiSelect = false,
  defaultValue,
  placeholder,
  fieldName,
  isDisabled = false,
  isRequired = false,
  rules,
  size = "medium",
  withoutTagLabel = false,
  children,
  selectComponentOptions,
  loadOptions,
  menuPortalTarget,
  alreadySelectedValues,
  showAlreadySelectedText,
  alreadySelectedText,
  menuPlacement,
  maxHeight,
}: Readonly<AsyncSelectFormFieldProps>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: {
          value: isRequired,
          message: `${fieldName || label} is required`,
        },
        ...rules,
      }}
      render={({ field, fieldState }) => (
        <Fieldset
          size={size}
          isRequired={isRequired}
          isDisabled={isDisabled}
          isError={!!fieldState.error}
        >
          {label && (
            <Fieldset.Label withoutTag={withoutTagLabel}>
              {label}
            </Fieldset.Label>
          )}

          <Fieldset.AsyncSelect
            loadOptions={loadOptions}
            isMultiSelect={isMultiSelect}
            isSearchable={isSearchable}
            placeholder={placeholder}
            defaultOptions={defaultOptions}
            menuPlacement={menuPlacement}
            onChange={(value) => {
              field.onChange(value);
              onChange?.(value);
            }}
            defaultValue={defaultValue}
            value={field.value}
            onBlur={() => {
              field.onBlur();
              onBlur?.();
            }}
            selectComponentOptions={selectComponentOptions}
            menuPortalTarget={menuPortalTarget}
            alreadySelectedValues={alreadySelectedValues}
            showAlreadySelectedText={showAlreadySelectedText}
            alreadySelectedText={alreadySelectedText}
            maxHeight={maxHeight}
          >
            {children}
          </Fieldset.AsyncSelect>

          {fieldState.error?.message && (
            <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
          )}
        </Fieldset>
      )}
    />
  );
}
