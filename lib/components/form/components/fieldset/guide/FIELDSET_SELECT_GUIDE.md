# FieldsetSelect Component Guide

A comprehensive guide for using FieldsetSelect and FieldsetAsyncSelect components with all their features, including the "Already Selected" functionality.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Component Types](#component-types)
3. [Basic Usage](#basic-usage)
4. [Already Selected Feature](#already-selected-feature)
5. [Advanced Examples](#advanced-examples)
6. [API Reference](#api-reference)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

## 🎯 Overview

The FieldsetSelect components provide powerful standalone select functionality with support for:

- **Basic single selection** with static options
- **Async search** with dynamic option loading
- **"Already Selected" prevention** to avoid duplicate selections
- **Full TypeScript support** with type safety
- **Accessibility features** with proper ARIA support

### When to Use FieldsetSelect Components

| Component              | Use Case                              | Best For                             |
| ---------------------- | ------------------------------------- | ------------------------------------ |
| `Fieldset.Select`      | Standalone select with static options | Simple selections, filters, settings |
| `Fieldset.AsyncSelect` | Standalone searchable select          | Large datasets, API-driven options   |

**Use FieldsetSelect when:**

- You need standalone select components
- You're managing state directly (not using React Hook Form)
- You want full control over the selection logic
- You're building custom form solutions

## 🧩 Component Types

### Import Statement

```tsx
import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FieldsetSelectOption } from "#/components/form/model";
```

### 1. Basic FieldsetSelect

For static options with direct state management.

### 2. FieldsetAsyncSelect

For searchable selects with dynamic option loading.

## 🚀 Basic Usage

### Simple Static Select

```tsx
import React, { useState } from "react";
import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FieldsetSelectOption } from "#/components/form/model";

const countryOptions: FieldsetSelectOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

function BasicSelectExample() {
  const [selectedCountry, setSelectedCountry] =
    useState<FieldsetSelectOption | null>(null);

  return (
    <Fieldset>
      <Fieldset.Label>Country Selection</Fieldset.Label>
      <Fieldset.Select
        placeholder="Choose a country"
        options={countryOptions}
        value={selectedCountry}
        onChange={setSelectedCountry}
      />
      {selectedCountry && (
        <Fieldset.HelpText>Selected: {selectedCountry.label}</Fieldset.HelpText>
      )}
    </Fieldset>
  );
}
```

### Async/Searchable Select

```tsx
function AsyncSelectExample() {
  const [selectedCountry, setSelectedCountry] =
    useState<FieldsetSelectOption | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadCountryOptions = async (
    inputValue: string,
  ): Promise<FieldsetSelectOption[]> => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      const filteredOptions = countryOptions.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()),
      );

      return filteredOptions;
    } catch (error) {
      console.error("Failed to load countries:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fieldset>
      <Fieldset.Label>Search Countries</Fieldset.Label>
      <Fieldset.AsyncSelect
        placeholder="Type to search countries..."
        defaultOptions={countryOptions}
        loadOptions={loadCountryOptions}
        value={selectedCountry}
        onChange={setSelectedCountry}
        isLoading={isLoading}
        cacheOptions={true}
      />
    </Fieldset>
  );
}
```

### With Error State

```tsx
function SelectWithValidation() {
  const [selectedCountry, setSelectedCountry] =
    useState<FieldsetSelectOption | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCountryChange = (country: FieldsetSelectOption | null) => {
    setSelectedCountry(country);

    // Custom validation
    if (country && country.value === "restricted") {
      setError("This country is not available for selection");
    } else {
      setError(null);
    }
  };

  return (
    <Fieldset>
      <Fieldset.Label required>Country Selection</Fieldset.Label>
      <Fieldset.Select
        placeholder="Choose a country"
        options={countryOptions}
        value={selectedCountry}
        onChange={handleCountryChange}
        isDisabled={false}
      />
      {error && <Fieldset.ErrorText>{error}</Fieldset.ErrorText>}
      <Fieldset.HelpText>
        Please select your country of residence
      </Fieldset.HelpText>
    </Fieldset>
  );
}
```

## ⭐ Already Selected Feature

The "Already Selected" feature prevents duplicate selections across multiple select components, providing visual feedback when options are unavailable.

### Key Benefits

- **🚫 Prevents Duplicates**: No same option across fields
- **⚡ Real-time Updates**: Instant visual feedback
- **🎨 Visual Clarity**: Clear disabled state styling
- **♿ Accessible**: Proper ARIA and visual indicators
- **🔧 Customizable**: Flexible text and styling options

### Visual States

| State                 | Appearance              | Behavior                              |
| --------------------- | ----------------------- | ------------------------------------- |
| **Normal**            | Full opacity, clickable | Can be selected                       |
| **Already Selected**  | 60% opacity, grayed out | Cannot be selected, shows custom text |
| **Current Selection** | Standard selected state | Always selectable (can change)        |

### Method 1: Built-in Props (Recommended)

```tsx
function BasicAlreadySelectedExample() {
  const [primaryTerritory, setPrimaryTerritory] =
    useState<FieldsetSelectOption | null>(null);
  const [secondaryTerritory, setSecondaryTerritory] =
    useState<FieldsetSelectOption | null>(null);

  // Create arrays of already selected values
  const alreadySelectedForPrimary = [secondaryTerritory].filter(
    Boolean,
  ) as FieldsetSelectOption[];
  const alreadySelectedForSecondary = [primaryTerritory].filter(
    Boolean,
  ) as FieldsetSelectOption[];

  return (
    <div className="space-y-6">
      <Fieldset>
        <Fieldset.Label>Primary Territory</Fieldset.Label>
        <Fieldset.Select
          placeholder="Select primary territory"
          options={territoryOptions}
          value={primaryTerritory}
          onChange={setPrimaryTerritory}
          alreadySelectedValues={alreadySelectedForPrimary}
          showAlreadySelectedText={true}
          alreadySelectedText="(Selected as secondary)"
        />
      </Fieldset>

      <Fieldset>
        <Fieldset.Label>Secondary Territory</Fieldset.Label>
        <Fieldset.Select
          placeholder="Select secondary territory"
          options={territoryOptions}
          value={secondaryTerritory}
          onChange={setSecondaryTerritory}
          alreadySelectedValues={alreadySelectedForSecondary}
          showAlreadySelectedText={true}
          alreadySelectedText="(Selected as primary)"
        />
      </Fieldset>
    </div>
  );
}
```

### Method 2: Manual Option Component (Advanced)

```tsx
import { createFieldsetSelectOptionWithSelectedState } from "#/components/form/components/fieldset/FieldsetSelectOptionWithSelectedState";

function CustomOptionComponentExample() {
  const [selectedTerritories, setSelectedTerritories] = useState<{
    primary: FieldsetSelectOption | null;
    secondary: FieldsetSelectOption | null;
  }>({
    primary: null,
    secondary: null,
  });

  const allSelected = Object.values(selectedTerritories).filter(
    Boolean,
  ) as FieldsetSelectOption[];

  const customOptionComponent = createFieldsetSelectOptionWithSelectedState({
    alreadySelectedValues: allSelected,
    currentValue: selectedTerritories.primary,
    showAlreadySelectedText: true,
    alreadySelectedText: "🚫 Already assigned",
  });

  return (
    <Fieldset>
      <Fieldset.Label>Territory with Custom Component</Fieldset.Label>
      <Fieldset.Select
        placeholder="Select territory"
        options={territoryOptions}
        value={selectedTerritories.primary}
        onChange={(value) =>
          setSelectedTerritories((prev) => ({ ...prev, primary: value }))
        }
        selectComponentOptions={{
          Option: customOptionComponent,
        }}
      />
    </Fieldset>
  );
}
```

### Async Select with Already Selected

```tsx
function AsyncAlreadySelectedExample() {
  const [primaryCountry, setPrimaryCountry] =
    useState<FieldsetSelectOption | null>(null);
  const [backupCountry, setBackupCountry] =
    useState<FieldsetSelectOption | null>(null);

  const alreadySelectedForBackup = [primaryCountry].filter(
    Boolean,
  ) as FieldsetSelectOption[];

  const loadCountryOptions = async (
    inputValue: string,
  ): Promise<FieldsetSelectOption[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return countryOptions.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  return (
    <div className="space-y-6">
      <Fieldset>
        <Fieldset.Label>Primary Country</Fieldset.Label>
        <Fieldset.Select
          placeholder="Select primary country"
          options={countryOptions}
          value={primaryCountry}
          onChange={setPrimaryCountry}
        />
      </Fieldset>

      <Fieldset>
        <Fieldset.Label>Backup Country</Fieldset.Label>
        <Fieldset.AsyncSelect
          placeholder="Search backup country..."
          defaultOptions={countryOptions}
          loadOptions={loadCountryOptions}
          value={backupCountry}
          onChange={setBackupCountry}
          alreadySelectedValues={alreadySelectedForBackup}
          showAlreadySelectedText={true}
          alreadySelectedText="(Used as primary)"
        />
      </Fieldset>
    </div>
  );
}
```

## 🎯 Advanced Examples

### Multi-Select Prevention with Complex State

```tsx
function ComplexSelectionExample() {
  const [selections, setSelections] = useState<{
    region: FieldsetSelectOption | null;
    country: FieldsetSelectOption | null;
    city: FieldsetSelectOption | null;
    backup: FieldsetSelectOption | null;
  }>({
    region: null,
    country: null,
    city: null,
    backup: null,
  });

  const updateSelection =
    (field: keyof typeof selections) =>
    (value: FieldsetSelectOption | null) => {
      setSelections((prev) => ({ ...prev, [field]: value }));
    };

  const getAlreadySelectedFor = (
    excludeField: keyof typeof selections,
  ): FieldsetSelectOption[] => {
    return Object.entries(selections)
      .filter(([key, value]) => key !== excludeField && value !== null)
      .map(([, value]) => value) as FieldsetSelectOption[];
  };

  return (
    <div className="space-y-6">
      <Fieldset>
        <Fieldset.Label>Region</Fieldset.Label>
        <Fieldset.Select
          placeholder="Select region"
          options={locationOptions}
          value={selections.region}
          onChange={updateSelection("region")}
          alreadySelectedValues={getAlreadySelectedFor("region")}
          alreadySelectedText="(Used in other fields)"
        />
      </Fieldset>

      <Fieldset>
        <Fieldset.Label>Country</Fieldset.Label>
        <Fieldset.Select
          placeholder="Select country"
          options={locationOptions}
          value={selections.country}
          onChange={updateSelection("country")}
          alreadySelectedValues={getAlreadySelectedFor("country")}
          alreadySelectedText="(Already selected)"
        />
      </Fieldset>

      <Fieldset>
        <Fieldset.Label>City</Fieldset.Label>
        <Fieldset.AsyncSelect
          placeholder="Search city..."
          defaultOptions={locationOptions}
          loadOptions={loadLocationOptions}
          value={selections.city}
          onChange={updateSelection("city")}
          alreadySelectedValues={getAlreadySelectedFor("city")}
          alreadySelectedText="(Conflicts with other selections)"
        />
      </Fieldset>

      <Fieldset>
        <Fieldset.Label>Backup Location</Fieldset.Label>
        <Fieldset.Select
          placeholder="Select backup"
          options={locationOptions}
          value={selections.backup}
          onChange={updateSelection("backup")}
          alreadySelectedValues={getAlreadySelectedFor("backup")}
          alreadySelectedText="(Primary location)"
        />
      </Fieldset>

      {/* Real-time selection display */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="mb-2 font-medium text-blue-900">Current Selections</h4>
        <pre className="text-sm text-blue-800">
          {JSON.stringify(selections, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

### Custom Styling and Behavior

```tsx
function CustomStyledExample() {
  const [selectedValue, setSelectedValue] =
    useState<FieldsetSelectOption | null>(null);
  const [previousSelections, setPreviousSelections] = useState<
    FieldsetSelectOption[]
  >([]);

  const handleSelectionChange = (value: FieldsetSelectOption | null) => {
    if (
      selectedValue &&
      !previousSelections.find((item) => item.value === selectedValue.value)
    ) {
      setPreviousSelections((prev) => [...prev, selectedValue]);
    }
    setSelectedValue(value);
  };

  const customOptionComponent = createFieldsetSelectOptionWithSelectedState({
    alreadySelectedValues: previousSelections,
    currentValue: selectedValue,
    showAlreadySelectedText: true,
    alreadySelectedText: "⚠️ Previously selected",
  });

  return (
    <div className="space-y-6">
      <Fieldset>
        <Fieldset.Label>Selection with History</Fieldset.Label>
        <Fieldset.Select
          placeholder="Select an option"
          options={territoryOptions}
          value={selectedValue}
          onChange={handleSelectionChange}
          selectComponentOptions={{
            Option: customOptionComponent,
          }}
        />
        <Fieldset.HelpText>
          Previously selected options will be marked as unavailable
        </Fieldset.HelpText>
      </Fieldset>

      {previousSelections.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h4 className="mb-2 font-medium text-gray-900">Selection History</h4>
          <div className="space-y-1">
            {previousSelections.map((item, index) => (
              <div key={item.value} className="text-sm text-gray-600">
                {index + 1}. {item.label}
              </div>
            ))}
          </div>
          <button
            onClick={() => setPreviousSelections([])}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  );
}
```

## 📚 API Reference

### FieldsetSelect Props

```typescript
interface FieldsetSelectProps {
  // Basic selection props
  placeholder?: string;
  options: FieldsetSelectOption[];
  value: FieldsetSelectOption | null;
  onChange: (value: FieldsetSelectOption | null) => void;

  // Already Selected feature props
  alreadySelectedValues?: FieldsetSelectOption[];
  showAlreadySelectedText?: boolean;
  alreadySelectedText?: string;

  // Behavior props
  isDisabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;

  // Styling and customization
  selectComponentOptions?: Partial<SelectComponents>;
  className?: string;

  // Accessibility
  id?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}
```

### FieldsetAsyncSelect Props

```typescript
interface FieldsetAsyncSelectProps
  extends Omit<FieldsetSelectProps, "options"> {
  // Async loading props
  defaultOptions?: FieldsetSelectOption[] | boolean;
  loadOptions: (inputValue: string) => Promise<FieldsetSelectOption[]>;

  // Caching and performance
  cacheOptions?: boolean;
  defaultMenuIsOpen?: boolean;

  // Loading behavior
  noOptionsMessage?: (obj: { inputValue: string }) => string;
  loadingMessage?: (obj: { inputValue: string }) => string;
}
```

### FieldsetSelectOption Type

```typescript
interface FieldsetSelectOption {
  value: string | number;
  label: string;
  isDisabled?: boolean;
  data?: any; // Additional custom data
  [key: string]: any; // Allow additional properties
}
```

### Utility Function for Custom Options

```typescript
function createFieldsetSelectOptionWithSelectedState(config: {
  alreadySelectedValues: FieldsetSelectOption[];
  currentValue?: FieldsetSelectOption | null;
  showAlreadySelectedText?: boolean;
  alreadySelectedText?: string;
}): React.ComponentType<OptionProps<FieldsetSelectOption>>;
```

## ✅ Best Practices

### 1. Performance Optimization

```tsx
// ✅ Good: Memoize already selected arrays to prevent unnecessary re-renders
const alreadySelectedForPrimary = useMemo(
  () =>
    [secondaryTerritory, tertiaryTerritory].filter(
      Boolean,
    ) as FieldsetSelectOption[],
  [secondaryTerritory, tertiaryTerritory],
);

// ❌ Avoid: Creating new arrays on every render
const alreadySelectedForPrimary = [
  secondaryTerritory,
  tertiaryTerritory,
].filter(Boolean);
```

### 2. State Management

```tsx
// ✅ Good: Use proper state structure
interface SelectionState {
  primary: FieldsetSelectOption | null;
  secondary: FieldsetSelectOption | null;
  backup: FieldsetSelectOption | null;
}

const [selections, setSelections] = useState<SelectionState>({
  primary: null,
  secondary: null,
  backup: null,
});

// ❌ Avoid: Multiple individual state variables
const [primary, setPrimary] = useState(null);
const [secondary, setSecondary] = useState(null);
const [backup, setBackup] = useState(null);
```

### 3. Error Handling for Async Selects

```tsx
// ✅ Good: Graceful error handling with fallback
const loadOptions = async (
  inputValue: string,
): Promise<FieldsetSelectOption[]> => {
  try {
    const response = await api.searchTerritories(inputValue);
    return response.data;
  } catch (error) {
    console.error("Failed to load territories:", error);
    // Return filtered local options as fallback
    return territoryOptions.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }
};

// ❌ Avoid: Unhandled promise rejections
const loadOptions = async (inputValue: string) => {
  const response = await api.searchTerritories(inputValue); // Can throw
  return response.data;
};
```

### 4. Consistent Messaging

```tsx
// ✅ Good: Define consistent message constants
const ALREADY_SELECTED_MESSAGES = {
  PRIMARY: "(Selected as primary)",
  SECONDARY: "(Used as secondary)",
  BACKUP: "(Assigned as backup)",
  GENERAL: "(Already selected)",
} as const;

// ❌ Avoid: Inconsistent inline messages
alreadySelectedText = "already picked"; // Inconsistent casing and style
```

### 5. Accessibility

```tsx
// ✅ Good: Proper accessibility attributes
<Fieldset>
  <Fieldset.Label htmlFor="territory-select" required>
    Territory Selection
  </Fieldset.Label>
  <Fieldset.Select
    id="territory-select"
    aria-describedby="territory-help territory-error"
    aria-invalid={hasError}
    options={territoryOptions}
    value={selected}
    onChange={setSelected}
  />
  <Fieldset.HelpText id="territory-help">
    Choose the primary territory for your organization
  </Fieldset.HelpText>
  {error && (
    <Fieldset.ErrorText id="territory-error" role="alert">
      {error}
    </Fieldset.ErrorText>
  )}
</Fieldset>
```

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Already Selected Options Not Updating

**Problem**: Options don't get disabled when selecting in another field.

**Solution**: Ensure state updates properly trigger re-renders:

```tsx
// ✅ Correct: Use proper state dependencies
const alreadySelected = useMemo(
  () =>
    [otherSelection1, otherSelection2].filter(
      Boolean,
    ) as FieldsetSelectOption[],
  [otherSelection1, otherSelection2], // Dependencies array
);

// ❌ Incorrect: Static array that doesn't update
const alreadySelected = [
  /* static values */
];
```

#### 2. Custom Option Component Not Working

**Problem**: Custom option component styles not applying.

**Solution**: Ensure proper CSS is loaded and component is used correctly:

```tsx
// ✅ Correct: Proper component usage
const CustomOption = createFieldsetSelectOptionWithSelectedState({
  alreadySelectedValues: alreadySelected,
  currentValue: selectedValue,
  showAlreadySelectedText: true,
  alreadySelectedText: "(Custom message)",
});

<Fieldset.Select
  selectComponentOptions={{ Option: CustomOption }}
  // ... other props
/>;
```

#### 3. Async Loading Not Working

**Problem**: LoadOptions function not being called or returning errors.

**Solution**: Check function signature and error handling:

```tsx
// ✅ Correct: Proper async function
const loadOptions = async (
  inputValue: string,
): Promise<FieldsetSelectOption[]> => {
  if (!inputValue || inputValue.length < 2) {
    return []; // Return empty array for short inputs
  }

  try {
    const results = await searchAPI(inputValue);
    return results.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  } catch (error) {
    console.error("Search failed:", error);
    return []; // Return empty array on error
  }
};
```

#### 4. Performance Issues

**Problem**: Component re-rendering too often or slow rendering.

**Solution**: Optimize with proper memoization:

```tsx
// ✅ Good: Memoize expensive computations
const filteredOptions = useMemo(
  () =>
    options.filter(
      (option) =>
        !alreadySelected.some((selected) => selected.value === option.value),
    ),
  [options, alreadySelected],
);

const memoizedLoadOptions = useCallback(
  async (inputValue: string) => {
    // ... load options logic
  },
  [
    /* dependencies */
  ],
);
```

#### 5. Type Errors

**Problem**: TypeScript errors with option types.

**Solution**: Ensure proper typing:

```tsx
// ✅ Correct: Proper typing
const options: FieldsetSelectOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
];

const [selected, setSelected] = useState<FieldsetSelectOption | null>(null);

// ❌ Incorrect: Missing or wrong types
const options = [{ value: "us", label: "United States" }]; // No type annotation
const [selected, setSelected] = useState(null); // No type annotation
```

### Debug Helper

```tsx
function DebugFieldsetSelect({
  options,
  alreadySelectedValues,
  value,
  ...props
}: FieldsetSelectProps & { debug?: boolean }) {
  const [showDebug, setShowDebug] = useState(false);

  return (
    <div>
      <div className="mb-2">
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={showDebug}
            onChange={(e) => setShowDebug(e.target.checked)}
            className="mr-2"
          />
          Show Debug Info
        </label>
      </div>

      {showDebug && (
        <div className="mb-4 rounded border bg-gray-100 p-3 text-xs">
          <div>
            <strong>Total Options:</strong> {options.length}
          </div>
          <div>
            <strong>Already Selected:</strong>{" "}
            {alreadySelectedValues?.length || 0}
          </div>
          <div>
            <strong>Current Value:</strong> {value?.label || "None"}
          </div>
          <div>
            <strong>Available Options:</strong>{" "}
            {
              options.filter(
                (opt) =>
                  !alreadySelectedValues?.some(
                    (selected) => selected.value === opt.value,
                  ),
              ).length
            }
          </div>
        </div>
      )}

      <Fieldset.Select
        options={options}
        alreadySelectedValues={alreadySelectedValues}
        value={value}
        {...props}
      />
    </div>
  );
}
```

---

## 🎉 Conclusion

FieldsetSelect components provide powerful standalone selection functionality with excellent "Already Selected" support. They're perfect for:

- **Simple state management** scenarios
- **Custom form implementations**
- **Advanced selection logic**
- **Non-form contexts** like filters and settings

### Key Takeaways

- Use `Fieldset.Select` for static options
- Use `Fieldset.AsyncSelect` for searchable/dynamic options
- Leverage "Already Selected" feature to prevent duplicates
- Follow performance best practices with memoization
- Handle errors gracefully in async scenarios
- Maintain proper accessibility standards

For React Hook Form integration, see the [SelectFormField Guide](../form-field/SelectFormField-Guide.md).

---

_Last updated: September 8, 2025_
