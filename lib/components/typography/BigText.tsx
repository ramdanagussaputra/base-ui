import { cn } from "#/utils";
import { ReactNode } from "react";

interface BigTextProps {
  readonly as: JSX.ElementType;
  readonly className?: JSX.ElementType;
  readonly children: ReactNode;
}

export function BigText({ as, children, className }: BigTextProps) {
  const Comp = as || "span";

  return <Comp className={cn("text-big-text", className)}>{children}</Comp>;
}
