import { FormProvider, useForm } from "react-hook-form";
import {
  CheckboxFormField,
  PasswordFormField,
  SelectFormField,
  TextAreaFormField,
  TextFormField,
} from "massive-base-ui";

import { RadioGroupFormField } from "#/components/form/components/form-field/RadioGroupFormField";

function FormsPage() {
  const formMethods = useForm({
    defaultValues: {
      password: null,
      select: null,
      multi_select: null,
      radio: null,
      email: null,
      text: null,
      number: null,
      textarea: null,
    },
    mode: "all",
  });

  return (
    <section className="flex flex-col gap-4 p-10">
      <FormProvider {...formMethods}>
        <div className="w-1/3">
          <TextFormField
            label="Text"
            name="text"
            placeholder="Enter text"
            control={formMethods.control}
            isRequired
          />
        </div>

        <div className="w-1/3">
          <TextFormField
            label="Number"
            name="number"
            placeholder="Enter number"
            control={formMethods.control}
            type="number"
            isDisabled
          />
        </div>

        <div className="w-1/3">
          <TextFormField
            label="Email"
            name="email"
            placeholder="Enter email"
            type="email"
            control={formMethods.control}
          />
        </div>

        <div className="w-1/3">
          <PasswordFormField
            label="Password"
            name="password"
            placeholder="Enter password"
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
            isDisabled
            label="Select"
            options={[
              { label: "Option 1", value: "option-1" },
              { label: "Option 2", value: "option-2" },
              { label: "Option 3", value: "option-3" },
            ]}
            placeholder="Placeholder"
          />
        </div>

        <div className="w-1/3">
          <SelectFormField
            name="multi_select"
            control={formMethods.control}
            label="Multi Select"
            options={[
              { label: "Option 1", value: "option-1" },
              { label: "Option 2", value: "option-2" },
              { label: "Option 3", value: "option-3" },
            ]}
            placeholder="Placeholder"
            isMultiSelect
          />
        </div>

        <div className="h-fit w-1/3">
          <RadioGroupFormField
            label="Radio Group"
            control={formMethods.control}
            name="radio"
            isVertical
            fields={[
              { label: "Radio 1", value: "radio1" },
              { label: "Radio 2", value: "radio2" },
              { label: "Radio 3", value: "radio3" },
            ]}
          />
        </div>

        <div className="h-fit w-1/3">
          <TextAreaFormField
            control={formMethods.control}
            name="textarea"
            label="Textarea"
            placeholder="Placeholder"
          />
        </div>
      </FormProvider>
    </section>
  );
}

export default FormsPage;
