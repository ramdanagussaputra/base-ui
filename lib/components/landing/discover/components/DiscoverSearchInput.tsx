import React from "react";
import { SingleValue, OptionProps } from "react-select";
import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { DiscoverSearchInputProps, DiscoverSearchOption } from "./types";
import { DiscoverSearchControl } from "./DiscoverSearchControl";
import { DiscoverSearchMenu } from "./DiscoverSearchMenu";
import { DiscoverSearchMenuList } from "./DiscoverSearchMenuList";
import { DiscoverSearchOptionComponent } from "./DiscoverSearchOption";

export function DiscoverSearchInput({
  value,
  onChange,
  loadOptions,
  placeholder,
  className,
  defaultOptions = [],
  onEnter,
}: DiscoverSearchInputProps) {
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      onEnter?.();
    }
  };

  return (
    <Fieldset className={className}>
      <Fieldset.AsyncSelect
        loadOptions={loadOptions}
        value={value ?? null}
        onChange={(val) => onChange?.(val as SingleValue<DiscoverSearchOption>)}
        onKeyDown={handleKeyDown}
        placeholder={
          placeholder || "Search by song title, artist, or songwriter"
        }
        defaultOptions={defaultOptions}
        isSearchable
        openMenuOnFocus={false}
        openMenuOnClick={false}
        selectComponentOptions={{
          Control: DiscoverSearchControl as any,
          DropdownIndicator: () => null,
          MenuList: DiscoverSearchMenuList as any,
          Menu: DiscoverSearchMenu as any,
          NoOptionsMessage: () => null,
        }}
      >
        {(props) => (
          <DiscoverSearchOptionComponent
            {...(props as OptionProps<DiscoverSearchOption, false>)}
          />
        )}
      </Fieldset.AsyncSelect>
    </Fieldset>
  );
}

export type { DiscoverSearchInputProps, DiscoverSearchOption };
