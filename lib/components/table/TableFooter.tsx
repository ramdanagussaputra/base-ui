interface TableFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function TableFooter({ children }: Readonly<TableFooterProps>) {
  return (
    <footer className="flex items-center gap-5 border-t border-(--table-border-color) px-5 py-[1.0625rem]">
      {children}
    </footer>
  );
}
