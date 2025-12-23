import { cn } from "#/utils";

interface TopItemProps {
  title?: string;
  description?: string;
  additionalInformation?: string;
  image: {
    src: string;
    alt: string;
    shape: "square" | "rounded" | "string";
  };
  number?: number;
}

export default function TopItem({
  title,
  description,
  additionalInformation,
  image,
  number,
}: TopItemProps) {
  return (
    <div className="border-secondary-100 bg-secondary-50 mb-2 flex items-center justify-between gap-5 rounded-xl border p-5">
      <div className="flex w-full items-center gap-5 overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          className={cn(
            "size-[7.5rem] object-cover object-center",
            image.shape === "rounded" ? "rounded-full" : "rounded-md",
          )}
        />
        <div className="flex w-full flex-col gap-1 overflow-hidden">
          {title && (
            <p className="text-b1-600 text-secondary-800 truncate text-ellipsis">
              {title}
            </p>
          )}
          {description && (
            <p className="text-b3-400 text-secondary-500 truncate text-ellipsis">
              {description}
            </p>
          )}
          {additionalInformation && (
            <p className="text-b3-400 text-secondary-500 mt-2 truncate text-ellipsis">
              {additionalInformation}
            </p>
          )}
        </div>
      </div>

      {number && (
        <span className="text-secondary-200 me-2 text-[6.375rem] leading-0 font-semibold">
          {number}
        </span>
      )}
    </div>
  );
}
