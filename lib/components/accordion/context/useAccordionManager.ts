import { createContext, useContext, useRef, useCallback } from "react";

type AccordionControl = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: boolean;
};

type AccordionManagerContext = {
  register: (id: string, control: AccordionControl) => void;
  unregister: (id: string) => void;
  openAll: () => void;
  closeAll: () => void;
  toggleAll: () => void;
  openById: (id: string) => void;
  closeById: (id: string) => void;
  toggleById: (id: string) => void;
  getAccordionState: (id: string) => boolean | undefined;
  getAllStates: () => Record<string, boolean>;
};

export const accordionManagerContext = createContext<
  AccordionManagerContext | undefined
>(undefined);

export function useAccordionManager() {
  const context = useContext(accordionManagerContext);

  if (!context) {
    throw new Error(
      "useAccordionManager must be used within an AccordionManagerProvider",
    );
  }

  return context;
}

export function useAccordionManagerValue(): AccordionManagerContext {
  const accordionsRef = useRef<Map<string, AccordionControl>>(new Map());

  const register = useCallback((id: string, control: AccordionControl) => {
    accordionsRef.current.set(id, control);
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
  };
}
