import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  CheckboxFormField,
  Fieldset,
  PasswordFormField,
} from "massive-base-ui";

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
          <Controller
            name="select"
            control={formMethods.control}
            render={({ field }) => (
              <Fieldset isError>
                <Fieldset.Label type="required">
                  Select component
                </Fieldset.Label>

                <Fieldset.Select
                  options={[
                    {
                      label: "Option 1",
                      value: "option-1",
                    },
                    {
                      label: "Option 2",
                      value: "option-2",
                    },
                  ]}
                  placeholder="Placeholder"
                  value={field.value}
                  onChange={field.onChange}
                />
              </Fieldset>
            )}
          />
        </div>
      </FormProvider>
    </section>
  );
}

export default FormsPage;
