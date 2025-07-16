import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Copy } from "iconsax-react";

import Icon from "#/components/icon/Icon";

import { cn } from "#/utils";

interface CopyClipboardProps {
  readonly value: string;
  readonly iconClassName?: string;
  readonly onCopy?: () => void;
}

function CopyClipboard({ value, iconClassName, onCopy }: CopyClipboardProps) {
  function copyClipboard() {
    navigator.clipboard.writeText(value);
    onCopy?.();
  }

  return (
    <Menu>
      <MenuButton className="outline-hidden">
        <Icon
          icon={Copy}
          onClick={copyClipboard}
          className={cn("text-secondary-300 size-4 cursor-pointer", iconClassName)}
        />
      </MenuButton>

      <MenuItems anchor="top" className="-mt-2 outline-hidden">
        <MenuItem>
          {({ close }) => {
            setTimeout(close, 1000);

            return (
              <div className="bg-secondary-900 flex h-[1.375rem] w-[49px] items-center justify-center rounded-[4px]">
                <span className="text-secondary-0 text-xs">Copied</span>
              </div>
            );
          }}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export default CopyClipboard;
