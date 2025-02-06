import { TableContentHeaderRow } from "#/components/table/TableContentHeaderRow";

import { cn } from "#/utils";

interface TableContentHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function TableContentHeader({
  children,
  className,
}: Readonly<TableContentHeaderProps>) {
  return (
    <thead
      className={cn("sticky top-0 z-10 bg-(--table-head-bg-color)", className)}
    >
      {children}
    </thead>
  );
}

TableContentHeader.Row = TableContentHeaderRow;
