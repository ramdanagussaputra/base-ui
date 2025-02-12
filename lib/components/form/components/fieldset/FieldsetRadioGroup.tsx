import { cn } from "#/utils";
import { RadioGroup } from "@headlessui/react";

interface FieldsetRadioGroupProps {
  name: string;
  value: string;
  children: React.ReactNode;
  onChange?: (value: string) => void;
  isVertical?: boolean;
}

export function FieldsetRadioGroup({
  children,
  name,
  value,
  onChange = () => {},
  isVertical = false,
}: Readonly<FieldsetRadioGroupProps>) {
  return (
    <RadioGroup
      name={name}
      value={value}
      className={cn("flex w-fit items-center gap-5", {
        "flex-col": isVertical,
      })}
      onChange={onChange}
    >
      {children}
    </RadioGroup>
  );
}
