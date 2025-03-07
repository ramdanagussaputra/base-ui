import { cn } from "#/utils";
import { TableContentHeadSortIcon } from "#/components/table/TableContentHeadSortIcon";

interface TableContentHeadProps {
  children: React.ReactNode;
  className?: string;
  innerContainerClassName?: string;
  widthClassName?: string;
}

export function TableContentHead({
  children,
  className,
  innerContainerClassName,
  widthClassName,
}: Readonly<TableContentHeadProps>) {
  return (
    <th
      className={cn(
        "bg-(--table-head-bg-color) text-(length:--table-cell-font-size) leading-(--table-cell-line-height) font-bold text-(--table-cell-color)",
        className,
        widthClassName,
      )}
    >
      <div
        className={cn(
          "flex h-(--table-cell-height) items-center justify-between gap-[0.625rem] border-x border-y border-(--table-head-border-color) px-5 py-3 duration-100 first:border-l-0",
          innerContainerClassName,
          widthClassName,
        )}
      >
        {children}
      </div>
    </th>
  );
}

TableContentHead.SortIcon = TableContentHeadSortIcon;
