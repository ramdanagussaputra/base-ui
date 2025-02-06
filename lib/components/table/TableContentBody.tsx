import { cn } from "#/utils";
import { TableContentBodyRow } from "#/components/table/TableContentBodyRow";

interface TableContentBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function TableContentBody({
  children,
  className,
}: Readonly<TableContentBodyProps>) {
  return <tbody className={cn("relative z-0", className)}>{children}</tbody>;
}

TableContentBody.Row = TableContentBodyRow;
