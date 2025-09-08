/**
 * Example usage of SelectFormField and AsyncSelectFormField with "already selected" functionality
 *
 * This demonstrates how to use the form field components with react-hook-form
 * while utilizing the "already selected" feature to prevent duplicate selections.
 */

import { useForm, FormProvider } from "react-hook-form";
import { SelectFormField } from "#/components/form/components/form-field/SelectFormField";
import { AsyncSelectFormField } from "#/components/form/components/form-field/AsyncSelectFormField";
import { FieldsetSelectOption } from "#/components/form/model";

interface FormData {
  primaryTerritory: FieldsetSelectOption | null;
  secondaryTerritory: FieldsetSelectOption | null;
  asyncTerritory: FieldsetSelectOption | null;
}

const territoryOptions: FieldsetSelectOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
];

export function FormFieldExampleWithAlreadySelected() {
  const methods = useForm<FormData>({
    defaultValues: {
      primaryTerritory: null,
      secondaryTerritory: null,
      asyncTerritory: null,
    },
  });

  const { control, watch } = methods;

  // Watch form values to determine already selected territories
  const primaryTerritory = watch("primaryTerritory");
  const secondaryTerritory = watch("secondaryTerritory");
  const asyncTerritory = watch("asyncTerritory");

  // Create arrays of already selected values for each field
  const alreadySelectedForSecondary = [primaryTerritory, asyncTerritory].filter(
    Boolean,
  ) as FieldsetSelectOption[];
  const alreadySelectedForAsync = [primaryTerritory, secondaryTerritory].filter(
    Boolean,
  ) as FieldsetSelectOption[];
  const alreadySelectedForPrimary = [secondaryTerritory, asyncTerritory].filter(
    Boolean,
  ) as FieldsetSelectOption[];

  // Async load function for demonstration
  const loadTerritoryOptions = async (
    inputValue: string,
  ): Promise<FieldsetSelectOption[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return territoryOptions.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6">
      <div>
        <h1 className="text-h1-700 text-primary-600 mb-4">
          Form Fields with "Already Selected" Feature
        </h1>
        <p className="text-b2-400 mb-6 text-neutral-700">
          This example shows how to use SelectFormField and AsyncSelectFormField
          with the "already selected" functionality to prevent duplicate
          selections across form fields.
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          {/* Primary Territory Selection */}
          <SelectFormField
            control={control}
            name="primaryTerritory"
            label="Primary Territory"
            placeholder="Select primary territory"
            options={territoryOptions}
            isRequired={true}
            fieldName="Primary Territory"
            alreadySelectedValues={alreadySelectedForPrimary}
            showAlreadySelectedText={true}
            alreadySelectedText="(Selected elsewhere)"
          />

          {/* Secondary Territory Selection */}
          <SelectFormField
            control={control}
            name="secondaryTerritory"
            label="Secondary Territory"
            placeholder="Select secondary territory"
            options={territoryOptions}
            isRequired={false}
            fieldName="Secondary Territory"
            alreadySelectedValues={alreadySelectedForSecondary}
            showAlreadySelectedText={true}
            alreadySelectedText="(Already chosen)"
          />

          {/* Async Territory Selection */}
          <AsyncSelectFormField
            control={control}
            name="asyncTerritory"
            label="Additional Territory (Searchable)"
            placeholder="Search for additional territory..."
            defaultOptions={territoryOptions}
            loadOptions={loadTerritoryOptions}
            isRequired={false}
            fieldName="Additional Territory"
            alreadySelectedValues={alreadySelectedForAsync}
            showAlreadySelectedText={true}
            alreadySelectedText="(Used above)"
          />

          <div className="pt-4">
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 rounded-md px-6 py-2 text-white transition-colors"
            >
              Submit Form
            </button>
          </div>
        </form>
      </FormProvider>

      {/* Real-time Form Values Display */}
      <div className="bg-secondary-50 border-secondary-200 mt-8 rounded-lg border p-4">
        <h3 className="text-h3-600 mb-3 text-neutral-900">
          Current Form Values
        </h3>
        <pre className="overflow-x-auto text-sm text-neutral-700">
          {JSON.stringify(
            {
              primaryTerritory: primaryTerritory?.label || null,
              secondaryTerritory: secondaryTerritory?.label || null,
              asyncTerritory: asyncTerritory?.label || null,
            },
            null,
            2,
          )}
        </pre>
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
        <h4 className="text-h4-600 mb-3 text-blue-900">How It Works</h4>
        <div className="text-b3-400 space-y-2 text-blue-800">
          <p>
            <strong>Smart Prevention:</strong> Options selected in one field
            become disabled in others
          </p>
          <p>
            <strong>Real-time Updates:</strong> Changes are reflected
            immediately across all fields
          </p>
          <p>
            <strong>Customizable Messages:</strong> Each field can have
            different "already selected" text
          </p>
          <p>
            <strong>Form Integration:</strong> Works seamlessly with
            react-hook-form validation
          </p>
          <p>
            <strong>Accessibility:</strong> Maintains proper form field
            semantics and error handling
          </p>
        </div>
      </div>

      {/* Code Example */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4">
        <h4 className="text-h4-600 mb-3 text-neutral-900">Code Example</h4>
        <pre className="overflow-x-auto rounded bg-gray-50 p-4 text-xs text-neutral-600">
          {`<SelectFormField
  control={control}
  name="primaryTerritory"
  label="Primary Territory"
  options={territoryOptions}
  alreadySelectedValues={alreadySelectedForPrimary}
  showAlreadySelectedText={true}
  alreadySelectedText="(Selected elsewhere)"
  isRequired={true}
/>

<AsyncSelectFormField
  control={control}
  name="asyncTerritory"
  label="Additional Territory"
  defaultOptions={territoryOptions}
  loadOptions={loadTerritoryOptions}
  alreadySelectedValues={alreadySelectedForAsync}
  showAlreadySelectedText={true}
  alreadySelectedText="(Used above)"
/>`}
        </pre>
      </div>
    </div>
  );
}

export default FormFieldExampleWithAlreadySelected;
