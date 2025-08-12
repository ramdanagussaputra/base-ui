import { useAccordionContext } from "#/components/accordion/context/useAccordionContext";
import { cn } from "#/utils";

interface AccordionTriggerProps {
  children?: React.ReactNode;
  asChild?: boolean;
}

export function AccordionTrigger({
  children,
  asChild,
}: Readonly<AccordionTriggerProps>) {
  const { toggle, disabled } = useAccordionContext();

  const Component = asChild ? "div" : "button";

  return (
    <Component
      onClick={toggle}
      disabled={disabled}
      className={cn(disabled && "pointer-events-none")}
    >
      {children}
    </Component>
  );
}
