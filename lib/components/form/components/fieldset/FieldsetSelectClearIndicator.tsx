import { Add } from "iconsax-react";
import { ClearIndicatorProps } from "react-select";

import { cn } from "#/utils";

export function FieldsetSelectClearIndicator(
  props: Readonly<ClearIndicatorProps>,
) {
  const {
    innerProps: { ref, ...restProps },
  } = props;

  const className = props.getClassNames("clearIndicator", props);
  return (
    <div ref={ref} {...restProps}>
      <Add className={cn("text-secondary-500 rotate-45", className)} />
    </div>
  );
}
