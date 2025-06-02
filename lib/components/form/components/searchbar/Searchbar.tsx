import { SearchNormal1 } from "iconsax-react";
import { Fieldset } from "#/components";

import useQueryParams from "#/hook/useQueryParams";

interface SearchbarProps {
  paramsName?: string;
  placeholder?: string;
}

export function Searchbar({
  paramsName = "search",
  placeholder = "Search",
}: Readonly<SearchbarProps>) {
  const [searchParams, setSearchParams] = useQueryParams();
  const searchValue = searchParams.get(paramsName);

  function handleChange(value: string) {
    searchParams.set(paramsName, value);

    if (value === "") {
      searchParams.delete(paramsName);
    }

    setSearchParams();
  }
  return (
    <Fieldset>
      <Fieldset.TextInput
        placeholder={placeholder}
        type="text"
        value={searchValue ?? ""}
        onChange={handleChange}
        isReverseIcon
      >
        <Fieldset.Icon>
          <SearchNormal1 />
        </Fieldset.Icon>
      </Fieldset.TextInput>
    </Fieldset>
  );
}
