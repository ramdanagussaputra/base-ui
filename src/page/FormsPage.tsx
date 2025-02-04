import { FormProvider, useForm } from "react-hook-form";
import {
  CheckboxFormField,
  PasswordFormField,
  Searchbar,
} from "massive-base-ui";

function FormsPage() {
  const formMethods = useForm({
    defaultValues: {
      text: null,
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

        <div className="w-1/3"></div>

        <div>
          <Searchbar />
        </div>
      </FormProvider>
    </section>
  );
}

export default FormsPage;
