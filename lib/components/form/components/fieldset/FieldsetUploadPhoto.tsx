import { useRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Camera, Edit2, User } from "iconsax-react";

import Icon from "#/components/icon/Icon";

interface FieldsetUploadPhotoProps {
  accept?: string;
  placeholderIcon?: React.ReactNode;
  value?: File | null;
  onChange?: (file: File | null) => void;
}

export function FieldsetUploadPhoto({
  accept,
  placeholderIcon = <Icon icon={User} variant="Bold" />,
  value,
  onChange,
}: Readonly<FieldsetUploadPhotoProps>) {
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
        className="bg-secondary-100 relative flex size-[12.75rem] cursor-pointer items-center justify-center rounded-xl"
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
