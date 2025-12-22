import { ControlProps, components } from "react-select";
import { SearchNormal1 } from "iconsax-react";
import { cn } from "#/utils";
import Icon from "#/components/icon/Icon";
import { DiscoverSearchOption } from "./types";

export const DiscoverSearchControl = ({
  children,
  ...props
}: ControlProps<DiscoverSearchOption, false>) => {
  return (
    <components.Control
      {...props}
      className={cn(
        props.className,
        "!border-primary-600 hover:!border-primary-600 !rounded-[6px] py-[5px] pl-[14px] !shadow-none",
      )}
    >
      <Icon
        icon={SearchNormal1}
        className="text-secondary-400 size-[1.125rem] shrink-0"
      />
      {children}
    </components.Control>
  );
};
