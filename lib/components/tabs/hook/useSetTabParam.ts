import useQueryParams from "#/hook/useQueryParams";

export function useSetTabParam() {
  const [searchParams, setSearchParams] = useQueryParams();

  function setTabParam({ tabName, tabId }: { tabName: string; tabId: string }) {
    const joinedTabName = tabName.toLowerCase().split(" ").join("-");

    searchParams.set(`tab-${tabId}`, joinedTabName);
    setSearchParams();
  }

  return {
    setTabParam,
  };
}
