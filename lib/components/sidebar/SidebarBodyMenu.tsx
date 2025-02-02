import { Add, Minus } from "iconsax-react";
import { useEffect, useState } from "react";
import { Slot } from "@radix-ui/react-slot";

import { SidebarBodySubMenus } from "#/components/sidebar/SidebarBodySubMenus";

import type { SidebarBodyMenu as SidebarBodyMenuType } from "#/components/sidebar/model";
import { cn } from "#/utils";
import { useSidebarContext } from "#/components/sidebar/context/useSidebarContext";

export function SidebarBodyMenu({
  icon,
  title,
  subMenus,
  routerPathname,
  href,
}: Readonly<Omit<SidebarBodyMenuType, "id">>) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentPath, navigateFunction } = useSidebarContext();

  const hasSubMenus = !!subMenus;
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
    if (hasSubMenus) {
      toggle();
    } else {
      setActive();
    }
  }

  useEffect(() => {
    const splittedPath = currentPath.split("/");

    if (splittedPath.includes(routerPathname)) {
      setIsOpen(true);
    }
  }, [routerPathname, currentPath]);

  return (
    <div
      className={cn("px-1", {
        "rounded-lg duration-150 hover:bg-(--sidebar-item-bg-color--hover)":
          !hasSubMenus,
        "bg-(--sidebar-item-bg-color--hover)": isActive,
      })}
    >
      <button
        onClick={click}
        className={cn(
          "group flex h-11 w-full cursor-pointer items-center justify-between",
        )}
      >
        <div className="flex items-center gap-[0.625rem]">
          <Slot
            className={cn("size-5 text-(--sidebar-icon-color)", {
              "text-(--sidebar-icon-color--hover)": isActive,
              "duration-500 group-hover:text-(--sidebar-icon-color--hover)":
                !hasSubMenus,
            })}
          >
            {icon}
          </Slot>

          <span
            className={cn("b-14-14-500 text-(--sidebar-item-color)", {
              "text-(--sidebar-item-color--hover)": isActive,
              "duration-500 group-hover:text-(--sidebar-item-color--hover)":
                !hasSubMenus,
            })}
          >
            {title}
          </span>
        </div>

        {hasSubMenus && !isOpen && (
          <Add className="size-[0.875rem] text-(--sidebar-icon-color)" />
        )}

        {hasSubMenus && isOpen && (
          <Minus className="size-[0.875rem] text-(--sidebar-icon-color)" />
        )}
      </button>

      {hasSubMenus && isOpen && <SidebarBodySubMenus subMenus={subMenus} />}
    </div>
  );
}
