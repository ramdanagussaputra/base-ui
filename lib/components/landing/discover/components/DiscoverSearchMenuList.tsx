import React from "react";
import { MenuListProps, components } from "react-select";
import { DiscoverSearchOption } from "./types";

export const DiscoverSearchMenuList = (
  props: MenuListProps<DiscoverSearchOption, false>,
) => {
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
