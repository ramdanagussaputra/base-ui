import { ArrowDown2, SearchNormal1 } from "iconsax-react";
import { useState, useCallback, useMemo } from "react";
import Icon from "#/components/icon/Icon";

import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";
import { FieldsetSelectOption } from "#/components/form/model";

import { cn } from "#/utils";
import { useOutsideClick } from "#/hook/useOutsideClick";

interface FieldsetSelectPrefixProps {
  value: string;
  onChange: (value: string | number | boolean) => void;
  options: FieldsetSelectOption[];
  children: React.ReactNode;
}

export function FieldsetSelectPrefix({
  value,
  children,
  options,
  onChange,
}: Readonly<FieldsetSelectPrefixProps>) {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { isLarge, isMedium, isSmall, isDisabled } = useFieldsetContext();

  const ref = useOutsideClick({
    handler: useCallback(() => {
      setIsOpen(false);
    }, []),
  });

  const handleToggle = useCallback(() => {
    if (isDisabled) return;
    setIsOpen((prev) => !prev);
  }, [isDisabled]);

  const handleOptionClick = useCallback(
    (optionValue: string | number | boolean) => {
      setIsOpen(false);
      onChange(optionValue);
    },
    [onChange],
  );

  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;

    const searchTerm = searchValue.toLowerCase();
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(searchTerm) ||
        option.value.toString().toLowerCase().includes(searchTerm),
    );
  }, [options, searchValue]);

  return (
    <div className="relative flex items-center" ref={ref}>
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "flex items-center gap-2 rounded-md rounded-e-none border px-[0.75em]",
          {
            "h-(--fieldset-height-large) gap-(--fieldset-container-gap-large)":
              isLarge,
            "h-(--fieldset-height-medium) gap-(--fieldset-container-gap-medium)":
              isMedium,
            "h-(--fieldset-height-small) gap-(--fieldset-container-gap-small)":
              isSmall,
          },
          {
            "bg-secondary-50 border-secondary-200": !isOpen,
            "border-secondary-300 bg-secondary-100": isOpen,
            "border-secondary-100 [&>span]:text-secondary-400! [&>svg]:text-secondary-400!":
              isDisabled,
          },
        )}
      >
        <span className="text-b3-400 text-secondary-800 min-w-[2rem]">
          {value}
        </span>
        <Icon
          icon={ArrowDown2}
          className={cn(
            "text-secondary-500",
            {
              "size-[1.125rem]": isLarge,
              "size-4": isMedium,
              "size-[0.875rem]": isSmall,
            },
            {
              "rotate-180": isOpen,
            },
          )}
        />
      </button>

      {children}

      <div
        className={cn(
          "border-secondary-100 bg-neutral-0 absolute top-full left-0 z-10 mt-1 flex w-full flex-col gap-2 rounded-lg border p-3",
          {
            hidden: !isOpen,
          },
        )}
      >
        <Fieldset.TextInput
          placeholder="Search"
          isReverseIcon
          value={searchValue}
          onChange={setSearchValue}
          type="text"
        >
          <Fieldset.Icon>
            <Icon icon={SearchNormal1} />
          </Fieldset.Icon>
        </Fieldset.TextInput>

        <div className="max-h-[11.25rem] overflow-x-hidden overflow-y-auto">
          {filteredOptions?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option.value)}
              className="hover:bg-secondary-50 flex h-9 w-full items-center justify-between rounded-md px-5"
            >
              <span className="text-secondary-800 text-b3-500 truncate">
                {option.label}
              </span>
              <span className="text-secondary-800 text-b3-500">
                {option.value}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
