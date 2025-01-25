import { cn } from "#/utils";
import { ReactNode } from "react";

interface BigTextProps {
  readonly as?: JSX.ElementType;
  readonly className?: JSX.ElementType;
  readonly bold?: boolean;
  readonly children: ReactNode;
}

export function BigText({
  as,
  children,
  className,
  bold = false,
}: BigTextProps) {
  const Comp = as || "p";

  return (
    <Comp
      className={cn(
        "text-[3.125rem] leading-[120%] tracking-[1px] font-medium",
        { "font-bold": bold },
        className
      )}
    >
      {children}
    </Comp>
  );
}
