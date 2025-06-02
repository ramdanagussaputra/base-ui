import { cn } from "#/utils";
import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";
import ColorBar from "@/component/styleguide/colors/ColorBar";

interface ColorBarProps {
  title: string;
  colorData: { shade: string; hexCode: string }[];
  darkTextColor?: string;
}

function ColorBars({
  colorData,
  title,
  darkTextColor,
}: Readonly<ColorBarProps>) {
  return (
    <div className="space-y-5">
      <StyleguideSubtitle>{title}</StyleguideSubtitle>

      <ColorBar
        bgColor={colorData[5].hexCode}
        textColor="#FDFDFD"
        className="rounded-[10px]"
      >
        <span>500</span>
        <span>{colorData[5].hexCode}</span>
      </ColorBar>

      <div>
        {colorData.map((color, index) => {
          const isLast = index === colorData.length - 1;
          const isFirst = index === 0;
          const isDarkText = index > 7;

          return (
            <ColorBar
              key={color.shade}
              bgColor={color.hexCode}
              textColor={isDarkText ? darkTextColor : "#FDFDFD"}
              className={cn({
                "rounded-t-[10px]": isFirst,
                "rounded-b-[10px]": isLast,
              })}
            >
              <span>{color.shade}</span>
              <span>{color.hexCode}</span>
            </ColorBar>
          );
        })}
      </div>
    </div>
  );
}

export default ColorBars;
