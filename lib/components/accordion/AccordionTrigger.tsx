import { useAccordionContext } from "#/components/accordion/context/useAccordionContext";

interface AccordionTriggerProps {
  children?: React.ReactNode;
  asChild?: boolean;
}

export function AccordionTrigger({
  children,
  asChild,
}: Readonly<AccordionTriggerProps>) {
  const { toggle } = useAccordionContext();

  const Component = asChild ? "div" : "button";

  return <Component onClick={toggle}>{children}</Component>;
}
