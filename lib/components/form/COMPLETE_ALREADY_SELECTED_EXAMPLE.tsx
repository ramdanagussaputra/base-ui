/**
 * Complete working example of the "Already Selected" feature
 *
 * This file demonstrates both approaches:
 * 1. Using the new built-in props (when available)
 * 2. Using the manual option component (always works)
 */

import { useForm, FormProvider } from "react-hook-form";
import { SelectFormField } from "#/components/form/components/form-field/SelectFormField";
import { AsyncSelectFormField } from "#/components/form/components/form-field/AsyncSelectFormField";
import { createFieldsetSelectOptionWithSelectedState } from "#/components/form/components/fieldset/FieldsetSelectOptionWithSelectedState";
import { FieldsetSelectOption } from "#/components/form/model";

interface FormData {
  primaryTerritory: FieldsetSelectOption | null;
  secondaryTerritory: FieldsetSelectOption | null;
  manualTerritory: FieldsetSelectOption | null;
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

export function CompleteAlreadySelectedExample() {
  const methods = useForm<FormData>({
    defaultValues: {
      primaryTerritory: null,
      secondaryTerritory: null,
      manualTerritory: null,
      asyncTerritory: null,
    },
  });

  const { control, watch } = methods;

  // Watch form values to determine already selected territories
  const primaryTerritory = watch("primaryTerritory");
  const secondaryTerritory = watch("secondaryTerritory");
  const manualTerritory = watch("manualTerritory");
  const asyncTerritory = watch("asyncTerritory");

  // Create arrays of already selected values for each field
  const allSelectedTerritories = [
    primaryTerritory,
    secondaryTerritory,
    manualTerritory,
    asyncTerritory,
  ].filter(Boolean) as FieldsetSelectOption[];

  const alreadySelectedForPrimary = [
    secondaryTerritory,
    manualTerritory,
    asyncTerritory,
  ].filter(Boolean) as FieldsetSelectOption[];
  const alreadySelectedForSecondary = [
    primaryTerritory,
    manualTerritory,
    asyncTerritory,
  ].filter(Boolean) as FieldsetSelectOption[];
  const alreadySelectedForManual = [
    primaryTerritory,
    secondaryTerritory,
    asyncTerritory,
  ].filter(Boolean) as FieldsetSelectOption[];
  const alreadySelectedForAsync = [
    primaryTerritory,
    secondaryTerritory,
    manualTerritory,
  ].filter(Boolean) as FieldsetSelectOption[];

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
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <div>
        <h1 className="text-h1-700 text-primary-600 mb-4">
          Complete "Already Selected" Feature Demo
        </h1>
        <p className="text-b2-400 mb-6 text-neutral-700">
          This example demonstrates both approaches to implementing the "already
          selected" feature: built-in props and manual option components. Try
          selecting options and see how they become disabled in other fields.
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Method 1: Using built-in props */}
            <div className="space-y-6">
              <h2 className="text-h2-600 text-neutral-900">
                Method 1: Built-in Props
              </h2>

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
            </div>

            {/* Method 2: Using manual option component */}
            <div className="space-y-6">
              <h2 className="text-h2-600 text-neutral-900">
                Method 2: Manual Option Component
              </h2>

              <SelectFormField
                control={control}
                name="manualTerritory"
                label="Manual Territory"
                placeholder="Select with manual component"
                options={territoryOptions}
                isRequired={false}
                fieldName="Manual Territory"
                selectComponentOptions={{
                  Option: createFieldsetSelectOptionWithSelectedState({
                    alreadySelectedValues: alreadySelectedForManual,
                    currentValue: manualTerritory,
                    showAlreadySelectedText: true,
                    alreadySelectedText: "⚠️ In use",
                  }),
                }}
              />

              <AsyncSelectFormField
                control={control}
                name="asyncTerritory"
                label="Async Territory (Searchable)"
                placeholder="Search territories..."
                defaultOptions={territoryOptions}
                loadOptions={loadTerritoryOptions}
                isRequired={false}
                fieldName="Async Territory"
                alreadySelectedValues={alreadySelectedForAsync}
                showAlreadySelectedText={true}
                alreadySelectedText="(Used above)"
              />
            </div>
          </div>

