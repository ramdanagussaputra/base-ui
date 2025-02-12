import { FormProvider, useForm } from "react-hook-form";
import {
  CheckboxFormField,
  PasswordFormField,
  SelectFormField,
} from "massive-base-ui";

import { RadioGroupFormField } from "#/components/form/components/form-field/RadioGroupFormField";

function FormsPage() {
  const formMethods = useForm({
    defaultValues: {
      text: null,
      select: null,
      radio: null,
    },
    mode: "all",
  });

  const radioWatch = formMethods.watch("radio");

  console.log("radioWatch", radioWatch);

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

        <div className="h-fit w-1/3">
          <RadioGroupFormField
            label="Radio Group"
            control={formMethods.control}
            name="radio"
            fields={[
              { label: "Radio 1", value: "radio1" },
              { label: "Radio 2", value: "radio2" },
              { label: "Radio 3", value: "radio3" },
            ]}
          />
        </div>
      </FormProvider>
    </section>
  );
}

export default FormsPage;
