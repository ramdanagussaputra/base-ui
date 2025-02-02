import { Add, Minus } from "iconsax-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Slot } from "@radix-ui/react-slot";

import { SidebarBodySubMenus } from "#/components/sidebar/SidebarBodySubMenus";

import type { SidebarBodyMenu as SidebarBodyMenuType } from "#/components/sidebar/model";
import { cn } from "#/utils";

export function SidebarBodyMenu({
  icon,
  title,
  subMenus,
  name,
  href,
}: Readonly<Omit<SidebarBodyMenuType, "id">>) {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const hasSubMenus = !!subMenus;
  const isActive = pathname === href;

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  function setActive() {
    if (href) {
      navigate(href);
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
    const splittedPath = pathname.split("/");

    if (splittedPath.includes(name)) {
      setIsOpen(true);
    }
  }, [name, pathname]);

  return (
    <div
      className={cn("px-1", {
        "text-secondary-600 rounded-lg duration-150 hover:bg-[#4B4A5E80]":
          !hasSubMenus,
        "bg-[#4B4A5E80]": isActive,
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
            className={cn("text-primary-500 size-5", {
              "text-secondary-500": isActive,
              "group-hover:text-secondary-500 duration-500": !hasSubMenus,
            })}
          >
            {icon}
          </Slot>
          <span
            className={cn("text-primary-200 b-14-14-500", {
              "text-secondary-500": isActive,
              "group-hover:text-secondary-500 duration-500": !hasSubMenus,
            })}
          >
            {title}
          </span>
        </div>

        {hasSubMenus && !isOpen && (
          <Add className="text-primary-40 text-primary-400 size-[0.875rem]" />
        )}

        {hasSubMenus && isOpen && (
          <Minus className="text-primary-40 text-primary-400 size-[0.875rem]" />
        )}
      </button>

      {hasSubMenus && isOpen && <SidebarBodySubMenus subMenus={subMenus} />}
    </div>
  );
}
