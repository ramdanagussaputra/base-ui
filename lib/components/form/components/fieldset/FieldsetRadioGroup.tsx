import { RadioGroup } from "@headlessui/react";

interface FieldsetRadioGroupProps {
  name: string;
  value: string;
  children: React.ReactNode;
  onChange?: (value: string) => void;
}

export function FieldsetRadioGroup({
  children,
  name,
  value,
  onChange = () => {},
}: Readonly<FieldsetRadioGroupProps>) {
  return (
    <RadioGroup
      name={name}
      value={value}
      className="flex items-center gap-5"
      onChange={onChange}
    >
      {children}
    </RadioGroup>
  );
}
