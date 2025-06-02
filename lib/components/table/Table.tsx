// WARNING: you should install and use react-table to use this component

import { TableHeader } from "#/components/table/TableHeader";
import { TableContent } from "#/components/table/TableContent";
import { TableFooter } from "#/components/table/TableFooter";

import { cn } from "#/utils";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className }: Readonly<TableProps>) {
  return (
    <div
      className={cn(
        "overflow-clip rounded-(--table-border-radius) border border-(--table-border-color)",
        className,
      )}
    >
      {children}
    </div>
  );
}

Table.Header = TableHeader;
Table.Content = TableContent;
Table.Footer = TableFooter;
