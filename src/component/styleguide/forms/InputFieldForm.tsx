import {
  PasswordFormField,
  TextAreaFormField,
  TextFormField,
  PhoneNumberFormField,
  WebsiteFormField,
} from "massive-base-ui";

import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";
import { useFormContext } from "react-hook-form";

function InputFieldForm() {
  const { control } = useFormContext();

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

        <PhoneNumberFormField
          control={control}
          label="Phone number input"
          name="phoneNumber"
          placeholder="Enter phone number"
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
      </div>
    </>
  );
}

export default InputFieldForm;
