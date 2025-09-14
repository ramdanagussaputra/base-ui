// WARNING: This component should use within FormProvider from react-hook-form. learn how to use it in https://react-hook-form.com/docs/formprovider

import { Controller } from "react-hook-form";
import {
  GroupBase,
  OptionProps,
  SelectComponentsConfig,
  SingleValue,
} from "react-select";

import { FieldsetSelectOption, FormFieldProps } from "#/components/form/model";
import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FieldsetAsyncPaginate } from "#/components/form/components/fieldset/FieldsetAsyncPaginate";

interface LoadOptionsResponse {
  options: FieldsetSelectOption[];
  hasMore: boolean;
  additional?: any;
}

interface AsyncPaginateFormFieldProps
  extends Omit<FormFieldProps, "type" | "onChange"> {
  defaultOptions?: FieldsetSelectOption[] | boolean;
  onChange?: (value: SingleValue<FieldsetSelectOption>) => void;
  onBlur?: () => void;
  isSearchable?: boolean;
  isMultiSelect?: boolean;
  children?: React.ComponentType<
    OptionProps<unknown, boolean, GroupBase<unknown>>
  >; // for option component
  selectComponentOptions?: Partial<
    SelectComponentsConfig<unknown, boolean, GroupBase<unknown>>
  >;
  menuPortalTarget?: HTMLElement | null;
  // New props for already selected functionality
  alreadySelectedValues?: FieldsetSelectOption[];
  showAlreadySelectedText?: boolean;
  alreadySelectedText?: string;
  // AsyncPaginate specific props
  loadOptions: (
    inputValue: string,
    loadedOptions: readonly FieldsetSelectOption[],
    additional?: any,
  ) => Promise<LoadOptionsResponse>;
  additional?: any;
  defaultAdditional?: any;
  debounceTimeout?: number;
  shouldLoadMore?: (
    scrollHeight: number,
    clientHeight: number,
    scrollTop: number,
  ) => boolean;
  reduceOptions?: (
    prevOptions: readonly FieldsetSelectOption[],
    loadedOptions: readonly FieldsetSelectOption[],
    additional?: any,
  ) => FieldsetSelectOption[];
  cacheUniqs?: any[];
  loadOptionsOnMenuOpen?: boolean;
  clearCacheOnSearchChange?: boolean;
  clearCacheOnMenuClose?: boolean;
  reloadOnErrorTimeout?: number;
  size?: "extra-small" | "small" | "medium" | "large";
}

export function AsyncPaginateFormField({
  control,
  name,
  label,
  defaultOptions = true,
  onChange,
  onBlur = () => {},
  isSearchable = true,
  isMultiSelect = false,
  placeholder,
  isDisabled = false,
  isRequired = false,
  rules,
  withoutTagLabel = false,
  children,
  selectComponentOptions,
  loadOptions,
  menuPortalTarget,
  alreadySelectedValues = [],
  showAlreadySelectedText = true,
  alreadySelectedText = "(Already selected)",
  additional,
  defaultAdditional,
  debounceTimeout = 300,
  shouldLoadMore,
  reduceOptions,
  cacheUniqs,
  loadOptionsOnMenuOpen = true,
  clearCacheOnSearchChange = false,
  clearCacheOnMenuClose = false,
  reloadOnErrorTimeout,
  size = "medium",
}: Readonly<AsyncPaginateFormFieldProps>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: isRequired,
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

          <FieldsetAsyncPaginate
            placeholder={placeholder}
            defaultOptions={defaultOptions}
            onChange={(value: SingleValue<FieldsetSelectOption>) => {
              field.onChange(value);
              onChange?.(value);
            }}
            onBlur={() => {
              field.onBlur();
              onBlur();
            }}
            isSearchable={isSearchable}
            isMultiSelect={isMultiSelect}
            value={field.value || null}
            children={children}
            selectComponentOptions={selectComponentOptions}
            loadOptions={loadOptions}
            menuPortalTarget={menuPortalTarget}
            alreadySelectedValues={alreadySelectedValues}
            showAlreadySelectedText={showAlreadySelectedText}
            alreadySelectedText={alreadySelectedText}
            additional={additional}
            defaultAdditional={defaultAdditional}
            debounceTimeout={debounceTimeout}
            shouldLoadMore={shouldLoadMore}
            reduceOptions={reduceOptions}
            cacheUniqs={cacheUniqs}
            loadOptionsOnMenuOpen={loadOptionsOnMenuOpen}
            clearCacheOnSearchChange={clearCacheOnSearchChange}
            clearCacheOnMenuClose={clearCacheOnMenuClose}
            reloadOnErrorTimeout={reloadOnErrorTimeout}
          />

          {fieldState.error?.message && (
            <Fieldset.Message>{fieldState.error.message}</Fieldset.Message>
          )}
        </Fieldset>
      )}
    />
  );
}
