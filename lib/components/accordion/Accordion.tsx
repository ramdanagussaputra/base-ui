import { useMemo, useState, useEffect, useCallback, useContext } from "react";

import { accordionContext } from "#/components/accordion/context/useAccordionContext";
import { accordionManagerContext } from "#/components/accordion/context/useAccordionManager";
import { AccordionTrigger } from "#/components/accordion/AccordionTrigger";
import { AccordionContent } from "#/components/accordion/AccordionContent";

import { cn } from "#/utils";

interface AccordionProps {
  children: React.ReactNode | ((open: boolean) => React.ReactNode);
  defaultOpen?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string; // Optional ID for global control
  onRegister?: (
    id: string,
    control: {
      open: () => void;
      close: () => void;
      toggle: () => void;
      isOpen: boolean;
    },
  ) => (() => void) | void; // For standalone manager
}

export function Accordion({
  children,
  className,
  defaultOpen,
  disabled = false,
  id,
  onRegister,
}: Readonly<AccordionProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen || false);

  // Use context directly to make it optional
  const accordionManager = useContext(accordionManagerContext);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Register with manager if ID is provided and manager is available
  useEffect(() => {
    if (id) {
      const control = { open, close, toggle, isOpen };

      // Try manager context first
      if (accordionManager) {
        accordionManager.register(id, control);
        return () => {
          accordionManager.unregister(id);
        };
      }

      // Fallback to onRegister prop for standalone usage
      if (onRegister) {
        return onRegister(id, control);
      }
    }
  }, [accordionManager, id, onRegister, open, close, toggle, isOpen]);

  const value = useMemo(
    () => ({ isOpen, toggle, disabled }),
    [isOpen, toggle, disabled],
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
