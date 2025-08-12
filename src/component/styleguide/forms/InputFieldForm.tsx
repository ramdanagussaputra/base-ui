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
  const { control, watch, setValue } = useFormContext();
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
          label="Prefix text input"
          name="requiredText"
          placeholder="Enter text"
          isRequired
          prefix="Prefix"
          suffix="Suffix"
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
          label="Auto Resizable Text Area"
          name="resizableTextArea"
          placeholder="Enter text"
          fieldSizeFollowContent
          maxHeight={270}
          minHeight={90}
          height={90}
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
          setValue={setValue}
          watch={watch}
        />
      </div>
    </>
  );
}

export default InputFieldForm;
