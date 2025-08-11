import { useQueryParamsContext } from "#/context/useQueryParamsContext";
import { useEffect, useCallback } from "react";

function useQueryParams(): [URLSearchParams, () => void] {
  const { queryParams, setQueryParams } = useQueryParamsContext();

  const setSearchParams = useCallback(() => {
    const newSearchParams = new URLSearchParams(queryParams);
    const newSearch = newSearchParams.toString();
    window.history.replaceState({}, "", "?" + newSearch); // Update the URL without reloading
    setQueryParams(newSearchParams);
  }, [queryParams, setQueryParams]);

  useEffect(() => {
    const handlePopState = () => {
      setQueryParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [setQueryParams]);

  return [queryParams, setSearchParams];
}

export default useQueryParams;
