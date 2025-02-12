import { Radio } from "@headlessui/react";
import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";
import { cn } from "#/utils";

interface FieldsetRadioProps {
  value: string;
  id?: string;
}

export function FieldsetRadio({ value, id }: Readonly<FieldsetRadioProps>) {
  const { isDisabled } = useFieldsetContext();

  return (
    <Radio
      disabled={isDisabled}
      id={id}
      value={value}
      className={cn(
        "group flex size-(--fieldset-radio-size) shrink-0 cursor-pointer items-center justify-center rounded-full border border-(--fieldset-radio-border-color) bg-(--fieldset-radio-bg) outline-0 data-checked:border-(--fieldset-radio-border-color--checked) data-checked:bg-(--fieldset-radio-bg--checked)",
        {
          "cursor-default opacity-50": isDisabled,
        },
      )}
    >
      <span className="invisible size-(--fieldset-radio-checked-fill-size) rounded-full bg-(--fieldset-radio-checked-fill-color) group-data-checked:visible" />
    </Radio>
  );
}
