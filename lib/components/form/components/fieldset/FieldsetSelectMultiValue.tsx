import { components, MultiValueProps, GroupBase } from "react-select";
import { FieldsetSelectOption } from "#/components/form/model";
import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";
import { cn } from "#/utils";

export function FieldsetSelectMultiValue(
  props: MultiValueProps<unknown, boolean, GroupBase<unknown>>,
) {
  const data = props.data as FieldsetSelectOption;
  const { isDisabled, isLarge, isMedium, isSmall } = useFieldsetContext();

  // If the option has an exclusiveGroup, render as plain text (like single select)
  if (data.exclusiveGroup) {
    return (
      <div
        className={cn("m-0! text-(--fieldset-text-color)!", {
          "text-(length:--fieldset-font-size-large)! leading-(--fieldset-line-height-large)! font-(--fieldset-font-weight-large)!":
            isLarge,
          "text-(length:--fieldset-font-size-medium)! leading-(--fieldset-line-height-medium)! font-(--fieldset-font-weight-medium)!":
            isMedium,
          "text-(length:--fieldset-font-size-small)! leading-(--fieldset-line-height-small)! font-(--fieldset-font-weight-small)!":
            isSmall,
          "text-(--fieldset-text-color--disabled)": isDisabled,
        })}
      >
        {data.label}
      </div>
    );
  }

  // Otherwise, render as default chip
  return <components.MultiValue {...props} />;
}
