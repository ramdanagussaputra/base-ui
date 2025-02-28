import { createContext, useContext, useState } from "react";

type QueryParamsContext = {
  queryParams: URLSearchParams;
  setQueryParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
};

export const queryParamsContext = createContext<QueryParamsContext | undefined>(
  {
    queryParams: new URLSearchParams(),
    setQueryParams: () => {},
  },
);

export function useQueryParamsContext() {
  const context = useContext(queryParamsContext);

  if (!context) {
    throw new Error(
      "useQueryParamsContext must be used within a QueryParamsProvider",
    );
  }

  return context;
}

interface QueryParamsProviderProps {
  children: React.ReactNode;
}

export function QueryParamsProvider({
  children,
}: Readonly<QueryParamsProviderProps>) {
  const [queryParams, setQueryParams] = useState<URLSearchParams>(
    () => new URLSearchParams(window.location.search),
  );

  return (
    <queryParamsContext.Provider value={{ queryParams, setQueryParams }}>
      {children}
    </queryParamsContext.Provider>
  );
}
