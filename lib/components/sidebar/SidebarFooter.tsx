interface SidebarFooterProps {
  children: React.ReactNode;
}

function SidebarFooter({ children }: Readonly<SidebarFooterProps>) {
  return (
    <footer className="sticky bottom-0 z-10 mt-auto flex flex-col justify-center bg-(--sidebar-footer-bg-color) pt-5 pb-[1.875rem]">
      {children}
    </footer>
  );
}

export default SidebarFooter;
