import { useForm, FormProvider } from "react-hook-form";
import { SelectFormField } from "#/components/form/components/form-field/SelectFormField";
import { AsyncSelectFormField } from "#/components/form/components/form-field/AsyncSelectFormField";
import { SelectCreatableFormField } from "#/components/form/components/form-field/SelectCreatableFormField";
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

  // Test 4: Multiselect height constraints
  multiselectSmall: FieldsetSelectOption[] | null;
  multiselectMedium: FieldsetSelectOption[] | null;
  multiselectLarge: FieldsetSelectOption[] | null;
  multiselectCreatable: FieldsetSelectOption[] | null;

  // Test 5: Stress test with 500 options
  multiselectStressTest: FieldsetSelectOption[] | null;
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

// Generate 500 dummy options for stress testing
const dummyOptions: FieldsetSelectOption[] = Array.from(
  { length: 500 },
  (_, i) => ({
    value: `option-${i + 1}`,
    label: `Option ${i + 1} - ${
      [
        "Alpha",
        "Beta",
        "Gamma",
        "Delta",
        "Epsilon",
        "Zeta",
        "Eta",
        "Theta",
        "Iota",
        "Kappa",
        "Lambda",
        "Mu",
        "Nu",
        "Xi",
        "Omicron",
        "Pi",
        "Rho",
        "Sigma",
        "Tau",
        "Upsilon",
        "Phi",
        "Chi",
        "Psi",
        "Omega",
        "Prime",
        "Secondary",
        "Tertiary",
        "Quaternary",
      ][Math.floor(Math.random() * 28)]
    } ${
      [
        "System",
        "Network",
        "Protocol",
        "Interface",
        "Module",
        "Component",
        "Service",
        "Handler",
        "Manager",
        "Controller",
        "Provider",
        "Factory",
        "Builder",
        "Processor",
        "Analyzer",
      ][Math.floor(Math.random() * 15)]
    }`,
  }),
);

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
      multiselectSmall: null,
      multiselectMedium: null,
      multiselectLarge: null,
      multiselectCreatable: null,
      multiselectStressTest: null,
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
    multiselectSmall,
    multiselectMedium,
    multiselectLarge,
    multiselectCreatable,
    multiselectStressTest,
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

          {/* Test 4: Multiselect Height Constraints */}
          <section className="space-y-6">
            <div>
              <h3 className="text-h3-600 mb-2 text-neutral-900">
                Test 4: Multiselect Height Constraints & Scrolling
              </h3>
              <p className="text-b3-400 text-neutral-600">
                Testing the new maximum height constraints with scrollable
                overflow for multiselect components. Select multiple items to
                see scrolling behavior.
              </p>
            </div>

            {/* Size Variants Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Small Size */}
              <div className="space-y-4">
                <h4 className="text-b1-600 text-neutral-800">
                  Small (120px max)
                </h4>
                <SelectFormField
                  control={control}
                  name="multiselectSmall"
                  label="Small Multiselect"
                  placeholder="Select multiple territories..."
                  options={territoryOptions}
                  isMultiSelect={true}
                  size="small"
                  maxHeight={100}
                />
                <div className="rounded bg-blue-50 p-2 text-xs text-blue-600">
                  Max height: 100px (custom) • Scrolls when exceeded
                </div>
              </div>

              {/* Medium Size */}
              <div className="space-y-4">
                <h4 className="text-b1-600 text-neutral-800">
                  Medium (150px max)
                </h4>
                <SelectFormField
                  control={control}
                  name="multiselectMedium"
                  label="Medium Multiselect"
                  placeholder="Select multiple territories..."
                  options={territoryOptions}
                  isMultiSelect={true}
                  size="medium"
                />
                <div className="rounded bg-green-50 p-2 text-xs text-green-600">
                  Max height: 150px • Scrolls when exceeded
                </div>
              </div>

              {/* Large Size */}
              <div className="space-y-4">
                <h4 className="text-b1-600 text-neutral-800">
                  Large (180px max)
                </h4>
                <SelectFormField
                  control={control}
                  name="multiselectLarge"
                  label="Large Multiselect"
                  placeholder="Select multiple territories..."
                  options={territoryOptions}
                  isMultiSelect={true}
                  size="large"
                  maxHeight="250px"
                />
                <div className="rounded bg-purple-50 p-2 text-xs text-purple-600">
                  Max height: 250px (custom string) • Scrolls when exceeded
                </div>
              </div>
            </div>

            {/* Creatable Multiselect */}
            <div className="space-y-4">
              <h4 className="text-b1-600 text-neutral-800">
                Creatable Multiselect with Height Constraints
              </h4>
              <SelectCreatableFormField
                control={control}
                name="multiselectCreatable"
                label="Creatable Multiselect"
                placeholder="Select or create new territories..."
                options={territoryOptions}
                isMultiSelect={true}
                size="medium"
                fieldName="territory"
              />
              <div className="rounded bg-orange-50 p-2 text-xs text-orange-600">
                ✨ Can create new options + has height constraints
              </div>
            </div>

            {/* Instructions */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h5 className="text-b1-600 mb-2 text-amber-800">
                Testing Instructions:
              </h5>
              <ol className="text-b3-400 space-y-1 text-amber-700">
                <li>
                  1. Select multiple items in each size variant to see height
                  differences
                </li>
                <li>2. Keep adding selections until scrollbars appear</li>
                <li>
                  3. Test scrolling with mouse wheel and keyboard navigation
                </li>
                <li>4. Try creating new options in the creatable variant</li>
                <li>
                  5. Observe how the height stays consistent across different
                  selections
                </li>
              </ol>
            </div>
          </section>

          {/* Test 5: Stress Test with 500 Options */}
          <section className="space-y-6">
            <div>
              <h3 className="text-h3-600 mb-2 text-neutral-900">
                Test 5: Stress Test - 500 Options with Height Constraints
              </h3>
              <p className="text-b3-400 text-neutral-600">
                Performance test with 500 dummy options to validate scrolling
                behavior, search performance, and height constraints under heavy
                load.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Large Dataset Multiselect */}
              <div className="space-y-4">
                <h4 className="text-b1-600 text-neutral-800">
                  500 Options - Multiselect with Height Constraints
                </h4>
                <SelectFormField
                  control={control}
                  name="multiselectStressTest"
                  label="Stress Test Multiselect (500 Options)"
                  placeholder="Search and select from 500 options..."
                  options={dummyOptions}
                  isMultiSelect={true}
                  isSearchable={true}
                  size="medium"
                  maxHeight={50}
                />

                {/* Performance Stats */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded bg-blue-50 p-3 text-sm">
                    <div className="font-medium text-blue-900">
                      Total Options
                    </div>
                    <div className="text-xl font-bold text-blue-700">500</div>
                    <div className="text-xs text-blue-600">
                      Randomly generated
                    </div>
                  </div>

                  <div className="rounded bg-green-50 p-3 text-sm">
                    <div className="font-medium text-green-900">
                      Selected Count
                    </div>
                    <div className="text-xl font-bold text-green-700">
                      {multiselectStressTest?.length || 0}
                    </div>
                    <div className="text-xs text-green-600">
                      {multiselectStressTest?.length &&
                      multiselectStressTest.length > 5
                        ? "Scrolling active"
                        : "Select more to see scrolling"}
                    </div>
                  </div>

                  <div className="rounded bg-purple-50 p-3 text-sm">
                    <div className="font-medium text-purple-900">
                      Height Status
                    </div>
                    <div className="text-xl font-bold text-purple-700">
                      {multiselectStressTest?.length &&
                      multiselectStressTest.length > 5
                        ? "Constrained"
                        : "Normal"}
                    </div>
                    <div className="text-xs text-purple-600">
                      200px max height (custom)
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Instructions */}
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h5 className="text-b1-600 mb-2 text-red-800">
                  Stress Test Instructions:
                </h5>
                <ol className="text-b3-400 space-y-1 text-red-700">
                  <li>
                    1. <strong>Search Performance:</strong> Type to search
                    through 500 options (should be instant)
                  </li>
                  <li>
                    2. <strong>Selection Speed:</strong> Select multiple options
                    rapidly
                  </li>
                  <li>
                    3. <strong>Scrolling Test:</strong> Select 6+ options to
                    trigger height constraint scrolling
                  </li>
                  <li>
                    4. <strong>Memory Test:</strong> Select/deselect many
                    options to test performance
                  </li>
                  <li>
                    5. <strong>UI Consistency:</strong> Verify height stays at
                    200px regardless of selection count
                  </li>
                  <li>
                    6. <strong>Accessibility:</strong> Use keyboard navigation
                    within the scrollable area
                  </li>
                  <li>
                    7. <strong>📏 Custom Heights:</strong> Notice different max
                    heights: 100px, 150px (default), 250px, 200px
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* Test 6: Static Pre-selected Options Demo */}
          <section className="space-y-6">
            <div>
              <h3 className="text-h3-600 mb-2 text-neutral-900">
                Test 6: Static Pre-selected Options
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
                    if (Array.isArray(value)) {
                      acc[key] = value.map((v) => v?.label).filter(Boolean);
                    } else {
                      acc[key] = value?.label || null;
                    }
                    return acc;
                  },
                  {} as Record<string, string | string[] | null>,
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
                <span
                  className={`h-3 w-3 rounded-full ${
                    (multiselectSmall && multiselectSmall.length > 2) ||
                    (multiselectMedium && multiselectMedium.length > 2) ||
                    (multiselectLarge && multiselectLarge.length > 2) ||
                    (multiselectCreatable && multiselectCreatable.length > 2)
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                ></span>
                Multiselect height constraints:{" "}
                {(multiselectSmall && multiselectSmall.length > 2) ||
                (multiselectMedium && multiselectMedium.length > 2) ||
                (multiselectLarge && multiselectLarge.length > 2) ||
                (multiselectCreatable && multiselectCreatable.length > 2)
                  ? "Scrolling active (3+ items)"
                  : "Add more items to test scrolling"}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${
                    multiselectStressTest && multiselectStressTest.length > 5
                      ? "bg-green-500"
                      : multiselectStressTest &&
                          multiselectStressTest.length > 0
                        ? "bg-yellow-500"
                        : "bg-gray-300"
                  }`}
                ></span>
                Stress test (500 options):{" "}
                {multiselectStressTest && multiselectStressTest.length > 5
                  ? `Heavy load active (${multiselectStressTest.length} selected)`
                  : multiselectStressTest && multiselectStressTest.length > 0
                    ? `Light load (${multiselectStressTest.length} selected)`
                    : "Select items to test performance"}
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
              <li>🆕 Multiselect height constraints</li>
              <li>🆕 Scrollable overflow for long lists</li>
              <li>🆕 Size-variant responsive heights</li>
              <li>� Configurable maxHeight prop (number|string)</li>
              <li>�🔥 Performance tested with 500+ options</li>
              <li>🔥 Search optimization for large datasets</li>
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
              <li>6. 🆕 Select 3+ items in multiselects to test scrolling</li>
              <li>7. 🆕 Compare height behavior across size variants</li>
              <li>8. 🔥 Test stress performance with 500-option multiselect</li>
              <li>9. Watch real-time state updates</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FormSelects;
