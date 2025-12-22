import { MenuProps, components } from "react-select";
import { DiscoverSearchOption } from "./types";

export const DiscoverSearchMenu = (
  props: MenuProps<DiscoverSearchOption, false>,
) => {
  if (props.options.length === 0) {
    return null;
  }
  return <components.Menu {...props} />;
};
