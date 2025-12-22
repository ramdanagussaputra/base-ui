import React from "react";
import {
  SingleValue,
  components,
  ControlProps,
  OptionProps,
  MenuListProps,
  MenuProps,
} from "react-select";
import { SearchNormal1 } from "iconsax-react";
import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { FieldsetSelectOption } from "#/components/form/model";
import { cn } from "#/utils";
import Icon from "#/components/icon/Icon";

export type DiscoverSearchOption = FieldsetSelectOption & {
  secondLabel: string;
  imageUrl?: string;
  type: "song" | "songwriter";
};

interface DiscoverSearchInputProps {
  value?: SingleValue<DiscoverSearchOption>;
  onChange?: (value: SingleValue<DiscoverSearchOption>) => void;
  loadOptions?: (inputValue: string) => Promise<DiscoverSearchOption[]>;
  placeholder?: string;
  className?: string;
  defaultOptions?: DiscoverSearchOption[];
  onEnter?: () => void;
}

const CustomControl = ({
  children,
  ...props
}: ControlProps<DiscoverSearchOption, false>) => {
  return (
    <components.Control
      {...props}
      className={cn(
        props.className,
        "!border-primary-600 hover:!border-primary-600 !rounded-[6px] py-[5px] pl-[14px] !shadow-none",
      )}
    >
      <Icon
        icon={SearchNormal1}
        className="text-secondary-400 size-[1.125rem] shrink-0"
      />
      {children}
    </components.Control>
  );
};

const CustomMenu = (props: MenuProps<DiscoverSearchOption, false>) => {
  if (props.options.length === 0) {
    return null;
  }
  return <components.Menu {...props} />;
};

const CustomMenuList = (props: MenuListProps<DiscoverSearchOption, false>) => {
  const children = React.Children.toArray(props.children);

  return (
    <components.MenuList {...props} className="p-0!">
      {children.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < children.length - 1 && (
            <div className="bg-secondary-100 my-2 h-px w-full" />
          )}
        </React.Fragment>
      ))}
    </components.MenuList>
  );
};

const DiscoverSearchOptionComponent = (
  props: Readonly<OptionProps<DiscoverSearchOption, false>>,
) => {
  const { data } = props;
  const isSong = data.type === "song";
  const isSongwriter = data.type === "songwriter";

  return (
    <components.Option
      {...props}
      className="flex! items-center justify-between px-2! py-2.5!"
    >
      <div className="flex items-center gap-2">
        {isSong && data.imageUrl && (
          <img
            src={data.imageUrl}
            alt={`Artwork ${data.label}`}
            className="border-secondary-100 size-[2.25rem] rounded-md border"
          />
        )}

        {isSongwriter && (
          <div className="border-secondary-100 bg-secondary-50 flex size-[2.25rem] items-center justify-center rounded-full border">
            <span className="text-secondary-500 text-xs font-medium">
              {data.label.charAt(0)}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <span className="text-secondary-900 text-[0.8125rem] leading-[1.25rem] font-normal! hover:font-normal!">
            {data.label}
          </span>

          <span className="text-secondary-500 text-[0.625rem] leading-[0.625rem] font-normal! hover:font-normal!">
            {isSong && `Song • ${data.secondLabel}`}
            {isSongwriter && data.secondLabel}
          </span>
        </div>
      </div>
    </components.Option>
  );
};

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
          Control: CustomControl as any,
          DropdownIndicator: () => null,
          MenuList: CustomMenuList as any,
          Menu: CustomMenu as any,
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
