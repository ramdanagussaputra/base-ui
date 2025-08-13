import { OptionProps, components } from "react-select";
import { Add } from "iconsax-react";

import { FieldsetSelectOption } from "#/components/form/model";
import Icon from "#/components/icon/Icon";

export function FieldsetSelectSongOptionComponent(
  props: Readonly<OptionProps>,
) {
  const data = props.data as FieldsetSelectOption & {
    secondLabel: string;
    imageUrl: string;
  };

  return (
    <components.Option
      {...props}
      className="flex! items-center justify-between px-2! py-2.5!"
    >
      <div className="flex items-center gap-2">
        <img
          src={data.imageUrl}
          alt={`Artwork ${data.label}`}
          className="border-secondary-100 size-[2.25rem] rounded-md border"
        />
        <div className="flex flex-col gap-1">
          <span className="text-secondary-900 text-[0.8125rem] leading-[1.25rem] font-normal! hover:font-normal!">
            {data.label}
          </span>
          <span className="text-secondary-500 text-[0.625rem] leading-[0.625rem] font-normal! hover:font-normal!">
            {data.secondLabel}
          </span>
        </div>
      </div>
      <Icon icon={Add} className="text-secondary-500 size-5" />
    </components.Option>
  );
}
