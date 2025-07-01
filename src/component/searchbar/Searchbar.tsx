import { SearchNormal1 } from "iconsax-react";
import { Fieldset } from "massive-base-ui";
import Icon from "#/components/icon/Icon";

import useQueryParams from "#/hook/useQueryParams";

function Searchbar() {
  const [searchParams, setSearchParams] = useQueryParams();
  const searchValue = searchParams.get("search");

  function handleChange(value: string) {
    searchParams.set("search", value);

    if (value === "") {
      searchParams.delete("search");
    }

    setSearchParams();
  }
  return (
    <Fieldset>
      <Fieldset.TextInput
        placeholder="Search"
        type="text"
        value={searchValue ?? ""}
        onChange={handleChange}
        isReverseIcon
      >
        <Fieldset.Icon>
          <Icon icon={SearchNormal1} />
        </Fieldset.Icon>
      </Fieldset.TextInput>
    </Fieldset>
  );
}

export default Searchbar;
