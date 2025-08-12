import type { JSX, ReactNode } from "react";
import { cn } from "#/utils";

interface ContainerProps {
  readonly className?: string;
  readonly children?: ReactNode;
  readonly as?: JSX.ElementType;
}

function Container({ className, as, children }: ContainerProps) {
  const Comp = as || "div";
  return <Comp className={cn("px-10", className)}>{children}</Comp>;
}

export default Container; 