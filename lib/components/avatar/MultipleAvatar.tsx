import { SingleAvatar } from "#/components/avatar/SingleAvatar";
import { getContainerWidth } from "#/components/avatar/utils/getContainerWidth";
import { cn } from "#/utils";

interface MultipleAvatarProps {
  size?: "small" | "medium" | "large";
  srcs?: { src: string; alt?: string }[];
  className?: string;
  maxDisplayCount?: number;
}

const TRANSLATE_OFFSET_PERCENTAGE = 25;

export function MultipleAvatar({
  size = "medium",
  srcs,
  maxDisplayCount = 4,
}: MultipleAvatarProps) {
  const hiddenAvatarCount = Math.max((srcs?.length || 0) - maxDisplayCount, 0);
  const showExtraAvatarNumber = hiddenAvatarCount > 0;
  const renderedSrcs = srcs?.slice(0, maxDisplayCount) || [];

  const avatarClass = {
    large: "border-(length:--multiple-avatar-border-width-large)",
    medium: "border-(length:--multiple-avatar-border-width-medium)",
    small: "border-(length:--multiple-avatar-border-width-small)",
  }[size];

  return (
    <div
      className="relative flex items-center"
      style={{
        width: getContainerWidth({
          size,
          totalData: srcs?.length || 0,
          offsetPercentage: TRANSLATE_OFFSET_PERCENTAGE,
          hiddenAvatarCount,
        }),
      }}
    >
      {renderedSrcs.map((item, index) => {
        return (
          <SingleAvatar
            key={index}
            size={size}
            src={item.src}
            alt={item.alt}
            className={cn(
              avatarClass,
              "border border-[var(--multiple-avatar-border-color)]",
            )}
            style={{
              transform: `translateX(-${TRANSLATE_OFFSET_PERCENTAGE * index}%)`,
            }}
          />
        );
      })}
      {showExtraAvatarNumber && (
        <SingleAvatar
          displayNumber={hiddenAvatarCount}
          size={size}
          className={cn(
            avatarClass,
            "border border-[var(--multiple-avatar-border-color)]",
          )}
          style={{
            transform: `translateX(-${TRANSLATE_OFFSET_PERCENTAGE * maxDisplayCount}%)`,
          }}
        />
      )}
    </div>
  );
}
