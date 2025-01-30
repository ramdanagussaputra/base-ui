import { Slot } from "@radix-ui/react-slot";

import { cn } from "#/utils";
import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";

interface FieldsetIconProps {
  readonly children: React.ReactNode;
}

export function FieldsetIcon({ children }: FieldsetIconProps) {
  const { isLarge, isMedium, isSmall } = useFieldsetContext();

  return (
    <Slot
      className={cn("text-secondary-500", {
        "size-[1.125rem]": isLarge,
        "size-4": isMedium,
        "size-3.5": isSmall,
      })}
    >
      {children}
    </Slot>
  );
}
