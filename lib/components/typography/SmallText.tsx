import { cn } from "#/utils";
import { ReactNode, JSX } from "react";

interface SmallTextProps {
  readonly as?: JSX.ElementType;
  readonly className?: JSX.ElementType;
  readonly bold?: "semibold" | "normal" | "light";
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

  const isFontWeightSemiBold = bold === "semibold";
  const isFontWeightNormal = bold === "normal";
  const isFontWeightLight = bold === "light";

  return (
    <Comp
      className={cn(
        "text-neutral-800",
        {
          "text-small-text-600": isFontWeightSemiBold,
          "text-small-text-500": isFontWeightNormal,
          "font-small-text-400": isFontWeightLight,
          "text-inherit": isColorInherit,
        },
        className,
      )}
    >
      {children}
    </Comp>
  );
}
