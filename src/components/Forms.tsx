import { FormProvider, useForm } from "react-hook-form";
import { Fieldset, PasswordFormField } from "massive-base-ui";

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
          />
        </div>

        <div className="w-1/3">
          <Fieldset>
            <div className="flex items-center gap-2">
              <Fieldset.Checkbox />
              <Fieldset.Label>Label</Fieldset.Label>
            </div>
          </Fieldset>
        </div>
      </FormProvider>
    </section>
  );
}

export default Forms;
