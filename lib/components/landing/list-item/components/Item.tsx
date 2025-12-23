import Icon from "#/components/icon/Icon";
import { cn } from "#/utils";
import { Spotify } from "iconsax-react";
import TopItem from "./TopItem";
import { ComponentProps } from "react";

interface ItemProps {
  title?: string;
  description?: string;
  additionalInformation?: string;
  image: {
    src: string;
    alt: string;
    shape: "square" | "rounded" | "string";
  };
  isLastItem?: boolean;
  rightContent?: React.ReactNode | "spotify-icon";
  number?: number;
  topItem?: boolean;
}

export default function Item({
  title,
  description,
  additionalInformation,
  image,
  isLastItem,
  rightContent,
  number,
  topItem,
  className,
  ...props
}: ItemProps & ComponentProps<"div">) {
  if (topItem) {
    return (
      <TopItem
        title={title}
        description={description}
        image={image}
        number={number}
        additionalInformation={additionalInformation}
      />
    );
  }

  return (
    <div
      className={cn(
        "border-b-secondary-100 flex items-center justify-between border-b py-5",
        isLastItem && "border-b-transparent",
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center gap-2.5">
        {number && (
          <span className="text-h5-600 text-secondary-800 me-1">{number}</span>
        )}
        <img
          src={image.src}
          alt={image.alt}
          className={cn(
            "ms-2.5 size-[2.625rem] object-cover object-center",
            image.shape === "rounded" ? "rounded-full" : "rounded-lg",
          )}
        />
        <div className="flex flex-col gap-1 overflow-hidden">
          {title && (
            <p className="text-b2-500 text-secondary-800 truncate text-ellipsis">
              {title}
            </p>
          )}
          <div className="flex items-center gap-2.5">
            {description && (
              <p className="text-b3-400 text-secondary-500 truncate text-ellipsis">
                {description}
              </p>
            )}
            {additionalInformation && (
              <>
                <span className="bg-secondary-500 size-0.5 shrink-0" />
                <p className="text-b3-400 text-secondary-500 truncate text-ellipsis">
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
          className="text-success-600 me-2.5 size-[1.5rem] shrink-0"
          variant="Bold"
        />
      )}
      {rightContent && rightContent !== "spotify-icon" && rightContent}
    </div>
  );
}
