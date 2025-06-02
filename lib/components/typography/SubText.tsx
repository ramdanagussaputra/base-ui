import { cn } from "#/utils";
import { ReactNode } from "react";

interface SubTextProps {
  readonly as?: JSX.ElementType;
  readonly className?: JSX.ElementType;
  readonly children: ReactNode;
  readonly bold?: "normal" | "semibold" | "bold";
  readonly isColorInherit?: boolean;
}

export function SubText({
  as = "span",
  children,
  className,
  bold = "normal",
  isColorInherit = false,
}: SubTextProps) {
  const Comp = as;

  const isFontWeightNormal = bold === "normal";
  const isFontWeightSemibold = bold === "semibold";
  const isFontWeightBold = bold === "bold";

  return (
    <Comp
      className={cn(
        "text-neutral-800",
        {
          "text-subtext-500": isFontWeightNormal,
          "text-subtext-600": isFontWeightSemibold,
          "text-subtext-700": isFontWeightBold,
          "text-inherit": isColorInherit,
        },
        className,
      )}
    >
      {children}
    </Comp>
  );
}
