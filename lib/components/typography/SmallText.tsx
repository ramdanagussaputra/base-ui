import { cn } from "#/utils";
import { ReactNode } from "react";

interface SmallTextProps {
  readonly as: JSX.ElementType;
  readonly className?: JSX.ElementType;
  readonly bold: "medium" | "normal" | "light";
  readonly children: ReactNode;
}

export function SmallText({ as, children, className, bold }: SmallTextProps) {
  const Comp = as || "span";

  const isFontWeightMedium = bold === "medium";
  const isFontWeightNormal = bold === "normal";
  const isFontWeightLight = bold === "light";

  return (
    <Comp
      className={cn(
        "text-neutral-800 text-xxs tracking-[-0.3px]",
        {
          "font-medium": isFontWeightMedium,
          "font-normal": isFontWeightNormal,
          "font-light": isFontWeightLight,
        },
        className
      )}
    >
      {children}
    </Comp>
  );
}
