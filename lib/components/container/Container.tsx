import { forwardRef, type JSX, ReactNode } from "react";
import { cn } from "#/utils";

interface ContainerProps {
  readonly className?: string;
  readonly children?: ReactNode;
  readonly as?: JSX.ElementType;
}

const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ className, as, children }, ref) => {
    const Comp = as || "div";
    return (
      <Comp ref={ref} className={cn("px-10", className)}>
        {children}
      </Comp>
    );
  },
);

Container.displayName = "Container";

export default Container;
