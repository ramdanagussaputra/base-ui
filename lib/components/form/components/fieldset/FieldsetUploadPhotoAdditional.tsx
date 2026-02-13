import { useRef, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Add } from "iconsax-react";

import Icon from "#/components/icon/Icon";
import { cn } from "#/utils";

interface FieldsetUploadPhotoAdditionalProps {
  accept?: string;
  placeholderIcon?: React.ReactNode;
  value?: File | null;
  onChange?: (file: File | null) => void;
  onBeforeChange?: (file: File) => Promise<File | null>;
  className?: string;
  maxSize?: number; // in bytes
  setError?: (message: string | null) => void;
  customMaxSizeMessage?: string;
}

export function FieldsetUploadPhotoAdditional({
  accept,
  placeholderIcon = <Icon icon={Add} />,
  value,
  onChange,
  onBeforeChange,
  className,
  maxSize,
  setError,
  customMaxSizeMessage = "One or more images are too large",
}: Readonly<FieldsetUploadPhotoAdditionalProps>) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleOpenFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  // Cleanup blob URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (value && typeof value !== "string") {
        const url = URL.createObjectURL(value);
        URL.revokeObjectURL(url);
      }
    };
  }, [value]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0] || null;

    if (!selectedFile) {
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
      return;
    }

    // Validate file size first, regardless of onBeforeChange
    if (maxSize && selectedFile.size > maxSize) {
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
      setError?.(customMaxSizeMessage);
      return;
    }

    // Process file through onBeforeChange if provided
    if (onBeforeChange) {
      const processedFile = await onBeforeChange(selectedFile);
      if (processedFile) {
        setError?.(null);
      }
      onChange?.(processedFile);
    } else {
      setError?.(null);
      onChange?.(selectedFile);
    }

    // Reset input
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  return (
    <div className="group w-fit">
      <input
        type="file"
        ref={inputFileRef}
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        className={cn(
          "bg-secondary-0 border-secondary-200 hover:bg-secondary-50 relative flex size-[6rem] cursor-pointer items-center justify-center rounded-xl border border-dashed",
          className,
        )}
        type="button"
        onClick={handleOpenFile}
      >
        {!value && (
          <Slot className="text-secondary-300 size-[41.67%]">
            {placeholderIcon}
          </Slot>
        )}

        {value && (
          <img
            src={typeof value === "string" ? value : URL.createObjectURL(value)}
            alt="file additional"
            className="h-full w-full rounded-xl object-cover"
            onLoad={(e) => {
              URL.revokeObjectURL((e.target as HTMLImageElement).src);
            }}
          />
        )}
      </button>
    </div>
  );
}
