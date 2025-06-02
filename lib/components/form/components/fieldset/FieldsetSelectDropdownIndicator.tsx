import { DropdownIndicatorProps } from "react-select";
import { ArrowDown2 } from "iconsax-react";

import { cn } from "#/utils";

export function FieldsetSelectDropdownIndicator(
  props: Readonly<DropdownIndicatorProps>,
) {
  const className = props.getClassNames("dropdownIndicator", props);
  return <ArrowDown2 className={cn(className)} />;
}
