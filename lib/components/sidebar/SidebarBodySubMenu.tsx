import { Add, Minus } from "iconsax-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { cn } from "massive-base-ui";

import { SidebarBodySubMenus } from "#/components/sidebar/SidebarBodySubMenus";
import type { SidebarBodySubMenu } from "#/components/sidebar/model";

export function SidebarBodySubMenu({
  name,
  title,
  href,
  subItems,
}: Readonly<SidebarBodySubMenu>) {
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const hasSubItems = !!subItems;
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
    if (hasSubItems) {
      toggle();
    } else {
      setActive();
    }
  }

  useEffect(() => {
    const splittedPath = pathname
      .split("/")
      .filter((path) => !!path)
      ?.slice(0, 2)
      ?.join();

    const splittedName = name.split("-").slice(0, 2)?.join();
    const isParentActive = splittedPath === splittedName;

    if (isParentActive) {
      setIsOpen(true);
    }
  }, [name, pathname]);

  return (
    <div>
      <button
        onClick={click}
        className={cn(
          "group relative flex h-[2.375rem] w-full cursor-pointer items-center rounded-lg duration-150 hover:bg-[#4B4A5E66]/40",
          { "hover:bg-transparent": hasSubItems, "bg-[#4B4A5E66]": isActive },
        )}
      >
        <div className="border-primary-700 relative mr-[1.21875rem] ml-[0.59375rem] h-full w-1 border-l">
          {isActive && (
            <div className="bg-secondary-600 absolute top-1/2 -left-[0.1875rem] size-[0.375rem] -translate-y-1/2 rounded-full" />
          )}
        </div>

        <div className="flex w-full items-center justify-between">
          <span
            className={cn(
              "group-hover:text-secondary-500 text-primary-200 b-13-14-400 duration-500",
              {
                "group-hover:text-primary-200": hasSubItems,
                "text-secondary-500": isActive,
              },
            )}
          >
            {title}
          </span>

          {hasSubItems && !isOpen && (
            <Add className="text-primary-40 text-primary-400 size-[0.875rem]" />
          )}

          {hasSubItems && isOpen && (
            <Minus className="text-primary-40 text-primary-400 size-[0.875rem]" />
          )}
        </div>
      </button>

      {hasSubItems && isOpen && (
        <div className="border-primary-700 ml-[9.5px] border-l pl-[15px]">
          <SidebarBodySubMenus subMenus={subItems} />
        </div>
      )}
    </div>
  );
}
