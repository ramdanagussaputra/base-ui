import { AddSquare } from "iconsax-react";
import { Button } from "massive-base-ui";
import { useState, useRef } from "react";
import Icon from "#/components/icon/Icon";

function ButtonsPage() {
  const [files, setFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFiles = (fileList: FileList | null) => {
    setFiles(fileList);
  };
  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setFiles(null);
    }
  };

  return (
    <>
      {/* File Upload Button Demo */}
      <section className="mb-8 border-b border-neutral-200 p-10">
        <h2 className="mb-4 text-lg font-bold">
          File Upload Button (Drag & Drop + Picker)
        </h2>
        <Button color="primary" size="medium" variant="solid">
          <Button.DropZone
            onDrop={handleFiles}
            className="flex items-center gap-2 px-4 py-2"
            dragActiveText={
              <>
                <Button.Icon>
                  <Icon icon={AddSquare} variant="Bold" />
                </Button.Icon>
                <span className="text-primary-700 font-semibold">
                  Release to upload
                </span>
              </>
            }
            dragActiveClassName="bg-primary-50"
          >
            <Button.FileInput
              ref={fileInputRef}
              onChange={handleFiles}
              accept=".csv"
              onInvalidFile={() => {
                console.log("invalid file");
              }}
            >
              <div className="flex items-center gap-2">
                <Button.Icon>
                  <Icon icon={AddSquare} variant="Outline" />
                </Button.Icon>
                <span>Drag files here or</span>
                <span className="ml-1 cursor-pointer underline">
                  click to upload
                </span>
              </div>
            </Button.FileInput>
          </Button.DropZone>
        </Button>
        <button
          type="button"
          className="mt-2 rounded bg-neutral-200 px-3 py-1 text-sm text-neutral-800 hover:bg-neutral-300"
          onClick={clearFileInput}
        >
          Clear File Input
        </button>
        {files && (
          <div className="mt-2 text-sm text-neutral-700">
            <strong>Selected files:</strong>
            <ul>
              {Array.from(files).map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
      {/* Existing button demos */}
      <section className="grid grid-cols-[min-content_min-content_min-content_min-content] items-center gap-4 p-10">
        <Button color="primary" size="large" variant="solid" isLoading>
          <Button.Icon>
            <Icon icon={AddSquare} variant="Outline" />
          </Button.Icon>
          Solid Primer
          <Button.Icon>
            <Icon icon={AddSquare} variant="Outline" />
          </Button.Icon>
        </Button>

        <Button color="primary" size="medium" variant="solid" isLoading>
          <Button.Icon>
            <Icon icon={AddSquare} variant="Outline" />
          </Button.Icon>
          Solid Primer
          <Button.Icon>
            <Icon icon={AddSquare} variant="Outline" />
          </Button.Icon>
        </Button>

        <Button color="primary" size="small" variant="solid" isLoading>
          Solid Primer
        </Button>

        <Button
          color="primary"
          size="extra-small"
          variant="solid"
          isDisabled
          isLoading
        >
          Solid Primer
        </Button>

        <Button color="secondary" size="large" variant="solid">
          Solid Secondary
        </Button>

        <Button color="secondary" size="medium" variant="solid">
          Solid Secondary
        </Button>

        <Button color="secondary" size="small" variant="solid">
          Solid Secondary
        </Button>

        <Button color="secondary" size="extra-small" variant="solid" isDisabled>
          Solid Secondary
        </Button>

        <Button color="error" size="large" variant="solid">
          Solid Error
        </Button>

        <Button color="error" size="medium" variant="solid">
          Solid Error
        </Button>

        <Button color="error" size="small" variant="solid">
          Solid Error
        </Button>

        <Button color="error" size="extra-small" variant="solid" isDisabled>
          Solid Error
        </Button>

        <Button color="primary" size="large" variant="light" isLoading>
          <Button.Icon>
            <Icon icon={AddSquare} variant="Outline" />
          </Button.Icon>
          Light Primary
        </Button>

        <Button color="primary" size="medium" variant="light">
          Light Primary
        </Button>

        <Button color="primary" size="small" variant="light">
          Light Primary
        </Button>

        <Button color="primary" size="extra-small" variant="light" isDisabled>
          Light Primary
        </Button>

        <Button color="secondary" size="large" variant="light" isLoading>
          Light Secondary
        </Button>

        <Button color="secondary" size="medium" variant="light">
          Light Secondary
        </Button>

        <Button color="secondary" size="small" variant="light">
          Light Secondary
        </Button>

        <Button color="secondary" size="extra-small" variant="light" isDisabled>
          Light Secondary
        </Button>

        <Button color="error" size="large" variant="light" isLoading>
          Light Error
        </Button>

        <Button color="error" size="medium" variant="light">
          Light Error
        </Button>

        <Button color="error" size="small" variant="light">
          Light Error
        </Button>

        <Button color="error" size="extra-small" variant="light" isDisabled>
          Light Error
        </Button>

        <Button color="primary" size="large" variant="no-background">
          NoBG Primary
        </Button>

        <Button color="primary" size="medium" variant="no-background">
          NoBG Primary
        </Button>

        <Button color="primary" size="small" variant="no-background">
          NoBG Primary
        </Button>

        <Button
          color="primary"
          size="extra-small"
          variant="no-background"
          isDisabled
        >
          NoBG Primary
        </Button>

        <Button color="secondary" size="large" variant="no-background">
          NoBG Secondary
        </Button>

        <Button color="secondary" size="medium" variant="no-background">
          NoBG Secondary
        </Button>

        <Button color="secondary" size="small" variant="no-background">
          NoBG Secondary
        </Button>

        <Button
          color="secondary"
          size="extra-small"
          variant="no-background"
          isDisabled
        >
          NoBG Secondary
        </Button>

        <Button color="error" size="large" variant="no-background">
          NoBG Error
        </Button>

        <Button color="error" size="medium" variant="no-background">
          NoBG Error
        </Button>

        <Button color="error" size="small" variant="no-background">
          NoBG Error
        </Button>

        <Button
          color="error"
          size="extra-small"
          variant="no-background"
          isDisabled
        >
          NoBG Error
        </Button>

        <Button color="primary" size="large" variant="outline">
          Outline Primary
        </Button>

        <Button color="primary" size="medium" variant="outline">
          Outline Primary
        </Button>

        <Button color="primary" size="small" variant="outline">
          Outline Primary
        </Button>

        <Button color="primary" size="extra-small" variant="outline" isDisabled>
          Outline Primary
        </Button>

        <Button color="secondary" size="large" variant="outline">
          Outline Secondary
        </Button>

        <Button color="secondary" size="medium" variant="outline">
          Outline Secondary
        </Button>

        <Button color="secondary" size="small" variant="outline">
          Outline Secondary
        </Button>

        <Button
          color="secondary"
          size="extra-small"
          variant="outline"
          isDisabled
        >
          Outline Secondary
        </Button>

        <Button color="error" size="large" variant="outline">
          Outline Error
        </Button>

        <Button color="error" size="medium" variant="outline">
          Outline Error
        </Button>

        <Button color="error" size="small" variant="outline">
          Outline Error
        </Button>

        <Button color="error" size="extra-small" variant="outline" isDisabled>
          Outline Error
        </Button>
      </section>
    </>
  );
}

export default ButtonsPage;
