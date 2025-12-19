import React from "react";
import { DiscoverSearchInput } from "./components/DiscoverSearchInput";
import { DiscoverBackground } from "./components/DiscoverBackground";
import { textMask, ellipseOrange, ellipseLight } from "./assets";

export default function DiscoverCatalogueLanding() {
  const [searchValue, setSearchValue] = React.useState("Hati");

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-[28px] overflow-hidden rounded-[12px] bg-[#FDFDFD] py-[60px]">
      {/* Background Ellipses */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[12px]">
        {/* Ellipse 3228 - Bottom Left Orange Glow */}
        <div className="absolute top-[262px] left-[-515px] h-[949px] w-[949px]">
          <div className="absolute inset-[-42.15%]">
            <img
              src={ellipseOrange}
              alt=""
              className="block h-full w-full max-w-none"
            />
          </div>
        </div>
        {/* Ellipse 3231 - Top Right Subtle Glow */}
        <div className="absolute top-[-783px] left-[617px] flex h-[910.58px] w-[936.01px] items-center justify-center">
          <div className="flex-none rotate-[351.08deg]">
            <div className="relative h-[792.52px] w-[823.06px]">
              <div className="absolute inset-[-63.09%_-60.75%]">
                <img
                  src={ellipseLight}
                  alt=""
                  className="block h-full w-full max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background (Right Grid) */}
      <DiscoverBackground />

      <div className="relative z-10 flex w-[714px] shrink-0 flex-col items-start gap-[28px]">
        <div className="relative flex w-full flex-col items-center gap-[12px]">
          <p className="font-libre text-secondary-800 min-w-full text-center text-[20px] leading-[1.4] font-normal">
            Discover Our
          </p>

          {/* Catalogue Text */}
          <div className="relative flex items-center justify-center">
            <h1 className="sr-only">Massive Catalogue</h1>
            <div className="relative h-[109px] w-[714px]">
              <div
                className="absolute inset-0 bg-[#ff5d01]"
                style={{
                  maskImage: `url(${textMask})`,
                  WebkitMaskImage: `url(${textMask})`,
                  maskSize: "704.42px 48.77px",
                  WebkitMaskSize: "704.42px 48.77px",
                  maskPosition: "6.2px 29.87px",
                  WebkitMaskPosition: "6.2px 29.87px",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                }}
              />
            </div>
          </div>
        </div>

        <DiscoverSearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClear={() => setSearchValue("")}
          placeholder="Search..."
        />
      </div>
    </div>
  );
}
