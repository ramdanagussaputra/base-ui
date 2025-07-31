import { Slot } from "@radix-ui/react-slot";

import { useAccordionContext } from "#/components/accordion/context/useAccordionContext";

interface AccordionTriggerProps {
  readonly children?: React.ReactNode;
}

export function AccordionTrigger({ children }: AccordionTriggerProps) {
  const { isOpen, toggle } = useAccordionContext();

  return (
    <Slot onClick={toggle} aria-expanded={isOpen}>
      {children}
    </Slot>
  );
}
