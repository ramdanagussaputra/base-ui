import { cn } from "#/utils";
import { ReactNode } from "react";

interface BodyProps {
  readonly as: JSX.ElementType;
  readonly className?: JSX.ElementType;
  readonly children: ReactNode;
  readonly bold?: "medium" | "normal" | "semibold";
  readonly level: "1" | "2" | "3" | "4";
  readonly isColorInherit?: boolean;
}

export function Body({
  as = "p",
  bold = "normal",
  level = "1",
  isColorInherit = false,
  children,
  className,
}: BodyProps) {
  const Comp = as;

  const isFontWeightMedium = bold === "medium";
  const isFontWeightNormal = bold === "normal";
  const isFontWeightSemibold = bold === "semibold";

  const isLevel1 = level === "1";
  const isLevel2 = level === "2";
  const isLevel3 = level === "3";
  const isLevel4 = level === "4";

  return (
    <Comp
      className={cn(
        "leading-[140%] text-neutral-800",
        {
          "font-medium": isFontWeightMedium,
          "font-normal": isFontWeightNormal,
          "font-semibold": isFontWeightSemibold,
          "text-lg": isLevel1,
          "text-base": isLevel2,
          "text-sm": isLevel3,
          "text-xs": isLevel4,
          "text-inherit": isColorInherit,
        },
        className,
      )}
    >
      {children}
    </Comp>
  );
}
