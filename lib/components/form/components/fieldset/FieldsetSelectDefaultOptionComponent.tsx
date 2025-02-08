import { OptionProps, components } from "react-select";

export function FieldsetSelectDefaultOptionComponent(
  props: Readonly<OptionProps>,
) {
  return <components.Option {...props} />;
}
