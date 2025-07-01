import { useFormContext } from "react-hook-form";

import { UploadPhotoFormField as UploadPhotoFieldFormComponent } from "#/components/form/components/form-field/UploadPhotoFormField";
import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

function UploadPhotoFieldForm() {
  const { control } = useFormContext();

  return (
    <>
      <StyleguideSubtitle>Upload Photo</StyleguideSubtitle>

      <div className="space-y-3">
        <UploadPhotoFieldFormComponent
          control={control}
          name="photo"
          label="Upload Photo"
        />
      </div>
    </>
  );
}

export default UploadPhotoFieldForm;
