import { OptionProps, components } from "react-select";
import { DiscoverSearchOption } from "./types";

import defaultSongImage from "#/components/landing/discover/assets/rectangle.svg";

export const DiscoverSearchOptionComponent = (
  props: Readonly<OptionProps<DiscoverSearchOption, false>>,
) => {
  const { data } = props;
  const isSong = data.type === "song";
  const isSongwriter = data.type === "songwriter";

  return (
    <components.Option
      {...props}
      className="flex! items-center justify-between px-2! py-2.5!"
    >
      <button className="flex items-center gap-2" onClick={data.onClick}>
        {isSong && (
          <img
            src={data.imageUrl || defaultSongImage}
            alt={`Artwork ${data.label}`}
            className="border-secondary-100 size-[2.25rem] rounded-md border"
          />
        )}

        {isSongwriter && (
          <div className="border-secondary-100 bg-secondary-50 flex size-[2.25rem] items-center justify-center rounded-full border">
            <span className="text-secondary-500 text-xs font-medium">
              {data.label.charAt(0)}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <span className="text-secondary-900 text-[0.8125rem] leading-[1.25rem] font-normal! hover:font-normal!">
            {data.label}
          </span>

          <span className="text-secondary-500 text-[0.625rem] leading-[0.625rem] font-normal! hover:font-normal!">
            {isSong && `Song • ${data.secondLabel}`}
            {isSongwriter && data.secondLabel}
          </span>
        </div>
      </button>
    </components.Option>
  );
};
