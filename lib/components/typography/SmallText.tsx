import { cn } from "#/utils";
import { ReactNode } from "react";

interface SmallTextProps {
  readonly as?: JSX.ElementType;
  readonly className?: JSX.ElementType;
  readonly bold?: "medium" | "normal" | "light";
  readonly children: ReactNode;
  readonly isColorInherit?: boolean;
}

export function SmallText({
  as = "span",
  bold = "normal",
  isColorInherit = false,
  children,
  className,
}: SmallTextProps) {
  const Comp = as;

  const isFontWeightMedium = bold === "medium";
  const isFontWeightNormal = bold === "normal";
  const isFontWeightLight = bold === "light";

  return (
    <Comp
      className={cn(
        "text-[0.625rem] tracking-[-0.3px] text-neutral-800",
        {
          "font-medium": isFontWeightMedium,
          "font-normal": isFontWeightNormal,
          "font-light": isFontWeightLight,
          "text-inherit": isColorInherit,
        },
        className,
      )}
    >
      {children}
    </Comp>
  );
}
