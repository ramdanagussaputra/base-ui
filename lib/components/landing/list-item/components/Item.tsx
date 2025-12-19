import { cn } from "#/utils";

interface ItemProps {
  title: string;
  description: string;
  additionalInformation?: string;
  image: {
    src: string;
    alt: string;
    shape: "square" | "rounded" | "string";
  };
  isLastItem?: boolean;
}

export default function Item({
  title,
  description,
  additionalInformation,
  image,
  isLastItem,
}: ItemProps) {
  return (
    <>
      <div className="flex items-center gap-2.5">
        <img
          src={image.src}
          alt={image.alt}
          className={cn(
            "size-[2.625rem]",
            image.shape === "rounded" ? "rounded-full" : "rounded-lg",
          )}
        />
        <div className="flex flex-col gap-1">
          <p className="text-b2-500 text-secondary-800">{title}</p>
          <div className="flex items-center gap-2.5">
            <p className="text-b3-400 text-secondary-500">{description}</p>
            {additionalInformation && (
              <>
                <span className="bg-secondary-500 size-0.5" />
                <p className="text-b3-400 text-secondary-500">
                  {additionalInformation}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {!isLastItem && <span className="bg-secondary-100 h-[1px] w-full" />}
    </>
  );
}
