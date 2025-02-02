interface SidebarHeaderProps {
  children: React.ReactNode;
}

export function SidebarHeader({ children }: Readonly<SidebarHeaderProps>) {
  return (
    <header className="sticky top-0 mb-5 flex h-[5.125rem] items-center justify-center">
      {children}
    </header>
  );
}
