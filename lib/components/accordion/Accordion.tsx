import { useMemo, useState } from "react";

import { accordionContext } from "#/components/accordion/context/useAccordionContext";
import { AccordionTrigger } from "#/components/accordion/AccordionTrigger";
import { AccordionContent } from "#/components/accordion/AccordionContent";

import { cn } from "#/utils";

interface AccordionProps {
  children: React.ReactNode | ((open: boolean) => React.ReactNode);
  defaultOpen?: boolean;
  className?: string;
  disabled?: boolean;
}

export function Accordion({
  children,
  className,
  defaultOpen,
  disabled = false,
}: Readonly<AccordionProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen || false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const value = useMemo(
    () => ({ isOpen, toggle, disabled }),
    [isOpen, disabled],
  );

  return (
    <accordionContext.Provider value={value}>
      <div className={cn("flex flex-col", className)}>
        {typeof children === "function" ? children(isOpen) : children}
      </div>
    </accordionContext.Provider>
  );
}

Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
