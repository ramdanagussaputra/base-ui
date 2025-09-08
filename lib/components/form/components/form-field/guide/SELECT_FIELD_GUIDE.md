# SelectFormField Component Guide

A comprehensive guide for using SelectFormField and AsyncSelectFormField components with React Hook Form integration and the "Already Selected" functionality.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Component Types](#component-types)
3. [Basic Usage](#basic-usage)
4. [Form Integration](#form-integration)
5. [Already Selected Feature](#already-selected-feature)
6. [Validation and Error Handling](#validation-and-error-handling)
7. [Advanced Examples](#advanced-examples)
8. [API Reference](#api-reference)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

## 🎯 Overview

The SelectFormField components provide powerful React Hook Form integration with support for:

- **Seamless form validation** with react-hook-form
- **Field-level error handling** and display
- **"Already Selected" prevention** across form fields
- **TypeScript integration** with proper form typing
- **Accessibility features** with proper form semantics

### When to Use SelectFormField Components

| Component              | Use Case                           | Best For                                 |
| ---------------------- | ---------------------------------- | ---------------------------------------- |
| `SelectFormField`      | Form selects with validation       | Standard form fields with static options |
| `AsyncSelectFormField` | Form async selects with validation | Large datasets, API-driven form fields   |

**Use SelectFormField when:**

- You're using React Hook Form for form management
- You need form validation and error handling
- You want consistent form field behavior
- You're building forms with multiple interdependent fields

## 🧩 Component Types

### Import Statements

```tsx
import { useForm, FormProvider, Controller } from "react-hook-form";
import { SelectFormField } from "#/components/form/components/form-field/SelectFormField";
import { AsyncSelectFormField } from "#/components/form/components/form-field/AsyncSelectFormField";
import { FieldsetSelectOption } from "#/components/form/model";
```

### 1. SelectFormField

For form fields with static options and React Hook Form integration.

### 2. AsyncSelectFormField

For form fields with searchable/dynamic options and React Hook Form integration.

## 🚀 Basic Usage

### Simple Form Field

```tsx
import { useForm, FormProvider } from "react-hook-form";
import { SelectFormField } from "#/components/form/components/form-field/SelectFormField";
import { FieldsetSelectOption } from "#/components/form/model";

interface FormData {
  country: FieldsetSelectOption | null;
  region: FieldsetSelectOption | null;
}

const countryOptions: FieldsetSelectOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

function BasicFormExample() {
  const methods = useForm<FormData>({
    defaultValues: {
      country: null,
      region: null,
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <SelectFormField
          control={control}
          name="country"
          label="Country"
          placeholder="Choose your country"
          options={countryOptions}
          isRequired={true}
          fieldName="Country"
        />

        <SelectFormField
          control={control}
          name="region"
          label="Region"
          placeholder="Choose your region"
          options={regionOptions}
          isRequired={false}
          fieldName="Region"
        />

        <button
          type="submit"
          className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
```

### Async Form Field

```tsx
function AsyncFormExample() {
  const methods = useForm<FormData>();
  const { control, handleSubmit } = methods;

  const loadCountryOptions = async (
    inputValue: string,
  ): Promise<FieldsetSelectOption[]> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    return countryOptions.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AsyncSelectFormField
          control={control}
          name="country"
          label="Search Countries"
          placeholder="Type to search countries..."
          defaultOptions={countryOptions}
          loadOptions={loadCountryOptions}
          isRequired={true}
          fieldName="Country"
        />
      </form>
    </FormProvider>
  );
}
```

## 📝 Form Integration

### Complete Form with Validation

```tsx
interface UserProfileForm {
  personalInfo: {
    country: FieldsetSelectOption | null;
    state: FieldsetSelectOption | null;
  };
  preferences: {
    language: FieldsetSelectOption | null;
    timezone: FieldsetSelectOption | null;
  };
}

function UserProfileFormExample() {
  const methods = useForm<UserProfileForm>({
    defaultValues: {
      personalInfo: {
        country: null,
        state: null,
      },
      preferences: {
        language: null,
        timezone: null,
      },
    },
    mode: "onChange", // Enable real-time validation
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: UserProfileForm) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Profile updated:", data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-2xl space-y-8"
      >
        {/* Personal Information Section */}
        <div className="space-y-6">
          <h3 className="text-h3-600 text-neutral-900">Personal Information</h3>

          <SelectFormField
            control={control}
            name="personalInfo.country"
            label="Country"
            placeholder="Select your country"
            options={countryOptions}
            isRequired={true}
            fieldName="Country"
            rules={{
              required: "Country is required for account verification",
            }}
          />

          <SelectFormField
            control={control}
            name="personalInfo.state"
            label="State/Province"
            placeholder="Select your state or province"
            options={stateOptions}
            isRequired={false}
            fieldName="State/Province"
          />
        </div>

        {/* Preferences Section */}
        <div className="space-y-6">
          <h3 className="text-h3-600 text-neutral-900">Preferences</h3>

          <AsyncSelectFormField
            control={control}
            name="preferences.language"
            label="Preferred Language"
            placeholder="Search for your language..."
            defaultOptions={languageOptions}
            loadOptions={loadLanguageOptions}
            isRequired={true}
            fieldName="Language"
            rules={{
              required: "Please select your preferred language",
            }}
          />

          <SelectFormField
            control={control}
            name="preferences.timezone"
            label="Timezone"
            placeholder="Select your timezone"
            options={timezoneOptions}
            isRequired={true}
            fieldName="Timezone"
            rules={{
              required: "Timezone is required for scheduling",
            }}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 rounded-md px-8 py-3 font-medium text-white transition-colors"
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
```

### Form with Watch and Conditional Logic

```tsx
function ConditionalFormExample() {
  const methods = useForm<FormData>();
  const { control, watch, handleSubmit } = methods;

  // Watch for changes to show conditional fields
  const selectedCountry = watch("country");
  const selectedRegion = watch("region");

  // Load states based on selected country
  const loadStates = async (
    inputValue: string,
  ): Promise<FieldsetSelectOption[]> => {
    if (!selectedCountry) return [];

    const response = await api.getStates(selectedCountry.value, inputValue);
    return response.data;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <SelectFormField
          control={control}
          name="country"
          label="Country"
          placeholder="Select country"
          options={countryOptions}
          isRequired={true}
          fieldName="Country"
        />

        {/* Conditional field - only show if country is selected */}
        {selectedCountry && (
          <AsyncSelectFormField
            control={control}
            name="state"
            label="State/Province"
            placeholder="Search states..."
            loadOptions={loadStates}
            isRequired={true}
            fieldName="State"
            key={selectedCountry.value} // Reset when country changes
          />
        )}

        {/* Another conditional field */}
        {selectedRegion && (
          <SelectFormField
            control={control}
            name="city"
            label="City"
            placeholder="Select city"
            options={getCitiesForRegion(selectedRegion)}
            isRequired={false}
            fieldName="City"
          />
        )}
      </form>
    </FormProvider>
  );
}
```

## ⭐ Already Selected Feature

The "Already Selected" feature in form fields prevents duplicate selections across multiple form fields with real-time updates.

### Basic Multi-Field Prevention

```tsx
interface TerritoryForm {
  primaryTerritory: FieldsetSelectOption | null;
  secondaryTerritory: FieldsetSelectOption | null;
  backupTerritory: FieldsetSelectOption | null;
}

function TerritoryFormExample() {
  const methods = useForm<TerritoryForm>({
    defaultValues: {
      primaryTerritory: null,
      secondaryTerritory: null,
      backupTerritory: null,
    },
  });

  const { control, watch, handleSubmit } = methods;

  // Watch form values for real-time already selected logic
  const primaryTerritory = watch("primaryTerritory");
  const secondaryTerritory = watch("secondaryTerritory");
  const backupTerritory = watch("backupTerritory");

  // Create dynamic arrays of already selected values
  const alreadySelectedForPrimary = [
    secondaryTerritory,
    backupTerritory,
  ].filter(Boolean) as FieldsetSelectOption[];
  const alreadySelectedForSecondary = [
    primaryTerritory,
    backupTerritory,
  ].filter(Boolean) as FieldsetSelectOption[];
  const alreadySelectedForBackup = [
    primaryTerritory,
    secondaryTerritory,
  ].filter(Boolean) as FieldsetSelectOption[];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          alreadySelectedText="(Used as secondary/backup)"
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
          alreadySelectedText="(Used as primary/backup)"
        />

        <AsyncSelectFormField
          control={control}
          name="backupTerritory"
          label="Backup Territory"
          placeholder="Search backup territory..."
          defaultOptions={territoryOptions}
          loadOptions={loadTerritoryOptions}
          isRequired={false}
          fieldName="Backup Territory"
          alreadySelectedValues={alreadySelectedForBackup}
          showAlreadySelectedText={true}
          alreadySelectedText="(Already assigned)"
        />
      </form>
    </FormProvider>
  );
}
```

### Complex Form with Grouped Prevention

```tsx
interface ComplexForm {
  locations: {
    headquarters: FieldsetSelectOption | null;
    branch: FieldsetSelectOption | null;
    warehouse: FieldsetSelectOption | null;
  };
  contacts: {
    primary: FieldsetSelectOption | null;
    secondary: FieldsetSelectOption | null;
  };
  preferences: {
    language: FieldsetSelectOption | null;
    currency: FieldsetSelectOption | null;
  };
}

function ComplexFormExample() {
  const methods = useForm<ComplexForm>();
  const { control, watch } = methods;

  // Watch all form values
  const formValues = watch();

  // Helper function to get already selected for a specific field
  const getAlreadySelectedFor = (
    section: keyof ComplexForm,
    field: string,
  ): FieldsetSelectOption[] => {
    const sectionValues = formValues[section] || {};

    return Object.entries(sectionValues)
      .filter(([key, value]) => key !== field && value !== null)
      .map(([, value]) => value) as FieldsetSelectOption[];
  };

  // Get all selected values across entire form (for cross-section prevention)
  const getAllSelected = (): FieldsetSelectOption[] => {
    return Object.values(formValues)
      .flatMap((section) => Object.values(section || {}))
      .filter(Boolean) as FieldsetSelectOption[];
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-8">
        {/* Locations Section - Prevent within section */}
        <div className="space-y-6">
          <h3 className="text-h3-600">Locations</h3>

          <SelectFormField
            control={control}
            name="locations.headquarters"
            label="Headquarters"
            placeholder="Select headquarters location"
            options={locationOptions}
            isRequired={true}
            fieldName="Headquarters"
            alreadySelectedValues={getAlreadySelectedFor(
              "locations",
              "headquarters",
            )}
            alreadySelectedText="(Used for other location)"
          />

          <SelectFormField
            control={control}
            name="locations.branch"
            label="Branch Office"
            placeholder="Select branch office location"
            options={locationOptions}
            isRequired={false}
            fieldName="Branch Office"
            alreadySelectedValues={getAlreadySelectedFor("locations", "branch")}
            alreadySelectedText="(Already assigned)"
          />
        </div>

        {/* Contacts Section - Prevent within section */}
        <div className="space-y-6">
          <h3 className="text-h3-600">Contacts</h3>

          <AsyncSelectFormField
            control={control}
            name="contacts.primary"
            label="Primary Contact"
            placeholder="Search primary contact..."
            defaultOptions={contactOptions}
            loadOptions={loadContactOptions}
            isRequired={true}
            fieldName="Primary Contact"
            alreadySelectedValues={getAlreadySelectedFor("contacts", "primary")}
            alreadySelectedText="(Used as secondary)"
          />

          <AsyncSelectFormField
            control={control}
            name="contacts.secondary"
            label="Secondary Contact"
            placeholder="Search secondary contact..."
            defaultOptions={contactOptions}
            loadOptions={loadContactOptions}
            isRequired={false}
            fieldName="Secondary Contact"
            alreadySelectedValues={getAlreadySelectedFor(
              "contacts",
              "secondary",
            )}
            alreadySelectedText="(Used as primary)"
          />
        </div>

        {/* Real-time Form State Display */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h4 className="mb-2 font-medium text-blue-900">Form State</h4>
          <pre className="overflow-x-auto text-sm text-blue-800">
            {JSON.stringify(formValues, null, 2)}
          </pre>
        </div>
      </form>
    </FormProvider>
  );
}
```

## ✅ Validation and Error Handling

### Custom Validation Rules

```tsx
function FormWithValidation() {
  const methods = useForm<FormData>({
    mode: "onChange", // Validate on change
  });

  const { control, handleSubmit, setError, clearErrors } = methods;

  // Custom validation function
  const validateCountrySelection = (value: FieldsetSelectOption | null) => {
    if (!value) return "Country is required";

    if (value.value === "restricted") {
      return "This country is not available for registration";
    }

    if (restrictedCountries.includes(value.value as string)) {
      return "Service is not available in this country";
    }

    return true;
  };

  // Async validation
  const validateCountryAsync = async (value: FieldsetSelectOption | null) => {
    if (!value) return true;

    try {
      const isValid = await api.validateCountry(value.value);
      return isValid || "This country is currently not supported";
    } catch (error) {
      return "Unable to validate country. Please try again.";
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <SelectFormField
          control={control}
          name="country"
          label="Country"
          placeholder="Select your country"
          options={countryOptions}
          isRequired={true}
          fieldName="Country"
          rules={{
            required: "Please select your country",
            validate: validateCountrySelection,
          }}
        />

        <AsyncSelectFormField
          control={control}
          name="region"
          label="Region"
          placeholder="Search regions..."
          defaultOptions={regionOptions}
          loadOptions={loadRegionOptions}
          isRequired={true}
          fieldName="Region"
          rules={{
            required: "Region is required",
            validate: validateCountryAsync,
          }}
        />

        {/* Custom error handling */}
        <div className="space-y-2">
          {methods.formState.errors.country && (
            <div className="text-sm text-red-600">
              {methods.formState.errors.country.message}
            </div>
          )}

          {methods.formState.errors.region && (
            <div className="text-sm text-red-600">
              {methods.formState.errors.region.message}
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
```

### Error Recovery and User Feedback

```tsx
function FormWithErrorRecovery() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormData>();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await api.submitForm(data);

      // Success - reset form or redirect
      reset();
      alert("Form submitted successfully!");
    } catch (error: any) {
      // Handle different error types
      if (error.status === 400) {
        setSubmitError("Please check your selections and try again.");
      } else if (error.status === 409) {
        setSubmitError("Some of your selections conflict with existing data.");
      } else {
        setSubmitError("An unexpected error occurred. Please try again later.");
      }

      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <SelectFormField
          control={control}
          name="country"
          label="Country"
          placeholder="Select country"
          options={countryOptions}
          isRequired={true}
          fieldName="Country"
          rules={{
            required: "Country is required",
          }}
        />

        {/* Global error display */}
        {submitError && (
          <div className="rounded-md border border-red-200 bg-red-50 p-4">
            <div className="flex">
              <div className="text-red-800">
                <strong>Error:</strong> {submitError}
              </div>
            </div>
          </div>
        )}

        {/* Field-level errors */}
        {Object.keys(errors).length > 0 && (
          <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
            <div className="text-yellow-800">
              <strong>Please fix the following errors:</strong>
              <ul className="mt-2 list-inside list-disc">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>
                    {error?.message || `${field} has an error`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-blue-600 px-6 py-2 text-white disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          <button
            type="button"
            onClick={() => {
              reset();
              setSubmitError(null);
            }}
            className="rounded bg-gray-600 px-6 py-2 text-white"
          >
            Reset
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
```

## 🎯 Advanced Examples

### Multi-Step Form with SelectFormFields

```tsx
function MultiStepFormExample() {
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<MultiStepFormData>({
    mode: "onChange",
  });

  const { control, watch, trigger, getValues } = methods;

  // Watch values for step validation and already selected logic
  const step1Values = watch(["personalInfo.country", "personalInfo.region"]);
  const step2Values = watch(["businessInfo.industry", "businessInfo.size"]);

  const nextStep = async () => {
    const isValid = await trigger(); // Validate current step
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <FormProvider {...methods}>
      <div className="mx-auto max-w-2xl">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-between">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center ${
                  currentStep >= step ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    currentStep >= step
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className="mx-4 h-0.5 w-full bg-gray-300" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-h2-600">Personal Information</h2>

            <SelectFormField
              control={control}
              name="personalInfo.country"
              label="Country"
              placeholder="Select your country"
              options={countryOptions}
              isRequired={true}
              fieldName="Country"
            />

            <AsyncSelectFormField
              control={control}
              name="personalInfo.region"
              label="Region"
              placeholder="Search your region..."
              defaultOptions={regionOptions}
              loadOptions={loadRegionOptions}
              isRequired={true}
              fieldName="Region"
            />
          </div>
        )}

        {/* Step 2: Business Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-h2-600">Business Information</h2>

            <SelectFormField
              control={control}
              name="businessInfo.industry"
              label="Industry"
              placeholder="Select your industry"
              options={industryOptions}
              isRequired={true}
              fieldName="Industry"
            />

            <SelectFormField
              control={control}
              name="businessInfo.size"
              label="Company Size"
              placeholder="Select company size"
              options={companySizeOptions}
              isRequired={true}
              fieldName="Company Size"
            />
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-h2-600">Review Your Information</h2>

            <div className="rounded-lg bg-gray-50 p-6">
              <pre className="text-sm">
                {JSON.stringify(getValues(), null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="rounded border border-gray-300 px-6 py-2 disabled:opacity-50"
          >
            Previous
          </button>

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="rounded bg-blue-600 px-6 py-2 text-white"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="rounded bg-green-600 px-6 py-2 text-white"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </FormProvider>
  );
}
```

## 📚 API Reference

### SelectFormField Props

```typescript
interface SelectFormFieldProps {
  // React Hook Form integration
  control: Control<any>;
  name: string;

  // Field configuration
  label: string;
  placeholder?: string;
  options: FieldsetSelectOption[];
  isRequired?: boolean;
  fieldName: string;

  // Already Selected feature
  alreadySelectedValues?: FieldsetSelectOption[];
  showAlreadySelectedText?: boolean;
  alreadySelectedText?: string;

  // Validation
  rules?: RegisterOptions;
  errorMessage?: string;

  // Behavior
  isDisabled?: boolean;
  isClearable?: boolean;

  // Styling
  selectComponentOptions?: Partial<SelectComponents>;
  className?: string;

  // Accessibility
  "aria-label"?: string;
  "aria-describedby"?: string;
}
```

### AsyncSelectFormField Props

```typescript
interface AsyncSelectFormFieldProps
  extends Omit<SelectFormFieldProps, "options"> {
  // Async loading
  defaultOptions?: FieldsetSelectOption[] | boolean;
  loadOptions: (inputValue: string) => Promise<FieldsetSelectOption[]>;

  // Performance
  cacheOptions?: boolean;
  defaultMenuIsOpen?: boolean;

  // Loading behavior
  noOptionsMessage?: (obj: { inputValue: string }) => string;
  loadingMessage?: (obj: { inputValue: string }) => string;
}
```

### Form Data Types

```typescript
// Basic form field value
type FormFieldValue = FieldsetSelectOption | null;

// For nested form structures
interface NestedFormData {
  section1: {
    field1: FormFieldValue;
    field2: FormFieldValue;
  };
  section2: {
    field3: FormFieldValue;
  };
}

// React Hook Form methods type
type FormMethods<T> = UseFormReturn<T>;
```

### Validation Rules

```typescript
interface ValidationRules {
  required?: boolean | string;
  validate?: (value: any) => boolean | string | Promise<boolean | string>;
  deps?: string | string[];
}
```

## ✅ Best Practices

### 1. Form Structure and TypeScript

```tsx
// ✅ Good: Define clear form data interfaces
interface UserRegistrationForm {
  personalInfo: {
    country: FieldsetSelectOption | null;
    region: FieldsetSelectOption | null;
  };
  preferences: {
    language: FieldsetSelectOption | null;
    notifications: FieldsetSelectOption | null;
  };
}

// ✅ Good: Use typed form methods
const methods = useForm<UserRegistrationForm>({
  defaultValues: {
    personalInfo: { country: null, region: null },
    preferences: { language: null, notifications: null },
  },
});

// ❌ Avoid: Untyped forms
const methods = useForm(); // No type safety
```

### 2. Performance Optimization

```tsx
// ✅ Good: Memoize expensive computations
const alreadySelectedValues = useMemo(
  () =>
    [otherField1, otherField2, otherField3].filter(
      Boolean,
    ) as FieldsetSelectOption[],
  [otherField1, otherField2, otherField3],
);

// ✅ Good: Memoize load functions
const loadOptions = useCallback(
  async (inputValue: string) => {
    // ... load logic
  },
  [
    /* dependencies */
  ],
);

// ❌ Avoid: Creating new functions on every render
const loadOptions = async (inputValue: string) => {
  // This creates a new function on every render
};
```

### 3. Error Handling

```tsx
// ✅ Good: Comprehensive error handling
<SelectFormField
  control={control}
  name="country"
  label="Country"
  options={countryOptions}
  isRequired={true}
  fieldName="Country"
  rules={{
    required: "Please select your country",
    validate: (value) => {
      if (!value) return "Country is required";
      if (restrictedCountries.includes(value.value)) {
        return "This country is not supported";
      }
      return true;
    },
  }}
/>

// ❌ Avoid: Missing validation
<SelectFormField
  control={control}
  name="country"
  // Missing required validation and error handling
/>
```

### 4. Accessibility

```tsx
// ✅ Good: Proper accessibility attributes
<SelectFormField
  control={control}
  name="country"
  label="Country Selection"
  placeholder="Choose your country"
  options={countryOptions}
  isRequired={true}
  fieldName="Country"
  aria-describedby="country-help"
  rules={{
    required: "Country is required for account verification",
  }}
/>

// Include help text with proper ID
<div id="country-help" className="text-sm text-gray-600">
  Select the country where you primarily operate
</div>
```

### 5. Form State Management

```tsx
// ✅ Good: Watch specific fields only when needed
const country = watch("country");
const region = watch("region");

// Use watched values efficiently
const alreadySelected = useMemo(
  () => [country, region].filter(Boolean) as FieldsetSelectOption[],
  [country, region],
);

// ❌ Avoid: Watching entire form unnecessarily
const formValues = watch(); // Causes re-renders on any change
```

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Form Validation Not Working

**Problem**: Validation rules not triggering or displaying errors.

**Solution**: Ensure proper form setup and validation configuration:

```tsx
// ✅ Correct setup
const methods = useForm<FormData>({
  mode: "onChange", // Or "onBlur", "onSubmit"
  defaultValues: {
    country: null,
  },
});

<FormProvider {...methods}>
  <SelectFormField
    control={control}
    name="country"
    rules={{
      required: "Country is required",
    }}
    // ... other props
  />
</FormProvider>;
```

#### 2. Already Selected Values Not Updating

**Problem**: Already selected options don't update when other fields change.

**Solution**: Ensure proper watching and dependencies:

```tsx
// ✅ Correct: Watch specific fields
const field1 = watch("field1");
const field2 = watch("field2");

const alreadySelectedForField3 = useMemo(
  () => [field1, field2].filter(Boolean) as FieldsetSelectOption[],
  [field1, field2], // Proper dependencies
);

// ❌ Incorrect: Missing watch or wrong dependencies
const alreadySelected = [field1, field2].filter(Boolean); // field1, field2 not reactive
```

#### 3. Async Loading Issues

**Problem**: Async select not loading options or showing errors.

**Solution**: Implement proper error handling and loading states:

```tsx
// ✅ Good: Robust async function
const loadOptions = useCallback(
  async (inputValue: string): Promise<FieldsetSelectOption[]> => {
    if (!inputValue || inputValue.length < 2) {
      return []; // Return empty for short inputs
    }

    try {
      const response = await api.searchOptions(inputValue);
      return response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
    } catch (error) {
      console.error("Failed to load options:", error);
      // Return empty array or cached options
      return defaultOptions.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()),
      );
    }
  },
  [defaultOptions],
);
```

#### 4. Type Errors with Nested Forms

**Problem**: TypeScript errors with nested form field names.

**Solution**: Use proper typing and field naming:

```tsx
// ✅ Correct: Proper nested typing
interface NestedForm {
  section: {
    field: FieldsetSelectOption | null;
  };
}

<SelectFormField
  control={control}
  name="section.field" // Properly typed path
  // ... other props
/>;

// ❌ Incorrect: Wrong typing
name = "section[field]"; // Wrong syntax
```

#### 5. Form Reset Not Working

**Problem**: Form doesn't reset to default values properly.

**Solution**: Use proper reset with default values:

```tsx
// ✅ Good: Proper reset with defaults
const defaultValues = {
  country: null,
  region: null,
};

const methods = useForm({ defaultValues });

const resetForm = () => {
  methods.reset(defaultValues); // Reset to specific values
};

// ❌ Avoid: Reset without proper defaults
const resetForm = () => {
  methods.reset(); // May not reset to intended state
};
```

### Debug Helper Component

```tsx
function DebugFormField<T>({
  name,
  control,
  ...props
}: SelectFormFieldProps & { debug?: boolean }) {
  const [showDebug, setShowDebug] = useState(false);
  const fieldValue = useWatch({ control, name });
  const fieldState = useController({ control, name }).fieldState;

  return (
    <div>
      {/* Debug toggle */}
      <label className="mb-2 flex items-center text-sm">
        <input
          type="checkbox"
          checked={showDebug}
          onChange={(e) => setShowDebug(e.target.checked)}
          className="mr-2"
        />
        Debug {name}
      </label>

      {/* Debug info */}
      {showDebug && (
        <div className="mb-4 rounded border bg-gray-100 p-3 text-xs">
          <div>
            <strong>Field:</strong> {name}
          </div>
          <div>
            <strong>Value:</strong> {JSON.stringify(fieldValue)}
          </div>
          <div>
            <strong>IsDirty:</strong> {fieldState.isDirty.toString()}
          </div>
          <div>
            <strong>IsTouched:</strong> {fieldState.isTouched.toString()}
          </div>
          <div>
            <strong>Error:</strong> {fieldState.error?.message || "None"}
          </div>
        </div>
      )}

      {/* Actual form field */}
      <SelectFormField control={control} name={name} {...props} />
    </div>
  );
}
```

---

## 🎉 Conclusion

SelectFormField components provide powerful React Hook Form integration with excellent "Already Selected" support and comprehensive validation. They're perfect for:

- **React Hook Form integration** with validation
- **Multi-field forms** with interdependent selections
- **Complex validation scenarios** with custom rules
- **User-friendly error handling** and feedback

### Key Takeaways

- Always use `FormProvider` for proper context
- Define clear TypeScript interfaces for form data
- Use `watch` for reactive already selected logic
- Implement proper validation rules and error handling
- Optimize performance with `useMemo` and `useCallback`
- Test async loading scenarios thoroughly

For standalone select components without form integration, see the [FieldsetSelect Guide](../fieldset/FieldsetSelect-Guide.md).

---

_Last updated: September 8, 2025_
