import { useFormContext } from "react-hook-form";
import {
  UploadPhotoFormField as UploadPhotoFieldFormComponent,
  MultipleUploadPhotoFormField,
} from "massive-base-ui";

import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

function UploadPhotoFieldForm() {
  const { control, watch, setError, clearErrors, formState } = useFormContext();

  const photos = watch("photos");

  console.log({
    photos,
  });

  return (
    <>
      <StyleguideSubtitle>Upload Photo</StyleguideSubtitle>

      <div className="flex gap-5">
        <UploadPhotoFieldFormComponent
          control={control}
          name="photo"
          label="Upload Photo"
          maxSize={1 * 1024 * 1024}
          accept=".jpg,.jpeg,.png"
          setError={setError}
          clearErrors={clearErrors}
          formState={formState}
          footerElement={
            <div className="[&>span]:text-b4-400 [&>span]:text-secondary-500 flex items-center justify-between">
              <span>*Up to 1MB</span>
              <span>*.JPG, .JPEG, or .PNG</span>
            </div>
          }
        />

        <MultipleUploadPhotoFormField
          control={control}
          name="photos"
          label="Upload Multiple Photos"
          maxFiles={3}
          maxSize={1 * 1024 * 1024}
          accept=".jpg,.jpeg,.png"
          setError={setError}
          clearErrors={clearErrors}
          formState={formState}
          footerElement={
            <div className="[&>span]:text-b4-400 [&>span]:text-secondary-500 flex items-center justify-between">
              <span>*Up to 1MB</span>
              <span>*.JPG, .JPEG, or .PNG</span>
            </div>
          }
        />
      </div>
    </>
  );
}

export default UploadPhotoFieldForm;
