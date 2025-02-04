import { SearchNormal } from "iconsax-react";
import { useSearchParams } from "react-router";

import { Fieldset } from "#/components/form";

interface SearchbarProps {
  searchParamName?: string;
  placeholder?: string;
  size?: "large" | "medium" | "small";
  isIconReverse?: boolean;
}

export function Searchbar({
  searchParamName = "search",
  placeholder = "Search",
  size = "medium",
  isIconReverse = true,
}: Readonly<SearchbarProps>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get(searchParamName);

  function handleChange(event: React.ChangeEvent<HTMLInputElement> | string) {
    if (typeof event === "string") return;

    searchParams.set(searchParamName, event.target.value);

    if (event.target.value === "") {
      searchParams.delete(searchParamName);
    }

    setSearchParams(searchParams);
  }

  return (
    <Fieldset className="" size={size}>
      <Fieldset.TextInput
        placeholder={placeholder}
        onChange={handleChange}
        type="text"
        value={searchValue ?? ""}
        isReverseIcon={isIconReverse}
      >
        <Fieldset.Icon>
          <SearchNormal />
        </Fieldset.Icon>
      </Fieldset.TextInput>
    </Fieldset>
  );
}
