import { cn } from "#/utils";

interface TopItemProps {
  title: string;
  description: string;
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
    <div className="bg-secondary-50 border-secondary-100 mb-2 flex items-center justify-between rounded-xl border p-5">
      <div className="flex items-center gap-5">
        <img
          src={image.src}
          alt={image.alt}
          className={cn(
            "size-[7.5rem]",
            image.shape === "rounded" ? "rounded-full" : "rounded-md",
          )}
        />
        <div className="flex flex-col gap-1">
          <p className="text-b1-600 text-secondary-800">{title}</p>
          <p className="text-b3-400 text-secondary-500">{description}</p>
          {additionalInformation && (
            <p className="text-b3-400 text-secondary-500 mt-2">
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
