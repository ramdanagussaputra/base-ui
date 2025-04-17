import { CheckboxFormField, RadioGroupFormField } from "massive-base-ui";
import { useFormContext } from "react-hook-form";

import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

function ControlFieldForm() {
  const { control } = useFormContext();
  return (
    <>
      <StyleguideSubtitle>Control</StyleguideSubtitle>

      <div className="space-y-3">
        <CheckboxFormField control={control} name="checkbox" label="Checkbox" />

        <RadioGroupFormField
          label="Radio Group"
          control={control}
          name="radio"
          isVertical
          fields={[
            { label: "Radio 1", value: "radio1" },
            { label: "Radio 2", value: "radio2" },
            { label: "Radio 3", value: "radio3" },
          ]}
        />
      </div>
    </>
  );
}

export default ControlFieldForm;
