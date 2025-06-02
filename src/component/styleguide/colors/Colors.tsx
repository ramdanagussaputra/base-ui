import StyleguideTitle from "@/component/styleguide/StyleguideTitle";
import StyleguideGroup from "@/component/styleguide/StyleguideGroup";
import ColorBars from "@/component/styleguide/colors/ColorBars";

import { colorBar } from "@/component/styleguide/colors/data";

function Colors() {
  return (
    <StyleguideGroup>
      <StyleguideTitle>Colors</StyleguideTitle>

      <div className="grid grid-cols-4 gap-5">
        {colorBar.map((color) => {
          return (
            <ColorBars
              key={color.title}
              colorData={color.colorData}
              title={color.title}
              darkTextColor={color.darkTextColor}
            />
          );
        })}
      </div>
    </StyleguideGroup>
  );
}

export default Colors;
