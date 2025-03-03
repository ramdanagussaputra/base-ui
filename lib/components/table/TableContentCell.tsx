import { cn } from "#/utils";

interface TableContentCellProps {
  children: React.ReactNode;
  className?: string;
  isNoWrap?: boolean;
  onClick?: () => void;
}

export function TableContentCell({
  children,
  onClick,
  className,
  isNoWrap,
}: Readonly<TableContentCellProps>) {
  return (
    <td
      className={cn("bg-(--table-cell-bg-color) p-0", className)}
      onClick={onClick}
    >
      <div
        className={cn(
          "text-primary-700 h-(--table-cell-height) px-5 py-3 text-(length:--table-cell-font-size) leading-(--table-cell-line-height) font-normal text-(--table-cell-color) duration-100",
          // className,
        )}
      >
        <span
          className={cn("block w-full truncate", {
            "whitespace-nowrap": isNoWrap,
          })}
        >
          {children}
        </span>
      </div>
    </td>
  );
}
