import { User } from "iconsax-react";

import { cn } from "#/utils";
import Icon from "#/components/icon/Icon";

interface SingleAvatarProps {
  size?: "small" | "medium" | "large";
  src?: string;
  alt?: string;
  className?: string;
  displayNumber?: number;
  withoutPlusPrefix?: boolean;
  style?: React.CSSProperties;
}

export function SingleAvatar({
  size = "medium",
  src,
  alt = "Avatar",
  className = "",
  displayNumber,
  withoutPlusPrefix = false,
  style = {},
}: SingleAvatarProps) {
  const showImage = src && !displayNumber;
  const showPlaceholder = !src && !displayNumber;
  const showNumber = displayNumber !== undefined && displayNumber !== null;

  const sanitizedDisplayNumber = (value: number) => {
    if (value < 0) return 0;
    if (value > 99) return 99;
    return value;
  };

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        {
          "size-[2.75rem]": size === "large",
          "size-[2.25rem]": size === "medium",
          "size-[1.5rem]": size === "small",
        },
        {
          "bg-[var(--avatar-bg-color-placeholder)]":
            showImage || showPlaceholder,
          "bg-[var(--avatar-bg-color-number)]": showNumber,
        },
        className,
      )}
      style={style}
    >
      {showImage && <img src={src} className="h-full w-full" alt={alt} />}
      {showNumber && (
        <span
          className={cn("font-medium text-[var(--avatar-text-color-number)]", {
            "text-b1-500": size === "large",
            "text-b3-500": size === "medium",
            "text-small-text-500": size === "small",
          })}
        >
          {!withoutPlusPrefix && "+"}
          {sanitizedDisplayNumber(displayNumber)}
        </span>
      )}
      {showPlaceholder && (
        <Icon
          icon={User}
          variant="Bold"
          className={cn(
            "mt-[25%] text-[var(--avatar-placeholder-icon-color)]",
            {
              "size-[2.444375rem]": size === "large",
              "size-[2rem]": size === "medium",
              "size-[1.333125rem]": size === "small",
            },
          )}
        />
      )}
    </div>
  );
}
