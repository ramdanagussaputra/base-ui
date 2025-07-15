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
  const remainingCount = Math.max((srcs?.length || 0) - maxDisplayCount, 0);
  const displayCount = (srcs?.length || 0) - remainingCount;

  const avatarClass = {
    large: "border-(length:--multiple-avatar-border-width-large)",
    medium: "border-(length:--multiple-avatar-border-width-medium)",
    small: "border-(length:--multiple-avatar-border-width-small)",
  }[size];

  return (
    <div
      className="relative flex items-center"
      style={{
        width: getContainerWidth(
          size,
          displayCount,
          TRANSLATE_OFFSET_PERCENTAGE,
          remainingCount,
        ),
      }}
    >
      {srcs?.slice(0, maxDisplayCount).map((item, index) => {
        return (
          <SingleAvatar
            key={index}
            size={size}
            src={item.src}
            alt={item.alt}
            className={cn(
              avatarClass,
              "box-border border border-[var(--multiple-avatar-border-color)]",
            )}
            style={{
              transform: `translateX(-${TRANSLATE_OFFSET_PERCENTAGE * index}%)`,
            }}
          />
        );
      })}
      {remainingCount > 0 && (
        <SingleAvatar
          displayNumber={remainingCount}
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
