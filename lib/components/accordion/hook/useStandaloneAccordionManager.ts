import { useRef, useCallback } from "react";

type AccordionControl = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: boolean;
};

/**
 * A standalone hook for managing multiple accordions without requiring a provider.
 * This can be used as an alternative to the AccordionManagerProvider approach.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const accordionManager = useStandaloneAccordionManager();
 *
 *   const handleOpenAll = () => {
 *     accordionManager.openAll();
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleOpenAll}>Open All</button>
 *       <Accordion id="accordion-1" onRegister={accordionManager.register}>
 *         ...
 *       </Accordion>
 *       <Accordion id="accordion-2" onRegister={accordionManager.register}>
 *         ...
 *       </Accordion>
 *     </div>
 *   );
 * }
 * ```
 */
export function useStandaloneAccordionManager() {
  const accordionsRef = useRef<Map<string, AccordionControl>>(new Map());

  const register = useCallback((id: string, control: AccordionControl) => {
    accordionsRef.current.set(id, control);

    // Return unregister function for cleanup
    return () => {
      accordionsRef.current.delete(id);
    };
  }, []);

  const unregister = useCallback((id: string) => {
    accordionsRef.current.delete(id);
  }, []);

  const openAll = useCallback(() => {
    accordionsRef.current.forEach((control) => {
      control.open();
    });
  }, []);

  const closeAll = useCallback(() => {
    accordionsRef.current.forEach((control) => {
      control.close();
    });
  }, []);

  const toggleAll = useCallback(() => {
    accordionsRef.current.forEach((control) => {
      control.toggle();
    });
  }, []);

  const openById = useCallback((id: string) => {
    const control = accordionsRef.current.get(id);
    if (control) {
      control.open();
    }
  }, []);

  const closeById = useCallback((id: string) => {
    const control = accordionsRef.current.get(id);
    if (control) {
      control.close();
    }
  }, []);

  const toggleById = useCallback((id: string) => {
    const control = accordionsRef.current.get(id);
    if (control) {
      control.toggle();
    }
  }, []);

  const getAccordionState = useCallback((id: string): boolean | undefined => {
    const control = accordionsRef.current.get(id);
    return control?.isOpen;
  }, []);

  const getAllStates = useCallback((): Record<string, boolean> => {
    const states: Record<string, boolean> = {};
    accordionsRef.current.forEach((control, id) => {
      states[id] = control.isOpen;
    });
    return states;
  }, []);

  const getRegisteredIds = useCallback((): string[] => {
    return Array.from(accordionsRef.current.keys());
  }, []);

  const getRegisteredCount = useCallback((): number => {
    return accordionsRef.current.size;
  }, []);

  return {
    register,
    unregister,
    openAll,
    closeAll,
    toggleAll,
    openById,
    closeById,
    toggleById,
    getAccordionState,
    getAllStates,
    getRegisteredIds,
    getRegisteredCount,
  };
}
