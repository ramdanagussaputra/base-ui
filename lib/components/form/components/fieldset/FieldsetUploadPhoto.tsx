import { useRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Camera, Edit2, User } from "iconsax-react";

interface FieldsetUploadPhotoProps {
  accept?: string;
  placeholderIcon?: React.ReactNode;
  value?: File | null;
  onChange?: (file: File | null) => void;
}

export function FieldsetUploadPhoto({
  accept,
  placeholderIcon = <User variant="Bold" />,
  value,
  onChange,
}: FieldsetUploadPhotoProps) {
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
      <div
        className="bg-secondary-100 relative flex size-[12.75rem] cursor-pointer items-center justify-center rounded-xl"
        onClick={handleOpenFile}
      >
        {!value && (
          <Slot className="text-secondary-0 size-[10.25rem]">
            {placeholderIcon}
          </Slot>
        )}

        {value && (
          <img
            src={value ? URL.createObjectURL(value) : undefined}
            alt="Uploaded Photo"
            className="h-full w-full rounded-xl object-cover"
            onLoad={(e) => {
              URL.revokeObjectURL((e.target as HTMLImageElement).src);
            }}
          />
        )}

        <div className="bg-secondary-950/40 absolute inset-0 z-10 hidden rounded-xl group-hover:block">
          <div className="flex h-full w-full items-center justify-center gap-2">
            {!value ? (
              <>
                <Camera
                  variant="Bold"
                  className="text-neutral-0 size-[1.5rem]"
                />
                <p className="text-neutral-0 text-b2-600">Upload Photo</p>
              </>
            ) : (
              <>
                <Edit2
                  variant="Bold"
                  className="text-neutral-0 size-[1.5rem]"
                />
                <p className="text-neutral-0 text-b2-600">Change Photo</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
