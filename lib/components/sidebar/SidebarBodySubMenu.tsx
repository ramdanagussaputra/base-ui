import { Add, Minus } from "iconsax-react";
import { useEffect, useState } from "react";
import { cn } from "massive-base-ui";

import { SidebarBodySubMenus } from "#/components/sidebar/SidebarBodySubMenus";
import type { SidebarBodySubMenu } from "#/components/sidebar/model";
import { useSidebarContext } from "#/components/sidebar/context/useSidebarContext";

export function SidebarBodySubMenu({
  routerPathname,
  title,
  href,
  subItems,
}: Readonly<SidebarBodySubMenu>) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentPath, navigateFunction } = useSidebarContext();

  const hasSubItems = !!subItems;
  const isActive = currentPath === href;

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  function setActive() {
    if (href) {
      navigateFunction(href);
    }
  }

  function click() {
    if (hasSubItems) {
      toggle();
    } else {
      setActive();
    }
  }

  useEffect(() => {
    const splittedPath = currentPath
      .split("/")
      .filter((path) => !!path)
      ?.slice(0, 2)
      ?.join();

    const splittedName = routerPathname.split("-").slice(0, 2)?.join();
    const isParentActive = splittedPath === splittedName;

    if (isParentActive) {
      setIsOpen(true);
    }
  }, [routerPathname, currentPath]);

  return (
    <div>
      <button
        onClick={click}
        className={cn(
          "group relative flex h-[2.375rem] w-full cursor-pointer items-center rounded-lg duration-150 hover:bg-(--sidebar-item-bg-color--hover)",
          {
            "hover:bg-transparent": hasSubItems,
            "bg-(--sidebar-item-bg-color--hover)": isActive,
          },
        )}
      >
        <div className="relative mr-[1.21875rem] ml-[9.5px] h-full w-1 border-l border-(--sidebar-submenu-groupline-color)">
          {isActive && (
            <div className="absolute top-1/2 -left-[0.1875rem] size-[0.375rem] -translate-y-1/2 rounded-full bg-(--sidebar-submenu-dot-color)" />
          )}
        </div>

        <div className="flex w-full items-center justify-between">
          <span
            className={cn(
              "b-13-14-400 text-(--sidebar-item-color) duration-500 group-hover:text-(--sidebar-item-color--hover)",
              {
                "group-hover:text-(--sidebar-item-color)": hasSubItems,
                "text-(--sidebar-item-color--hover)": isActive,
              },
            )}
          >
            {title}
          </span>

          {hasSubItems && !isOpen && (
            <Add className="size-[0.875rem] text-(--sidebar-icon-color)" />
          )}

          {hasSubItems && isOpen && (
            <Minus className="size-[0.875rem] text-(--sidebar-icon-color)" />
          )}
        </div>
      </button>

      {hasSubItems && isOpen && (
        <div className="ml-[9.5px] border-l border-(--sidebar-submenu-groupline-color) pl-[15px]">
          <SidebarBodySubMenus subMenus={subItems} />
        </div>
      )}
    </div>
  );
}
