import { useMemo } from "react";

import { SidebarBody } from "#/components/sidebar/SidebarBody";
import { SidebarHeader } from "#/components/sidebar/SidebarHeader";

import { sidebarContext } from "#/components/sidebar/context/useSidebarContext";
import SidebarFooter from "#/components/sidebar/SidebarFooter";

interface SidebarProps {
  children: React.ReactNode;
  currentPath: string;
  navigateFunction: (path: string) => void;
}

export function Sidebar({
  children,
  currentPath,
  navigateFunction,
}: Readonly<SidebarProps>) {
  const contextValue = useMemo(
    () => ({
      currentPath,
      navigateFunction,
    }),
    [currentPath, navigateFunction],
  );

  return (
    <sidebarContext.Provider value={contextValue}>
      <aside className="fixed top-0 bottom-0 w-(--sidebar-width) overflow-auto bg-(--sidebar-bg-color)">
        {children}
      </aside>
    </sidebarContext.Provider>
  );
}

Sidebar.Header = SidebarHeader;
Sidebar.Body = SidebarBody;
Sidebar.Footer = SidebarFooter;
