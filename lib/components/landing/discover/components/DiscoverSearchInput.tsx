import React from "react";
import { SingleValue, OptionProps, InputActionMeta } from "react-select";
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
  onInputChange,
}: DiscoverSearchInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  const handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
    if (
      actionMeta.action === "input-blur" ||
      actionMeta.action === "menu-close"
    ) {
      return;
    }
    setInputValue(newValue);
    onInputChange?.(newValue);
    if (newValue) {
      setMenuIsOpen(true);
    } else {
      setMenuIsOpen(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      onEnter?.(inputValue);
      setMenuIsOpen(false);
    }

    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <Fieldset className={className}>
      <Fieldset.AsyncSelect
        loadOptions={loadOptions}
        value={value ?? null}
        onChange={(val) => {
          const selectedOption = val as SingleValue<DiscoverSearchOption>;
          if (selectedOption?.onClick) {
            selectedOption.onClick();
          }
          onChange?.(selectedOption);
        }}
        onKeyDown={handleKeyDown}
        onInputChange={handleInputChange}
        inputValue={inputValue}
        menuIsOpen={menuIsOpen}
        onBlur={() => setMenuIsOpen(false)}
        placeholder={
          placeholder || "Search by song title, artist, or songwriter"
        }
        defaultOptions={defaultOptions}
        isSearchable
        menuPlacement="auto"
        openMenuOnFocus={false}
        openMenuOnClick={false}
        onFocus={() => {
          onChange?.(null);
          if (inputValue) {
            setMenuIsOpen(true);
          }
        }}
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
