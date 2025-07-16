import clsx, { ClassValue } from "clsx";
import { ValidationRule } from "react-hook-form";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-bigtext",
        "text-h1",
        "text-h1-700",
        "text-h1-600",
        "text-h2",
        "text-h2-700",
        "text-h2-600",
        "text-h3",
        "text-h3-700",
        "text-h3-600",
        "text-h4",
        "text-h4-700",
        "text-h4-600",
        "text-h5",
        "text-h5-700",
        "text-h5-600",
        "text-h6",
        "text-h6-700",
        "text-h6-600",
        "text-subtext",
        "text-subtext-700",
        "text-subtext-600",
        "text-subtext-500",
        "text-b1",
        "text-b1-600",
        "text-b1-500",
        "text-b1-400",
        "text-b2",
        "text-b2-600",
        "text-b2-500",
        "text-b2-400",
        "text-b3",
        "text-b3-600",
        "text-b3-500",
        "text-b3-400",
        "text-b4",
        "text-b4-600",
        "text-b4-500",
        "text-b4-400",
        "text-small-text",
        "text-small-text-600",
        "text-small-text-500",
        "text-small-text-400",
      ], // Add your custom text sizes
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

export function extractNumbersFromString(input: string) {
  // Replace commas with dots
  const sanitizedInput = input.replace(/,/g, ".");
  // Match numbers, including cases like "123.", "123.123"
  const matches = sanitizedInput.match(/\d+(\.\d*)?/g);

  // Return matches as an array of strings
  return matches ? matches?.join("") : "";
}

export function generateUniqueId(prefix: string = "") {
  const timestamp = Date.now().toString(36); // Convert current timestamp to base36.
  const randomPart = Math.random().toString(36).substring(2, 10); // Generate a random base36 string.

  return `${prefix}${timestamp}${randomPart}`;
}

export function capitalizeFirstWord(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export function capitalizeEveryWord(input: string) {
  return input
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function extractMaxLengthValue(value: number | ValidationRule<number>) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "object") {
    return value.value;
  }
}

export function formatToShortScale(value: number): string {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`;
  }
  return value.toString();
}

// Additional utility functions migrated from composync-fe

/**
 * Builds URL search parameters for API requests with pagination, search, and sorting
 * @param params - The parameters for building the URL search parameters
 * @returns URLSearchParams object with the appropriate parameters
 */
export function buildUrlParams(params: {
  size?: number;
  page?: number;
  searchQuery?: string;
  orderBy?: string;
  sortBy?: string;
  [key: string]: any;
} = {}): URLSearchParams {
  const {
    size = 10,
    page = 1,
    searchQuery = "",
    orderBy = "",
    sortBy = "",
    ...extraParams
  } = params;

  const searchParams = new URLSearchParams();

  if (size) {
    searchParams.append("size", size.toString());
  }

  if (page) {
    searchParams.append("page", page.toString());
  }

  if (searchQuery) {
    searchParams.append("search_key", searchQuery);
  }

  if (orderBy && sortBy) {
    searchParams.append("order_by", orderBy);
    searchParams.append("sort_by", sortBy);
  }

  // Process any additional parameters
  Object.entries(extraParams).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      // Convert arrays and objects to JSON strings
      const paramValue = typeof value === "object" ? JSON.stringify(value) : value.toString();

      searchParams.append(key, paramValue);
    }
  });

  return searchParams;
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Creates a standardized empty list response
 */
export function createEmptyListResponse<T>(): { data: T[] } {
  return { data: [] };
}

/**
 * Generates a query key for list data
 */
export function createListQueryKey(baseKey: string, params: Record<string, any> = []): string[] {
  return [baseKey, ...Object.entries(params).flat()];
}

/**
 * Creates a pagination object
 */
export function createPagination(currentPage: number, totalPages: number, siblingCount: number = 1) {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const totalPageNumbers = siblingCount + 5; // siblingCount + firstPage + lastPage + currentPage + 2*DOTS

  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, "...", totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);

    return [firstPageIndex, "...", ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);

    return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
  }

  return [];
}

/**
 * Finds a dropdown option by its value
 */
export function findSelectOptionByValue<T>(options: Array<{ value: T; label: string }>, value: T) {
  return options.find((option) => option.value === value) || null;
}

/**
 * Formats a number as currency
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a date string
 */
export function formatDate(date: string | Date, format: string = "MMM dd, yyyy"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  if (format === "MMM dd, yyyy") {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[dateObj.getMonth()]} ${dateObj.getDate().toString().padStart(2, '0')}, ${dateObj.getFullYear()}`;
  }
  
  return dateObj.toLocaleDateString();
}

/**
 * Formats a file size in bytes to a human-readable string
 */
export function formatFileSize(bytes: number): string {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Formats a user's name
 */
export function formatName(firstName?: string, lastName?: string): string {
  if (!firstName && !lastName) return "";
  if (!firstName) return lastName || "";
  if (!lastName) return firstName;
  return `${firstName} ${lastName}`;
}

/**
 * Returns a CSS class for a table column's width
 */
export function getColumnWidthClass(width: number): string {
  return `w-${width}`;
}

/**
 * Calculates the total height of a list of elements
 */
export function getElementsTotalHeight(elements: React.RefObject<HTMLElement | null>[]): number {
  return elements.reduce((total, elementRef) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      return total + rect.height;
    }
    return total;
  }, 0);
}

/**
 * Checks if an object is empty
 */
export function isObjectEmpty(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Maps data to options for a dropdown
 */
export function mapSelectOption<T>(data: T[], valueKey: keyof T, labelKey: keyof T) {
  return data.map((item) => ({
    value: item[valueKey],
    label: String(item[labelKey]),
  }));
}

/**
 * Maps a boolean to a "Yes" or "No" string
 */
export function mapYesNo(value: boolean): string {
  return value ? "Yes" : "No";
}
