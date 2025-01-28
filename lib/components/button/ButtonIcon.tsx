import { Slot } from "@radix-ui/react-slot";
import { useButtonContext } from "#/components/button/context/useButtonContext";
import { cn } from "#/utils";

interface ButtonIconProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function ButtonIcon({ children, className }: ButtonIconProps) {
  const {
    isExtraSmall,
    isSmall,
    isMedium,
    isLarge,
    // isPrimary,
    // isSecondary,
    // isError,
    // isSolid,
    // isLight,
    // isNoBackground,
    // isOutline,
    // isLink,
  } = useButtonContext();

  return (
    <Slot
      className={cn(
        "text-inherit",
        {
          "size-5": isLarge,
          "size-[1.125rem]": isMedium,
          "size-3.5": isSmall,
          "size-3": isExtraSmall,
        },
        className,
      )}
    >
      {children}
    </Slot>
  );
}