          <div className="border-secondary-200 border-t pt-4">
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 rounded-md px-6 py-3 font-medium text-white transition-colors"
            >
              Submit Form
            </button>
          </div>
        </form>
      </FormProvider>

      {/* Real-time Form Values Display */}
      <div className="bg-secondary-50 border-secondary-200 mt-8 rounded-lg border p-6">
        <h3 className="text-h3-600 mb-4 text-neutral-900">
          Current Form Values
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h4 className="text-b1-600 mb-2 text-neutral-700">
              Selected Values:
            </h4>
            <pre className="overflow-x-auto rounded border bg-white p-3 text-sm text-neutral-700">
              {JSON.stringify(
                {
                  primary: primaryTerritory?.label || null,
                  secondary: secondaryTerritory?.label || null,
                  manual: manualTerritory?.label || null,
                  async: asyncTerritory?.label || null,
                },
                null,
                2,
              )}
            </pre>
          </div>
          <div>
            <h4 className="text-b1-600 mb-2 text-neutral-700">
              All Selected ({allSelectedTerritories.length}):
            </h4>
            <div className="rounded border bg-white p-3">
              {allSelectedTerritories.length > 0 ? (
                <ul className="space-y-1 text-sm text-neutral-700">
                  {allSelectedTerritories.map((territory, index) => (
                    <li
                      key={String(territory.value)}
                      className="flex items-center"
                    >
                      <span className="bg-primary-100 text-primary-700 mr-2 flex h-4 w-4 items-center justify-center rounded-full text-xs">
                        {index + 1}
                      </span>
                      {territory.label}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm italic text-neutral-500">
                  No territories selected
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Guide */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Method 1 Code */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h4 className="text-h4-600 mb-3 text-blue-900">
            Method 1: Built-in Props
          </h4>
          <pre className="overflow-x-auto rounded border bg-white p-4 text-xs text-blue-800">
            {`<SelectFormField
  control={control}
  name="territory"
  label="Territory"
  options={territoryOptions}
  alreadySelectedValues={alreadySelected}
  showAlreadySelectedText={true}
  alreadySelectedText="(Selected elsewhere)"
/>`}
          </pre>
          <div className="text-b3-400 mt-3 text-blue-700">
            <p>
              <strong>Pros:</strong> Clean API, easy to use
            </p>
            <p>
              <strong>When to use:</strong> For new implementations
            </p>
          </div>
        </div>

        {/* Method 2 Code */}
        <div className="rounded-lg border border-green-200 bg-green-50 p-6">
          <h4 className="text-h4-600 mb-3 text-green-900">
            Method 2: Manual Component
          </h4>
          <pre className="overflow-x-auto rounded border bg-white p-4 text-xs text-green-800">
            {`<SelectFormField
  control={control}
  name="territory"
  selectComponentOptions={{
    Option: createFieldsetSelectOptionWithSelectedState({
      alreadySelectedValues: alreadySelected,
      currentValue: selectedValue,
      showAlreadySelectedText: true,
      alreadySelectedText: "⚠️ In use",
    })
  }}
/>`}
          </pre>
          <div className="text-b3-400 mt-3 text-green-700">
            <p>
              <strong>Pros:</strong> More control, custom styling
            </p>
            <p>
              <strong>When to use:</strong> For advanced customization
            </p>
          </div>
        </div>
      </div>

      {/* Feature Benefits */}
      <div className="mt-8 rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
        <h4 className="text-h4-600 mb-3 text-purple-900">
          ✨ Feature Benefits
        </h4>
        <div className="text-b3-400 grid grid-cols-1 gap-4 text-purple-800 md:grid-cols-2">
          <div>
            <p>
              <strong>🚫 Prevents Duplicates:</strong> No same option across
              fields
            </p>
            <p>
              <strong>⚡ Real-time Updates:</strong> Instant visual feedback
            </p>
            <p>
              <strong>🎨 Visual Clarity:</strong> Clear disabled state styling
            </p>
          </div>
          <div>
            <p>
              <strong>♿ Accessible:</strong> Proper ARIA and visual indicators
            </p>
            <p>
              <strong>🔧 Customizable:</strong> Flexible text and styling
              options
            </p>
            <p>
              <strong>📱 Responsive:</strong> Works across all device sizes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompleteAlreadySelectedExample;
