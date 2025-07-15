import { User } from "iconsax-react";

import { cn } from "#/utils";
import Icon from "#/components/icon/Icon";

interface SingleAvatarProps {
  size?: "small" | "medium" | "large";
  source?: string;
  alt?: string;
  className?: string;
  displayNumber?: number;
  withoutPlusPrefix?: boolean;
  style?: React.CSSProperties;
}

export function SingleAvatar({
  size = "medium",
  source,
  alt = "Avatar",
  className = "",
  displayNumber,
  withoutPlusPrefix = false,
  style = {},
}: SingleAvatarProps) {
  const isShowImage = !!source && !displayNumber;
  const isShowPlaceholder = !source && !displayNumber;
  const isShowNumber = !!displayNumber;

  const getSanitizedDisplayNumber = (value: number) => {
    if (value < 0) return 0;
    if (value > 99) return 99;
    return value;
  };

  const avatarSizeClass = {
    large: `size-[2.75rem]`,
    medium: `size-[2.25rem]`,
    small: `size-[1.5rem]`,
  }[size];

  const avatarBgClass = isShowNumber
    ? "bg-[var(--avatar-bg-color-number)]"
    : "bg-[var(--avatar-bg-color-placeholder)]";

  const avatarTextClass = {
    large: "text-b1-500",
    medium: "text-b3-500",
    small: "text-small-text-500",
  }[size];

  const iconSizeClass = {
    large: "size-[2.444375rem]",
    medium: "size-[2rem]",
    small: "size-[1.333125rem]",
  }[size];

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        avatarSizeClass,
        avatarBgClass,
        className,
      )}
      style={style}
    >
      {isShowImage && <img src={source} className="h-full w-full" alt={alt} />}
      {isShowNumber && (
        <span
          className={cn(
            "font-medium text-[var(--avatar-text-color-number)]",
            avatarTextClass,
          )}
        >
          {!withoutPlusPrefix && "+"}
          {getSanitizedDisplayNumber(displayNumber)}
        </span>
      )}
      {isShowPlaceholder && (
        <Icon
          icon={User}
          variant="Bold"
          className={cn(
            "mt-[25%] text-[var(--avatar-placeholder-icon-color)]",
            iconSizeClass,
          )}
        />
      )}
    </div>
  );
}
