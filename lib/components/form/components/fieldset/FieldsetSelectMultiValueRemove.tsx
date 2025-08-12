import { cn } from "#/utils";
import { Add } from "iconsax-react";
import { components, MultiValueRemoveProps } from "react-select";
import Icon from "#/components/icon/Icon";

export function FieldsetSelectMultiValueRemove(props: MultiValueRemoveProps) {
  return (
    <components.MultiValueRemove {...props}>
      <Icon icon={Add} className={cn("text-secondary-500 rotate-45")} />
    </components.MultiValueRemove>
  );
}
