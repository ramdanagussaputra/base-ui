import { Radio } from "@headlessui/react";

interface FieldsetRadioProps {
  value: string;
  id?: string;
}

export function FieldsetRadio({ value, id }: Readonly<FieldsetRadioProps>) {
  return (
    <Radio
      id={id}
      value={value}
      className="group flex size-(--fieldset-radio-size) shrink-0 cursor-pointer items-center justify-center rounded-full border border-(--fieldset-radio-border-color) bg-(--fieldset-radio-bg) data-checked:border-(--fieldset-radio-border-color--checked) data-checked:bg-(--fieldset-radio-bg--checked)"
    >
      <span className="invisible size-(--fieldset-radio-checked-fill-size) rounded-full bg-(--fieldset-radio-checked-fill-color) group-data-checked:visible" />
    </Radio>
  );
}
