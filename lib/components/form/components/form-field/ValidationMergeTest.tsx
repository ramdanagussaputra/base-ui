import { useForm } from "react-hook-form";
import { TextFormField } from "./TextFormField";

interface TestFormData {
  username: string;
  email: string;
}

export function ValidationMergeTest() {
  const { control, handleSubmit } = useForm<TestFormData>({
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = (data: TestFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="mx-auto max-w-md space-y-4 p-6">
      <h2 className="mb-4 text-xl font-bold">Validation Merge Test</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Test: Props validation + Custom validation */}
        <TextFormField
          name="username"
          label="Username"
          placeholder="Enter username (letters only, min 3 chars, not 'admin')"
          control={control}
          isRequired
          lettersOnly={true} // Props validation: letters only
          noSpacesValidation={true} // Props validation: no spaces
          lettersOnlyMessage="Username must contain only letters"
          rules={{
            // Custom validation: additional rules
            validate: (value: any) => {
              if (value === "admin") return 'Username "admin" is not allowed';
              if (value.length < 3)
                return "Username must be at least 3 characters";
              if (value.toLowerCase() === "test")
                return 'Username "test" is reserved';
              return true;
            },
            minLength: {
              value: 2,
              message: "Username is too short",
            },
          }}
        />

        {/* Test: Email validation + Custom validation */}
        <TextFormField
          name="email"
          label="Email"
          placeholder="Enter email (not from @example.com)"
          control={control}
          type="email" // Built-in email validation
          isRequired
          rules={{
            // Custom validation: block specific domains
            validate: (value: any) => {
              if (value.endsWith("@example.com")) {
                return "Emails from example.com are not allowed";
              }
              return true;
            },
          }}
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Test Submit
        </button>
      </form>

      <div className="mt-4 rounded border bg-gray-50 p-3 text-sm">
        <h3 className="font-semibold">Test Cases:</h3>
        <ul className="mt-2 space-y-1">
          <li>• Username: Try "admin", "test", "123", "abc de", "ab"</li>
          <li>• Email: Try "user@example.com", "invalid-email"</li>
        </ul>
      </div>
    </div>
  );
}
