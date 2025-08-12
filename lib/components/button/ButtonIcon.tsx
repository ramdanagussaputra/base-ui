import { Slot } from "@radix-ui/react-slot";

import { useButtonContext } from "#/components/button/context/useButtonContext";
import { cn } from "#/utils";

export function ButtonIcon({ 
  children, 
  className 
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
}) {
  const { isExtraSmall, isSmall, isMedium, isLarge, isLoading } =
    useButtonContext();

  return (
    <Slot
      className={cn(
        "text-inherit",
        {
          "size-5": isLarge,
          "size-[1.125rem]": isMedium,
          "size-3.5": isSmall,
          "size-3": isExtraSmall,
          hidden: isLoading,
        },
        className,
      )}
    >
      {children}
    </Slot>
  );
}
