import { cn } from "#/utils";
import { ReactNode } from "react";

interface HeadingProps {
  readonly as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  readonly bold?: boolean;
  readonly className?: JSX.ElementType;
  readonly children: ReactNode;
  readonly isColorInherit?: boolean;
}

export function Heading({
  as,
  children,
  className,
  bold = true,
  isColorInherit = false,
}: HeadingProps) {
  const Comp = as;

  const isHeading1 = as === "h1";
  const isHeading2 = as === "h2";
  const isHeading3 = as === "h3";
  const isHeading4 = as === "h4";
  const isHeading5 = as === "h5";
  const isHeading6 = as === "h6";

  return (
    <Comp
      className={cn(
        "text-neutral-800",
        {
          "text-h1-600": isHeading1,
          "text-h1-700": isHeading1 && bold,
          "text-h2-600": isHeading2,
          "text-h2-700": isHeading2 && bold,
          "text-h3-600": isHeading3,
          "text-h3-700": isHeading3 && bold,
          "text-h4-600": isHeading4,
          "text-h4-700": isHeading4 && bold,
          "text-h5-600": isHeading5,
          "text-h5-700": isHeading5 && bold,
          "text-h6-600": isHeading6,
          "text-h6-700": isHeading6 && bold,
          "text-inherit": isColorInherit,
        },
        className,
      )}
    >
      {children}
    </Comp>
  );
}
