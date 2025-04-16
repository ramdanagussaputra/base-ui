import StyleguideTitle from "@/component/styleguide/StyleguideTitle";
import StyleguideGroup from "@/component/styleguide/StyleguideGroup";
import FontTypes from "@/component/styleguide/fonts/FontTypes";

import { headingFonts, bodyFonts } from "@/component/styleguide/fonts/data";

function Fonts() {
  return (
    <StyleguideGroup>
      <StyleguideTitle>Fonts</StyleguideTitle>

      <div className="grid grid-cols-2 gap-20">
        <FontTypes fonts={headingFonts} subtitle="Heading" />
        <FontTypes fonts={bodyFonts} subtitle="Body" />
      </div>
    </StyleguideGroup>
  );
}

export default Fonts;
