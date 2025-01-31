import { FormProvider, useForm } from "react-hook-form";
import { CheckboxFormField, PasswordFormField } from "massive-base-ui";

function Forms() {
  const formMethods = useForm({
    defaultValues: {
      text: null,
    },
    mode: "all",
  });

  return (
    <section className="flex flex-col gap-4">
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

        <div className="w-1/3"></div>
      </FormProvider>
    </section>
  );
}

export default Forms;
