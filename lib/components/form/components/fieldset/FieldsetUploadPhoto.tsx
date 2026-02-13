import { useRef, useMemo, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Camera, Edit2, User } from "iconsax-react";

import Icon from "#/components/icon/Icon";

import { cn } from "#/utils";

interface FieldsetUploadPhotoProps {
  accept?: string;
  placeholderIcon?: React.ReactNode;
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  onBeforeChange?: (file: File) => Promise<File | null>;
  maxSize?: number; // in bytes
  setError?: (message: string | null) => void;
  customMaxSizeMessage?: string;
}

export function FieldsetUploadPhoto({
  accept,
  placeholderIcon = <Icon icon={User} variant="Bold" />,
  value,
  onChange,
  onBeforeChange,
  maxSize,
  setError,
  customMaxSizeMessage = "Image is too large",
}: Readonly<FieldsetUploadPhotoProps>) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleOpenFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

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

  const renderImage = () => {
    if (!value) {
      return (
        <Slot className="text-secondary-0 size-[10.25rem]">
          {placeholderIcon}
        </Slot>
      );
    }

    return (
      <img
        src={typeof value === "string" ? value : URL.createObjectURL(value)}
        alt="Preview"
        className="h-full w-full rounded-xl object-cover"
        onLoad={(e) => {
          URL.revokeObjectURL((e.target as HTMLImageElement).src);
        }}
      />
    );
  };

  const isPng = useMemo(() => {
    if (!value) return false;

    if (value instanceof File) {
      return (
        value.type === "image/png" || value.name.toLowerCase().endsWith(".png")
      );
    }

    if (typeof value === "string") {
      return (
        value.toLowerCase().includes(".png") ||
        value.startsWith("data:image/png")
      );
    }

    return false;
  }, [value]);

  // Cleanup blob URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (value && typeof value !== "string") {
        const url = URL.createObjectURL(value);
        URL.revokeObjectURL(url);
      }
    };
  }, [value]);

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
        type="button"
        className={cn(
          "relative flex size-[12.75rem] cursor-pointer items-center justify-center rounded-xl",
          isPng
            ? "bg-neutral-0 border-secondary-100 border-1"
            : "bg-secondary-100",
        )}
        onClick={handleOpenFile}
      >
        {renderImage()}
        <div className="bg-secondary-950/40 absolute inset-0 z-10 hidden rounded-xl group-hover:block">
          <div className="flex h-full w-full items-center justify-center gap-2">
            {!value ? (
              <>
                <Icon
                  icon={Camera}
                  variant="Bold"
                  className="text-neutral-0 size-[1.5rem]"
                />
                <p className="text-neutral-0 text-b2-600">Upload Photo</p>
              </>
            ) : (
              <>
                <Icon
                  icon={Edit2}
                  variant="Bold"
                  className="text-neutral-0 size-[1.5rem]"
                />
                <p className="text-neutral-0 text-b2-600">Change Photo</p>
              </>
            )}
          </div>
        </div>
      </button>
    </div>
  );
}
