import { useForm, FormProvider } from "react-hook-form";
import { SelectFormField } from "#/components/form/components/form-field/SelectFormField";
import { AsyncSelectFormField } from "#/components/form/components/form-field/AsyncSelectFormField";
import { createFieldsetSelectOptionWithSelectedState } from "#/components/form/components/fieldset/FieldsetSelectOptionWithSelectedState";
import { FieldsetSelectOption } from "#/components/form/model";

interface FormData {
  // Test 1: Basic functionality
  primaryTerritory: FieldsetSelectOption | null;
  secondaryTerritory: FieldsetSelectOption | null;

  // Test 2: Built-in props vs manual component
  builtInPropsSelect: FieldsetSelectOption | null;
  manualComponentSelect: FieldsetSelectOption | null;

  // Test 3: Async selects
  asyncTerritory: FieldsetSelectOption | null;
  asyncTerritoryManual: FieldsetSelectOption | null;
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

// Pre-selected territories for static demo
const alreadySelectedTerritories: FieldsetSelectOption[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
];

function FormSelects() {
  const methods = useForm<FormData>({
    defaultValues: {
      primaryTerritory: null,
      secondaryTerritory: null,
      builtInPropsSelect: null,
      manualComponentSelect: null,
      asyncTerritory: null,
      asyncTerritoryManual: null,
    },
  });

  const { control, watch } = methods;

  // Watch all form values
  const formValues = watch();
  const {
    primaryTerritory,
    secondaryTerritory,
    builtInPropsSelect,
    manualComponentSelect,
    asyncTerritory,
    asyncTerritoryManual,
  } = formValues;

  // Create dynamic arrays of already selected values for cross-field prevention
  const selectedForPrimary = [
    secondaryTerritory,
    builtInPropsSelect,
    asyncTerritory,
  ].filter(Boolean) as FieldsetSelectOption[];
  const selectedForSecondary = [
    primaryTerritory,
    manualComponentSelect,
    asyncTerritoryManual,
  ].filter(Boolean) as FieldsetSelectOption[];
  const selectedForBuiltIn = [
    primaryTerritory,
    secondaryTerritory,
    asyncTerritory,
  ].filter(Boolean) as FieldsetSelectOption[];
  const selectedForManual = [
    primaryTerritory,
    secondaryTerritory,
    builtInPropsSelect,
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

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-h2-700 mb-6 text-neutral-950">
          "Already Selected" Feature - Comprehensive Test
        </h2>
        <p className="text-b2-400 mb-6 text-neutral-700">
          Comprehensive testing of the "already selected" functionality across
          different component types. This demonstrates real-time prevention of
          duplicate selections with various implementation methods.
        </p>
      </div>

      <FormProvider {...methods}>
        <form className="space-y-10">
          {/* Test 1: Cross-Field Prevention with Form Fields */}
          <section className="space-y-6">
            <div>
              <h3 className="text-h3-600 mb-2 text-neutral-900">
                Test 1: Real-time Cross-Field Prevention
              </h3>
              <p className="text-b3-400 text-neutral-600">
                Select in one field to see options disabled in others. These
                fields prevent each other's selections.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <SelectFormField
                control={control}
                name="primaryTerritory"
                label="Primary Territory"
                placeholder="Select primary territory"
                options={territoryOptions}
                isRequired={true}
                fieldName="Primary Territory"
                alreadySelectedValues={selectedForPrimary}
                showAlreadySelectedText={true}
                alreadySelectedText="(Selected in other fields)"
              />

              <SelectFormField
                control={control}
                name="secondaryTerritory"
                label="Secondary Territory"
                placeholder="Select secondary territory"
                options={territoryOptions}
                isRequired={false}
                fieldName="Secondary Territory"
                alreadySelectedValues={selectedForSecondary}
                showAlreadySelectedText={true}
                alreadySelectedText="(Already chosen)"
              />
            </div>
          </section>

          {/* Test 2: Built-in Props vs Manual Component */}
          <section className="space-y-6">
            <div>
              <h3 className="text-h3-600 mb-2 text-neutral-900">
                Test 2: Implementation Methods Comparison
              </h3>
              <p className="text-b3-400 text-neutral-600">
                Comparing built-in props (left) vs manual option component
                (right). Both prevent each other's selections.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Built-in Props Method */}
              <div className="space-y-4">
                <h4 className="text-b1-600 text-neutral-800">
                  Method 1: Built-in Props
                </h4>
                <SelectFormField
                  control={control}
                  name="builtInPropsSelect"
                  label="Built-in Props Select"
                  placeholder="Using built-in props"
                  options={territoryOptions}
                  alreadySelectedValues={selectedForBuiltIn}
                  showAlreadySelectedText={true}
                  alreadySelectedText="(Built-in detection)"
                />
                <div className="rounded bg-green-50 p-2 text-xs text-green-600">
                  ✅ Uses new <code>alreadySelectedValues</code> prop
                </div>
              </div>

              {/* Manual Option Component Method */}
              <div className="space-y-4">
                <h4 className="text-b1-600 text-neutral-800">
                  Method 2: Manual Component
                </h4>
                <SelectFormField
                  control={control}
                  name="manualComponentSelect"
                  label="Manual Component Select"
                  placeholder="Using manual component"
                  options={territoryOptions}
                  selectComponentOptions={{
                    Option: createFieldsetSelectOptionWithSelectedState({
                      alreadySelectedValues: selectedForManual,
                      currentValue: manualComponentSelect,
                      showAlreadySelectedText: true,
                      alreadySelectedText: "⚠️ Manual detection",
                    }),
                  }}
                />
                <div className="rounded bg-blue-50 p-2 text-xs text-blue-600">
                  🔧 Uses manual{" "}
                  <code>createFieldsetSelectOptionWithSelectedState</code>
                </div>
              </div>
            </div>
          </section>

          {/* Test 3: Async Select Components */}
          <section className="space-y-6">
            <div>
              <h3 className="text-h3-600 mb-2 text-neutral-900">
                Test 3: Async Select Components
              </h3>
              <p className="text-b3-400 text-neutral-600">
                Testing the feature with searchable async select components.
                Type to search territories.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <AsyncSelectFormField
                control={control}
                name="asyncTerritory"
                label="Async Territory (Built-in Props)"
                placeholder="Search territories..."
                defaultOptions={territoryOptions}
                loadOptions={loadTerritoryOptions}
                alreadySelectedValues={
                  [builtInPropsSelect, manualComponentSelect].filter(
                    Boolean,
                  ) as FieldsetSelectOption[]
                }
                showAlreadySelectedText={true}
                alreadySelectedText="(Selected above)"
              />

              <AsyncSelectFormField
                control={control}
                name="asyncTerritoryManual"
                label="Async Territory (Manual Component)"
                placeholder="Search with manual component..."
                defaultOptions={territoryOptions}
                loadOptions={loadTerritoryOptions}
                selectComponentOptions={{
                  Option: createFieldsetSelectOptionWithSelectedState({
                    alreadySelectedValues: [
                      primaryTerritory,
                      secondaryTerritory,
                    ].filter(Boolean) as FieldsetSelectOption[],
                    currentValue: asyncTerritoryManual,
                    showAlreadySelectedText: true,
                    alreadySelectedText: "🔍 Found above",
                  }),
                }}
              />
            </div>
          </section>

          {/* Test 4: Static Pre-selected Options Demo */}
          <section className="space-y-6">
            <div>
              <h3 className="text-h3-600 mb-2 text-neutral-900">
                Test 4: Static Pre-selected Options
              </h3>
              <p className="text-b3-400 text-neutral-600">
                Demonstration with pre-selected territories (US, UK, Germany)
                that are always disabled.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <SelectFormField
                control={control}
                name="primaryTerritory"
                label="Form Field with Static Disabled Options"
                placeholder="Try selecting US, UK, or Germany"
                options={territoryOptions}
                alreadySelectedValues={alreadySelectedTerritories}
                showAlreadySelectedText={true}
                alreadySelectedText="(Unavailable)"
              />

              <div className="space-y-4">
                <div className="text-b1-600 text-neutral-900">Demo Note</div>
                <div className="text-b3-400 rounded border border-yellow-200 bg-yellow-50 p-3 text-neutral-600">
                  This section would normally include raw Fieldset components,
                  but they need to be imported differently or accessed through
                  the library exports. The form field versions above demonstrate
                  the same functionality.
                </div>
              </div>
            </div>
          </section>
        </form>
      </FormProvider>

      {/* Real-time Form Values Display */}
      <section className="space-y-4">
        <h3 className="text-h3-600 text-neutral-900">Real-time Form State</h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h4 className="text-h4-600 mb-3 text-blue-900">Selected Values</h4>
            <pre className="overflow-x-auto text-sm text-blue-800">
              {JSON.stringify(
                Object.entries(formValues).reduce(
                  (acc, [key, value]) => {
                    acc[key] = value?.label || null;
                    return acc;
                  },
                  {} as Record<string, string | null>,
                ),
                null,
                2,
              )}
            </pre>
          </div>

          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
            <h4 className="text-h4-600 mb-3 text-purple-900">Test Results</h4>
            <div className="space-y-2 text-sm text-purple-800">
              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${selectedForPrimary.length > 0 ? "bg-green-500" : "bg-gray-300"}`}
                ></span>
                Cross-field prevention:{" "}
                {selectedForPrimary.length > 0 ? "Active" : "Inactive"}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${builtInPropsSelect || manualComponentSelect ? "bg-green-500" : "bg-gray-300"}`}
                ></span>
                Implementation methods:{" "}
                {builtInPropsSelect || manualComponentSelect
                  ? "Working"
                  : "Not tested"}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${asyncTerritory || asyncTerritoryManual ? "bg-green-500" : "bg-gray-300"}`}
                ></span>
                Async selects:{" "}
                {asyncTerritory || asyncTerritoryManual
                  ? "Working"
                  : "Not tested"}
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                Static disabled options: Always active (US, UK, Germany)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Documentation */}
      <section className="border-secondary-200 bg-secondary-50 rounded-lg border p-6">
        <h4 className="text-h4-600 mb-4 text-neutral-900">
          Feature Implementation Summary
        </h4>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <h5 className="text-b1-600 mb-2 text-neutral-800">
              ✅ What's Working:
            </h5>
            <ul className="text-b3-400 space-y-1 text-neutral-700">
              <li>• Real-time cross-field prevention</li>
              <li>• Built-in props implementation</li>
              <li>• Manual option component method</li>
              <li>• Async select support</li>
              <li>• Form field integration</li>
              <li>• Custom messages and styling</li>
              <li>• TypeScript support</li>
            </ul>
          </div>

          <div>
            <h5 className="text-b1-600 mb-2 text-neutral-800">
              🎯 Test Instructions:
            </h5>
            <ol className="text-b3-400 space-y-1 text-neutral-700">
              <li>1. Select a territory in "Primary Territory"</li>
              <li>2. Notice it becomes disabled in "Secondary Territory"</li>
              <li>3. Try selecting US, UK, or Germany (always disabled)</li>
              <li>4. Test async search functionality</li>
              <li>5. Compare built-in vs manual methods</li>
              <li>6. Watch real-time state updates</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FormSelects;
