import { cn } from "#/utils";
import { useListItemContext } from "../contexts/ListItemContext";

export default function PaginationIndicator() {
  const context = useListItemContext();

  const maxPage = context?.maxPage || 1;
  const currentPage = context?.currentPage || 1;

  return (
    <div className="flex items-center justify-center gap-2.5">
      {Array.from({ length: maxPage }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          className={cn(
            "h-[0.3125rem] w-[1.625rem] rounded-full",
            page === currentPage ? "bg-primary-600" : "bg-secondary-100",
          )}
        />
      ))}
    </div>
  );
}
