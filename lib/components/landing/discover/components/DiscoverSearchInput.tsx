import React from "react";
import { SearchNormal1, Add } from "iconsax-react";
import { cn } from "#/utils";

interface DiscoverSearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const DiscoverSearchInput = React.forwardRef<
  HTMLInputElement,
  DiscoverSearchInputProps
>(({ className, value, onClear, ...props }, ref) => {
  return (
    <div
      className={cn(
        "bg-neutral-0 border-primary-600 flex w-full items-center justify-between rounded-[6px] border border-solid px-[14px] py-[13px]",
        className,
      )}
    >
      <div className="flex w-full items-center gap-[6px]">
        <SearchNormal1 size={18} className="text-secondary-400 shrink-0" />
        <input
          ref={ref}
          type="text"
          className="font-libre text-secondary-800 placeholder:text-secondary-400 w-full border-none bg-transparent p-0 text-[16px] leading-[1.4] font-normal outline-none focus:ring-0"
          value={value}
          {...props}
        />
      </div>
      {value && (
        <button
          onClick={onClear}
          type="button"
          className="shrink-0 cursor-pointer border-none bg-transparent p-0 outline-none"
        >
          <Add size={18} className="text-secondary-400 rotate-45" />
        </button>
      )}
    </div>
  );
});

DiscoverSearchInput.displayName = "DiscoverSearchInput";
