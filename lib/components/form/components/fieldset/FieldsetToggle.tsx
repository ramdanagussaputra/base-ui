import { Switch } from "@headlessui/react";

import { cn } from "#/utils";

import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";

interface FieldsetToggleProps {
  value?: boolean;
  onChange?: (state: boolean) => void;
}

export function FieldsetToggle({
  value,
  onChange,
}: Readonly<FieldsetToggleProps>) {
  const { isExtraSmall, isSmall, isMedium, isLarge, isDisabled } =
    useFieldsetContext();

  return (
    <Switch
      checked={value}
      onChange={onChange}
      disabled={isDisabled}
      className={cn(
        "group relative flex cursor-pointer items-center rounded-full ease-in-out focus:not-data-focus:outline-none data-checked:bg-white/10 data-focus:outline data-focus:outline-white",
        value ? "bg-primary-600" : "bg-secondary-100",
        isExtraSmall && "h-[1.75rem] w-[2.98958rem] p-[0.21875rem]",
        isSmall && "h-[2rem] w-[3.41667rem] p-[0.25rem]",
        isMedium && "h-[2.5rem] w-[4.27083rem] p-[0.3125rem]",
        isLarge && "h-[3rem] w-[5.125rem] p-[0.375rem]",
        isDisabled && "cursor-not-allowed opacity-20",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inline-block rounded-full bg-[#FFFFFF] shadow-lg ring-0 transition duration-200 ease-in-out",
          isExtraSmall &&
            "size-[1.3125rem] group-data-checked:translate-x-[1.2375rem]",
          isSmall &&
            "size-[1.5rem] group-data-checked:translate-x-[1.41667rem]",
          isMedium &&
            "size-[1.875rem] group-data-checked:translate-x-[1.77083rem]",
          isLarge &&
            "size-[2.25rem] group-data-checked:translate-x-[2.14583rem]",
        )}
      />
    </Switch>
  );
}
