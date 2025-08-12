import { useAccordionContext } from "#/components/accordion/context/useAccordionContext";

interface AccordionProps {
  children: React.ReactNode;
}

export function AccordionContent({ children }: Readonly<AccordionProps>) {
  const { isOpen } = useAccordionContext();

  return <>{isOpen && children}</>;
}
