interface SidebarHeaderProps {
  children: React.ReactNode;
}

export function SidebarHeader({ children }: Readonly<SidebarHeaderProps>) {
  return (
    <header className="sticky top-0 z-10 mb-5 flex h-[5.125rem] items-center justify-center bg-(--sidebar-header-bg-color)">
      {children}
    </header>
  );
}
