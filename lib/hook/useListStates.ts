import { UseQueryResult } from "@tanstack/react-query";

/**
 * Represents the generic list data structure with pagination
 */
interface ListData<T> {
  data: T[];
}

/**
 * Represents the return type of useListStates hook
 */
interface ListStates {
  /** Whether the list has any items */
  hasList: boolean;
  /** Whether to show the footer (true if list has items or is loading) */
  isShowFooter: boolean;
  /** Whether the list is empty (true if not loading and either no items or error) */
  isEmpty: boolean;
  /** Whether there is an active search query */
  isSearch: boolean;
}

/**
 * Hook to manage common list states and pagination
 * @param queryResult - The query result from useQuery
 * @param searchQuery - The current search query
 * @returns ListStates object containing common list states and pagination fallback
 */
export function useListStates<T>(
  queryResult: UseQueryResult<ListData<T>>,
  searchQuery: string | null,
): ListStates {
  const { data, isLoading, isError } = queryResult;

  const hasList = Boolean(data?.data?.length);
  const isShowFooter = hasList || isLoading;
  const isEmpty = !isLoading && (!hasList || isError);
  const isSearch = !!searchQuery;

  return {
    hasList,
    isShowFooter,
    isEmpty,
    isSearch,
  };
} 