import { useRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Add } from "iconsax-react";

import Icon from "#/components/icon/Icon";
import { cn } from "#/utils";

interface FieldsetUploadPhotoAdditionalProps {
  accept?: string;
  placeholderIcon?: React.ReactNode;
  value?: File | null;
  onChange?: (file: File | null) => void;
  className?: string;
}

export function FieldsetUploadPhotoAdditional({
  accept,
  placeholderIcon = <Icon icon={Add} />,
  value,
  onChange,
  className,
}: Readonly<FieldsetUploadPhotoAdditionalProps>) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleOpenFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      onChange?.(file);
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
