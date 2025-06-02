import { cn } from "#/utils";

interface TableFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function TableFooter({
  children,
  className,
}: Readonly<TableFooterProps>) {
  return (
    <footer
      className={cn(
        "flex items-center gap-5 border-t border-(--table-border-color) px-5 py-[1.0625rem]",
        className,
      )}
    >
      {children}
    </footer>
  );
}
