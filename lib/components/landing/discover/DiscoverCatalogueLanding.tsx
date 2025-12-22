import React from "react";
import { DiscoverSearchInput } from "./components/DiscoverSearchInput";
import { DiscoverBackground } from "./components/DiscoverBackground";
import { ellipseOrange, ellipseLight } from "./assets";

interface DiscoverCatalogueLandingProps {
  title?: string;
}

export default function DiscoverCatalogueLanding({
  title = "Catalogue",
}: DiscoverCatalogueLandingProps) {
  const [searchValue, setSearchValue] = React.useState("Hati");

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-[1.75rem] overflow-hidden rounded-[0.75rem] bg-[#FDFDFD] py-[3.75rem]">
      {/* Background Ellipses */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[0.75rem]">
        {/* Ellipse 3228 - Bottom Left Orange Glow */}
        <div className="absolute top-[16.375rem] left-[-32.1875rem] h-[59.3125rem] w-[59.3125rem]">
          <div className="absolute inset-[-42.15%]">
            <img
              src={ellipseOrange}
              alt=""
              className="block h-full w-full max-w-none"
            />
          </div>
        </div>
        {/* Ellipse 3231 - Top Right Subtle Glow */}
        <div className="absolute top-[-48.9375rem] left-[38.5625rem] flex h-[56.91rem] w-[58.5rem] items-center justify-center">
          <div className="flex-none rotate-[351.08deg]">
            <div className="relative h-[49.53rem] w-[51.44rem]">
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

      <div className="relative z-10 flex w-[44.625rem] shrink-0 flex-col items-start gap-[1.75rem]">
        <div className="relative flex w-full flex-col items-center gap-[1.75rem]">
          <p className="font-libre text-secondary-800 min-w-full text-center text-xl leading-[1.4] font-normal">
            Discover Our
          </p>

          {/* Catalogue Text */}
          <div className="relative flex items-center justify-center">
            <h1 className="font-libre text-center text-[4rem] leading-none font-medium tracking-tight text-[#ff5d01] uppercase">
              {title}
            </h1>
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
