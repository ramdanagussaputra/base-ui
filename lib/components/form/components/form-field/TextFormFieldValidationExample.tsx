import { useForm } from "react-hook-form";
import { TextFormField } from "./TextFormField";

interface FormData {
  username: string;
  fullName: string;
  blockedExample: string;
  alphanumeric: string;
  productCode: string;
  combinedValidation: string;
}

export function TextFormFieldValidationExample() {
  const { control, handleSubmit, formState } = useForm<FormData>({
    defaultValues: {
      username: "",
      fullName: "",
      blockedExample: "",
      alphanumeric: "",
      productCode: "",
      combinedValidation: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="mx-auto max-w-md space-y-4 p-6">
      <h2 className="mb-4 text-xl font-bold">
        Text Form Field Validation Examples
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Example 1: Username with no spaces and letters only */}
        <TextFormField
          name="username"
          label="Username"
          placeholder="Enter username"
          control={control}
          isRequired
          lettersOnly
          noSpacesValidation
          lettersOnlyMessage="Username must contain only letters"
        />

        {/* Example 2: Full name with letters only (spaces allowed) */}
        <TextFormField
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          control={control}
          isRequired
          lettersOnly
          lettersOnlyMessage="Name must contain only letters and spaces"
        />

        {/* Example 3: Blocked values example */}
        <TextFormField
          name="blockedExample"
          label="Restricted Input"
          placeholder="Try typing 'admin' or 'root'"
          control={control}
          blockedValues={["admin", "root", "system", "test"]}
          blockedValuesMessage="This value is restricted. Please choose another."
        />

        {/* Example 4: Letters and numbers only (no spaces) */}
        <TextFormField
          name="alphanumeric"
          label="Alphanumeric Code"
          placeholder="Enter letters and numbers only"
          control={control}
          isRequired
          lettersAndNumbers
          lettersAndNumbersMessage="Only letters and numbers are allowed (no spaces or special characters)"
        />

        {/* Example 5: Letters and numbers with spaces allowed */}
        <TextFormField
          name="productCode"
          label="Product Description"
          placeholder="Enter product code with spaces"
          control={control}
          lettersAndNumbersWithSpaces
          lettersAndNumbersWithSpacesMessage="Only letters, numbers, and spaces are allowed"
        />

        {/* Example 6: Combination - Letters and numbers with spaces + No spaces = Letters and numbers only */}
        <TextFormField
          name="combinedValidation"
          label="Combined Validation Demo"
          placeholder="This will only allow letters and numbers (no spaces)"
          control={control}
          lettersAndNumbersWithSpaces={true}
          noSpacesValidation={true}
          lettersAndNumbersMessage="This combines to: letters and numbers only (no spaces allowed)"
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          disabled={!formState.isValid}
        >
          Submit
        </button>
      </form>

      {/* Display form errors for debugging */}
      {formState.errors && Object.keys(formState.errors).length > 0 && (
        <div className="mt-4 rounded border border-red-200 bg-red-50 p-3">
          <h3 className="font-semibold text-red-800">Form Errors:</h3>
          <pre className="mt-1 text-sm text-red-700">
            {JSON.stringify(formState.errors, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
