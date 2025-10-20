import { useFormContext } from "react-hook-form";
import { UploadFileFormField } from "massive-base-ui";

import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

function UploadFileFieldForm() {
  const { control, watch } = useFormContext();

  console.log("Uploaded file value:", watch("file"));

  return (
    <>
      <StyleguideSubtitle>Upload File</StyleguideSubtitle>

      <div className="flex flex-col gap-5">
        <UploadFileFormField
          control={control}
          label="Upload File"
          placeholder="Example upload file placeholder"
          name="file"
          isDisabled
        />
        <UploadFileFormField
          control={control}
          label="Upload File 2"
          placeholder="Example upload file placeholder"
          name="file2"
        />
      </div>
    </>
  );
}

export default UploadFileFieldForm;
