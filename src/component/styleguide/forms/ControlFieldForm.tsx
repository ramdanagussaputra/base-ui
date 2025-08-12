import {
  CheckboxFormField,
  RadioGroupFormField,
  ToggleFormField,
} from "massive-base-ui";
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
        <ToggleFormField
          name="toggle1"
          control={control}
          isDisabled
          size="extra-small"
        />
        <ToggleFormField name="toggle2" control={control} size="small" />
        <ToggleFormField name="toggle3" control={control} size="medium" />
        <ToggleFormField name="toggle4" control={control} size="large" />
      </div>
    </>
  );
}

export default ControlFieldForm;
