import { useEffect, useMemo, useCallback } from "react";
import { useParams } from "./useParams";

// Define allowed page size values
const ALLOWED_PAGE_SIZES = [10, 50, 100];
// Maximum safe page number to prevent JavaScript number precision issues
const MAX_SAFE_PAGE = Number.MAX_SAFE_INTEGER > 10000 ? 10000 : Number.MAX_SAFE_INTEGER;

interface PaginationHookParams {
  defaultPageSize?: number;
  defaultPage?: number;
  rowCount?: number;
  pageToShow?: number;
  defaultParamName?: string;
}

export function usePagination({
  defaultPageSize = 10,
  defaultPage = 1,
  defaultParamName,
  rowCount,
}: PaginationHookParams = {}) {
  const { setParam, getParam, setParams } = useParams();

  // Memoize parameter name to prevent recalculation
  const paramName = useMemo(
    () => (defaultParamName ? `${defaultParamName}-page` : "page"),
    [defaultParamName],
  );

  // Memoize these values to prevent unnecessary recalculations
  const pageSizeFromUrl = useMemo(
    () => Number(getParam(`${paramName}-size`) ?? defaultPageSize),
    [getParam, paramName, defaultPageSize],
  );

  // Get and validate page from URL
  const pageFromUrl = useMemo(() => {
    const pageParam = getParam(`${paramName}`);

    // Safety check for unreasonably large numbers
    if (pageParam && pageParam.length > 8) {
      return defaultPage;
    }

    const page = Number(pageParam);

    // Check if page is a valid positive integer and within safe range
    if (isNaN(page) || page < 1 || !Number.isInteger(page) || page > MAX_SAFE_PAGE) {
      return defaultPage;
    }

    return page;
  }, [getParam, paramName, defaultPage]);

  const currentPageSize = useMemo(
    () => (ALLOWED_PAGE_SIZES.includes(pageSizeFromUrl) ? pageSizeFromUrl : defaultPageSize),
    [pageSizeFromUrl, defaultPageSize],
  );

  // Calculate max page if we have rowCount
  const maxPage = useMemo(() => {
    if (!rowCount || typeof rowCount !== "number" || rowCount <= 0) {
      return null;
    }

    // Ensure rowCount is a reasonable number
    const safeRowCount = Math.min(rowCount, Number.MAX_SAFE_INTEGER);
    return Math.max(1, Math.min(MAX_SAFE_PAGE, Math.ceil(safeRowCount / currentPageSize)));
  }, [rowCount, currentPageSize]);

  // Validate page against max page (if available)
  const currentPage = useMemo(() => {
    if (maxPage && pageFromUrl > maxPage) {
      return maxPage;
    }
    return pageFromUrl;
  }, [pageFromUrl, maxPage]);

  // Initialize page parameter if needed and fix invalid page values
  useEffect(() => {
    const pageInUrl = getParam(`${paramName}`);

    // Safety check for unreasonably large numbers
    if (pageInUrl && pageInUrl.length > 8) {
      setParam(`${paramName}`, defaultPage.toString());
      return;
    }

    const pageNum = Number(pageInUrl);

    // Set default page if not in URL
    if (!pageInUrl) {
      setParam(`${paramName}`, defaultPage.toString());
      return;
    }

    // Fix invalid page values in URL
    if (isNaN(pageNum) || pageNum < 1 || !Number.isInteger(pageNum) || pageNum > MAX_SAFE_PAGE) {
      setParam(`${paramName}`, defaultPage.toString());
      return;
    }

    // Check against max page if available
    if (maxPage && pageNum > maxPage) {
      setParam(`${paramName}`, maxPage.toString());
    }
  }, [getParam, defaultPage, paramName, setParam, maxPage]);

  // Initialize or validate page size parameter
  useEffect(() => {
    if (
      !ALLOWED_PAGE_SIZES.includes(pageSizeFromUrl) ||
      (defaultPageSize === currentPageSize && !getParam(`${paramName}-size`))
    ) {
      setParam(`${paramName}-size`, defaultPageSize.toString());
    }
  }, [pageSizeFromUrl, defaultPageSize, paramName, setParam, getParam, currentPageSize]);

  // Memoize functions to prevent unnecessary re-renders
  const setPage = useCallback(
    (page: number) => {
      // Validate page number
      if (page < 1 || !Number.isInteger(page) || page > MAX_SAFE_PAGE) {
        page = defaultPage;
      }

      // Check against max page if available
      if (maxPage && page > maxPage) {
        page = maxPage;
      }

      setParam(`${paramName}`, page.toString());
    },
    [paramName, setParam, defaultPage, maxPage],
  );

  const setPageSize = useCallback(
    (pageSize: number) => {
      // Ensure the page size being set is one of the allowed values
      const validPageSize = ALLOWED_PAGE_SIZES.includes(pageSize) ? pageSize : defaultPageSize;

      setParams([
        { paramName: `${paramName}-size`, value: validPageSize.toString() },
        { paramName: `${paramName}`, value: "1" },
      ]);
    },
    [paramName, defaultPageSize, setParams],
  );

  const nextPage = useCallback(() => {
    // Don't increment if we're at the max page
    if (maxPage && currentPage >= maxPage) {
      return;
    }
    setParam(`${paramName}`, (currentPage + 1).toString());
  }, [currentPage, paramName, setParam, maxPage]);

  const previousPage = useCallback(() => {
    // Don't decrement if we're at page 1
    if (currentPage <= 1) {
      return;
    }
    setParam(`${paramName}`, (currentPage - 1).toString());
  }, [currentPage, paramName, setParam]);

  return {
    currentPage,
    currentPageSize,
    setPage,
    setPageSize,
    nextPage,
    previousPage,
    maxPage,
  };
} 