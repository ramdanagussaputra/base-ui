import {
  accordionManagerContext,
  useAccordionManagerValue,
} from "#/components/accordion/context/useAccordionManager";

interface AccordionManagerProviderProps {
  children: React.ReactNode;
}

export function AccordionManagerProvider({
  children,
}: Readonly<AccordionManagerProviderProps>) {
  const value = useAccordionManagerValue();

  return (
    <accordionManagerContext.Provider value={value}>
      {children}
    </accordionManagerContext.Provider>
  );
}
