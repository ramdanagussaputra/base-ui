import { cn } from "#/utils";
import { ArrowDown, ArrowUp } from "iconsax-react";

interface TableContentHeadSortIconProps {
  isCurrentSortBy: boolean;
  orderBy: "asc" | "desc";
  onClick: () => void;
}

export function TableContentHeadSortIcon({
  isCurrentSortBy,
  orderBy,
  onClick,
}: Readonly<TableContentHeadSortIconProps>) {
  const isAsc = orderBy === "asc";
  const isDesc = orderBy === "desc";

  return (
    <button className="ouline-none shrink-0" onClick={onClick}>
      <div
        className={cn("-mb-0.5 rounded-t-[0.25rem] px-1", {
          "bg-(--table-head-sort-icon-selected-bg-color)":
            isCurrentSortBy && isAsc,
        })}
      >
        {/* <img src={arrowUp} alt="Arrow Icon" className="size-3" /> */}

        <ArrowUp className="size-(--table-head-sort-icon-size)" />
      </div>

      <div
        className={cn("-mb-0.5 rounded-b-[0.25rem] px-1", {
          "bg-primary-100": isCurrentSortBy && isDesc,
        })}
      >
        {/* <img src={arrowUp} alt="Arrow Icon" className="size-3 rotate-180" /> */}
        <ArrowDown className="size-(--table-head-sort-icon-size)" />
      </div>
    </button>
  );
}
