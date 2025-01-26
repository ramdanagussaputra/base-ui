import { cn } from "#/utils";
import { ReactNode } from "react";

interface SubTextProps {
  readonly as: JSX.ElementType;
  readonly className?: JSX.ElementType;
  readonly children: ReactNode;
  readonly bold: "medium" | "bold" | "semibold";
}

export function SubText({ as, children, className, bold }: SubTextProps) {
  const Comp = as || "span";

  const isFontWeightMedium = bold === "medium";
  const isFontWeightBold = bold === "bold";
  const isFontWeightSemibold = bold === "semibold";

  return (
    <Comp
      className={cn(
        "text-xl leading-[140%] tracking-[0.4px] text-neutral-800",
        {
          "font-medium": isFontWeightMedium,
          "font-bold": isFontWeightBold,
          "font-semibold": isFontWeightSemibold,
        },
        className
      )}
    >
      {children}
    </Comp>
  );
}
