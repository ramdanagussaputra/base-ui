import {
  DurationFormField,
  PasswordFormField,
  TextAreaFormField,
  TextFormField,
  WebsiteFormField,
} from "massive-base-ui";

import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";
import { useFormContext } from "react-hook-form";

function InputFieldForm() {
  const { control, watch } = useFormContext();
  const duration = watch("duration") || "";
  console.log(duration, "duration");

  return (
    <>
      <StyleguideSubtitle>Input Field</StyleguideSubtitle>

      <div className="space-y-3">
        <TextFormField
          control={control}
          label="Required text input"
          name="requiredText"
          placeholder="Enter text"
          isRequired
        />

        <TextFormField
          control={control}
          label="Optional text input"
          name="optionalText"
          placeholder="Enter text"
        />

        <TextFormField
          control={control}
          label="Number input"
          name="number"
          placeholder="Enter text"
          type="number"
        />

        <TextFormField
          control={control}
          label="Email input"
          name="email"
          placeholder="Enter text"
          type="email"
        />

        <PasswordFormField
          control={control}
          label="Password input"
          name="password"
          placeholder="Enter text"
        />

        <WebsiteFormField
          control={control}
          label="Website input"
          name="website"
          placeholder="Enter website URL"
        />

        <TextAreaFormField
          control={control}
          label="Text Area"
          name="textArea"
          placeholder="Enter text"
        />

        <DurationFormField
          control={control}
          label="Duration input"
          name="duration"
          placeholder="Enter duration"
        />
      </div>
    </>
  );
}

export default InputFieldForm;
