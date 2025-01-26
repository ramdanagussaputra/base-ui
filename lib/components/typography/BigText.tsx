import { cn } from "#/utils";
import { ReactNode } from "react";

interface BigTextProps {
  readonly as: JSX.ElementType;
  readonly className?: JSX.ElementType;
  readonly children: ReactNode;
}

export function BigText({ as, children, className }: BigTextProps) {
  const Comp = as || "span";

  return (
    <Comp
      className={cn(
        "text-neutral-800 text-[3.125rem] font-bold leading-[120%] tracking-[1px]",
        className
      )}
    >
      {children}
    </Comp>
  );
}
