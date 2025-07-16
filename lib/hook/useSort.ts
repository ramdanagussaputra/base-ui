import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";

interface UseSortOptions {
  defaultSortBy?: string;
}

interface UseSortReturn {
  currentSortBy: string;
  currentOrderBy: string;
  setSort: (sortBy: string) => void;
}

export const useSort = (options?: UseSortOptions): UseSortReturn => {
  const { defaultSortBy = "code" } = options || {};
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.has("sort-by")) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("sort-by", defaultSortBy);
        newParams.set("order-by", "asc");
        return newParams;
      });
    }
  }, [defaultSortBy, searchParams, setSearchParams]);

  const currentSortBy = useMemo(() => {
    return searchParams.get("sort-by") ?? defaultSortBy;
  }, [searchParams, defaultSortBy]);

  const currentOrderBy = useMemo(() => {
    const order = searchParams.get("order-by")?.toLowerCase();
    return order === "desc" ? "desc" : "asc";
  }, [searchParams]);

  const setSort = useCallback(
    (sortBy: string) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (sortBy) {
          const newOrderBy = currentSortBy === sortBy && currentOrderBy === "asc" ? "desc" : "asc";
          newParams.set("sort-by", sortBy);
          newParams.set("order-by", newOrderBy);
        } else {
          newParams.set("sort-by", defaultSortBy);
          newParams.set("order-by", "asc");
        }
        return newParams;
      });
    },
    [currentSortBy, currentOrderBy, setSearchParams, defaultSortBy],
  );

  return {
    currentSortBy,
    currentOrderBy,
    setSort,
  };
}; 