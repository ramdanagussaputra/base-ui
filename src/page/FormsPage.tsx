import { FormProvider, useForm } from "react-hook-form";
import { CheckboxFormField, PasswordFormField } from "massive-base-ui";
import SelectFormField from "#/components/form/components/form-field/SelectFormField";

function FormsPage() {
  const formMethods = useForm({
    defaultValues: {
      text: null,
      select: null,
    },
    mode: "all",
  });

  return (
    <section className="flex flex-col gap-4 p-10">
      <FormProvider {...formMethods}>
        <div className="w-1/3">
          <PasswordFormField
            label="Label"
            name="text"
            placeholder="Placeholder"
            control={formMethods.control}
          />
        </div>

        <div className="w-1/3">
          <CheckboxFormField
            name="checkbox"
            label="Label"
            control={formMethods.control}
          />
        </div>

        <div className="w-1/3">
          <SelectFormField
            name="select"
            control={formMethods.control}
            label="Select"
            options={[
              { label: "Option 1", value: "option-1" },
              { label: "Option 2", value: "option-2" },
              { label: "Option 3", value: "option-3" },
            ]}
            placeholder="Placeholder"
          />
        </div>
      </FormProvider>
    </section>
  );
}

export default FormsPage;
