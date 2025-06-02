import { cn } from "#/utils";
import { ReactNode } from "react";

interface BodyProps {
  readonly as: JSX.ElementType;
  readonly className?: JSX.ElementType;
  readonly children: ReactNode;
  readonly bold?: "semibold" | "normal" | "light";
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

  const isFontWeightSemiBold = bold === "semibold";
  const isFontWeightNormal = bold === "normal";
  const isFontWeightLight = bold === "light";

  const isLevel1 = level === "1";
  const isLevel2 = level === "2";
  const isLevel3 = level === "3";
  const isLevel4 = level === "4";

  return (
    <Comp
      className={cn(
        "text-neutral-800",
        {
          "text-b1-600": isLevel1 && isFontWeightSemiBold,
          "text-b1-500": isLevel1 && isFontWeightNormal,
          "text-b1-400": isLevel1 && isFontWeightLight,
          "text-b2-600": isLevel2 && isFontWeightSemiBold,
          "text-b2-500": isLevel2 && isFontWeightNormal,
          "text-b2-400": isLevel2 && isFontWeightLight,
          "text-b3-600": isLevel3 && isFontWeightSemiBold,
          "text-b3-500": isLevel3 && isFontWeightNormal,
          "text-b3-400": isLevel3 && isFontWeightLight,
          "text-b4-600": isLevel4 && isFontWeightSemiBold,
          "text-b4-500": isLevel4 && isFontWeightNormal,
          "text-b4-400": isLevel4 && isFontWeightLight,
          "text-inherit": isColorInherit,
        },
        className,
      )}
    >
      {children}
    </Comp>
  );
}
