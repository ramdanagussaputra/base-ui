interface MainLayoutProps {
  renderSidebar: () => React.ReactNode;
  renderHeader: () => React.ReactNode;
  children: React.ReactNode;
}

export function MainLayout({
  renderHeader,
  renderSidebar,
  children,
}: Readonly<MainLayoutProps>) {
  return (
    <div className="overflow-x-clip">
      {renderSidebar()}

      <div className="relative ml-(--sidebar-width)">
        <div className="sticky top-0 right-0 left-(--sidebar-width) z-10">
          {renderHeader()}
        </div>
        {children}
      </div>
    </div>
  );
}
