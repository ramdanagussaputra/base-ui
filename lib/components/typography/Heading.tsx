import { cn } from "#/utils";
import { ReactNode } from "react";

interface HeadingProps {
  readonly as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  readonly bold?: boolean;
  readonly className?: JSX.ElementType;
  readonly children: ReactNode;
}

export function Heading({
  as,
  children,
  className,
  bold = true,
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
        "text-[3.125rem] leading-[120%] tracking-[1px] font-semibold text-neutral-800",
        {
          "font-bold": bold,
          "text-[2.75rem] leading-[120%] font-semibold": isHeading1,
          "tracking-[0.055rem]": isHeading1 && bold,
          "text-[2.25rem] leading-[140%] tracking-[0.045rem]": isHeading2,
          "tracking-[0.045rem]": isHeading2 && bold,
          "text-[2rem] leading-[140%] tracking-[0.04rem]": isHeading3,
          "tracking-[0.04rem]": isHeading3 && bold,
          "text-[1.875rem] leading-[140%] tracking-[0.0375rem]": isHeading4,
          "tracking-[0.0375rem]": isHeading4 && bold,
          "text-[1.5rem] leading-[140%]": isHeading5,
          "tracking-[0.03rem]": isHeading5 && bold,
          "text-[1.375rem] leading-[140%]": isHeading6,
          "tracking-[0.0275rem]": isHeading6 && bold,
        },
        className
      )}
    >
      {children}
    </Comp>
  );
}
