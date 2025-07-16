import { useCallback } from "react";
import { useSearchParams } from "react-router";

export function useParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParam = useCallback(
    (paramName: string, value: string) => {
      setSearchParams((prev) => {
        const newSearchParams = new URLSearchParams(prev);
        newSearchParams.set(paramName, value);
        return newSearchParams;
      });
    },
    [setSearchParams],
  );

  const setParams = useCallback(
    (paramEntries: { paramName: string; value: string }[]) => {
      setSearchParams((prev) => {
        const newSearchParams = new URLSearchParams(prev);
        paramEntries.forEach(({ paramName, value }) => {
          newSearchParams.set(paramName, value);
        });
        return newSearchParams;
      });
    },
    [setSearchParams],
  );

  const removeParam = useCallback(
    (paramName: string) => {
      setSearchParams((prev) => {
        const newSearchParams = new URLSearchParams(prev);
        newSearchParams.delete(paramName);
        return newSearchParams;
      });
    },
    [setSearchParams],
  );

  const removeParams = useCallback(
    (params: string[]) => {
      setSearchParams((prev) => {
        const newSearchParams = new URLSearchParams(prev);
        params.forEach((param) => {
          newSearchParams.delete(param);
        });
        return newSearchParams;
      });
    },
    [setSearchParams],
  );

  const getParam = useCallback(
    (paramName: string) => {
      return searchParams.get(paramName) ?? null;
    },
    [searchParams],
  );

  return {
    setParams,
    getParam,
    setParam,
    removeParam,
    removeParams,
  };
}