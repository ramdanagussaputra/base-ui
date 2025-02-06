import { cn } from "#/utils";
import { TableContentCell } from "#/components/table/TableContentCell";

interface TableContentBodyRowProps {
  children: React.ReactNode;
  className?: string;
}

export function TableContentBodyRow({
  children,
  className,
}: Readonly<TableContentBodyRowProps>) {
  return (
    <tr
      className={cn(
        "group divide-x divide-transparent duration-150",
        className,
      )}
    >
      {children}
    </tr>
  );
}

TableContentBodyRow.Cell = TableContentCell;
