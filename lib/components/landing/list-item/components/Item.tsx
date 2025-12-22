import Icon from "#/components/icon/Icon";
import { cn } from "#/utils";
import { Spotify } from "iconsax-react";
import TopItem from "./TopItem";

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
  rightContent?: React.ReactNode | "spotify-icon";
  number?: number;
}

export default function Item({
  title,
  description,
  additionalInformation,
  image,
  isLastItem,
  rightContent,
  number,
}: ItemProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-h5-600 text-secondary-800 me-1">{number}</span>
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

        {rightContent === "spotify-icon" && (
          <Icon
            icon={Spotify}
            className="text-success-600 size-[1.5rem]"
            variant="Bold"
          />
        )}
        {rightContent && rightContent !== "spotify-icon" && rightContent}
      </div>

      {!isLastItem && <span className="bg-secondary-100 h-[1px] w-full" />}
    </>
  );
}
