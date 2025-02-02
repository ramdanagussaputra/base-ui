import { SidebarBody } from "#/components/sidebar/SidebarBody";
import { SidebarHeader } from "#/components/sidebar/SidebarHeader";

interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: Readonly<SidebarProps>) {
  return (
    <aside className="bg-primary-950 fixed top-0 bottom-0 w-[17.5rem] overflow-auto">
      {children}
    </aside>
  );
}

Sidebar.Header = SidebarHeader;
Sidebar.Body = SidebarBody;
