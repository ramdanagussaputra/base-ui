import { Checkbox } from "@headlessui/react";
import checkboxArrow from "#/components/form/asset/checkbox-arrow.svg";
import { cn } from "#/utils";

interface FieldsetCheckboxProps {
  readonly value?: string | number | boolean;
  readonly onChange?: (checked: boolean) => void;
  readonly checked?: boolean;
}

export function FieldsetCheckbox({
  checked,
  onChange,
  value,
}: FieldsetCheckboxProps) {
  return (
    <Checkbox
      value={value}
      checked={checked}
      onChange={onChange}
      className={cn(
        "group bg-neutral-0 ring-secondary-100 data-checked:bg-primary-600 data-checked:ring-primary-600 flex size-[1.125rem] cursor-pointer items-center justify-center rounded-[4px] p-1 ring-1 ring-inset",
        { "cursor-default": !!onChange },
      )}
    >
      <img
        src={checkboxArrow}
        alt="check icon"
        className="group-data-checked:block"
      />
    </Checkbox>
  );
}
