import { createContext, useContext } from "react";

type AccordionContext = {
  isOpen: boolean;
  toggle: () => void;
  disabled?: boolean;
};

export const accordionContext = createContext<AccordionContext | undefined>(
  undefined,
);

export function useAccordionContext() {
  const context = useContext(accordionContext);

  if (!context) {
    throw new Error(
      "useAccordionContext must be used within an AccordionProvider",
    );
  }

  return context;
}
