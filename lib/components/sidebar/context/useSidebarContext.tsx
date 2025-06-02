import { createContext, useContext } from "react";

type SidebarContext = {
  currentPath: string;
  navigateFunction: (path: string) => void;
};

export const sidebarContext = createContext<SidebarContext | undefined>(
  undefined,
);

export function useSidebarContext() {
  const context = useContext(sidebarContext);

  if (!context) {
    throw new Error("useSidebarContext must be used within a FieldsetProvider");
  }

  return context;
}
