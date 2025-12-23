import { SearchNormal } from "iconsax-react";

import { Fieldset } from "#/components/form";
import Icon from "#/components/icon/Icon";

interface SearchbarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

export default function Searchbar({
  value,
  onChange,
  placeholder,
  className,
}: SearchbarProps) {
  return (
    <Fieldset className={className}>
      <Fieldset.TextInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(val) => onChange(val)}
        isReverseIcon
      >
        <div className="flex items-center gap-1">
          <Icon icon={SearchNormal} className="text-secondary-500 size-4" />
        </div>
      </Fieldset.TextInput>
    </Fieldset>
  );
}
