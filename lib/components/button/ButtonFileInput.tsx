import React, { useContext, useEffect } from "react";

interface ButtonFileInputProps {
  onChange?: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
  children?: React.ReactNode;
  onInvalidFile?: (files: FileList, accept: string) => void;
}

// Context for registering the file input trigger
interface ButtonFileInputContextType {
  registerTrigger: (trigger: () => void) => void;
  unregisterTrigger: () => void;
}
export const ButtonFileInputContext =
  React.createContext<ButtonFileInputContextType | null>(null);

// Checks if a file matches the accept string (extension or MIME type)
function doesFileMatchAccept(file: File, acceptString: string): boolean {
  if (!acceptString) return true;
  const acceptedTypes = acceptString
    .split(",")
    .map((type) => type.trim().toLowerCase());
  const fileName = file.name.toLowerCase();
  const fileMimeType = file.type.toLowerCase();

  return acceptedTypes.some((acceptedType) => {
    if (acceptedType.startsWith(".")) {
      // Extension match
      return fileName.endsWith(acceptedType);
    }
    if (acceptedType.endsWith("/*")) {
      // Wildcard MIME type match
      return fileMimeType.startsWith(acceptedType.replace("/*", ""));
    }
    // Exact MIME type match
    return fileMimeType === acceptedType;
  });
}

export function ButtonFileInput({
  onChange,
  accept,
  multiple,
  className,
  children,
  onInvalidFile,
}: ButtonFileInputProps) {
  const inputElementReference = React.useRef<HTMLInputElement>(null);
  const context = useContext(ButtonFileInputContext);

  // Triggers the hidden file input when called
  const triggerFileDialog = () => inputElementReference.current?.click();

  // Register/unregister the trigger with the context
  useEffect(() => {
    if (context) {
      context.registerTrigger(triggerFileDialog);
      return () => context.unregisterTrigger();
    }
  }, [context]);

  // Handles file selection and validation
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && accept) {
      const invalidFiles = Array.from(selectedFiles).filter(
        (file) => !doesFileMatchAccept(file, accept),
      );
      if (invalidFiles.length > 0) {
        if (onInvalidFile) onInvalidFile(selectedFiles, accept);
        // Clear the input so the user can try again
        event.target.value = "";
        return;
      }
    }
    if (onChange) onChange(selectedFiles);
  };

  return (
    <>
      <input
        ref={inputElementReference}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
        className={className}
      />
      {children}
    </>
  );
}
