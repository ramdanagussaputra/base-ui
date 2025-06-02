import { cn } from "#/utils";
import { TableContentHead } from "#/components/table/TableContentHead";

interface TableContentHeaderRowProps {
  children: React.ReactNode;
  className?: string;
}

export function TableContentHeaderRow({
  children,
  className,
}: Readonly<TableContentHeaderRowProps>) {
  return <tr className={cn(className)}>{children}</tr>;
}

TableContentHeaderRow.Head = TableContentHead;
