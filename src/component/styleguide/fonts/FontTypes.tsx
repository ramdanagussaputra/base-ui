import { cn } from "#/utils";
import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

interface FontTypesProps {
  fonts: {
    className: string;
    typographyType: string;
  }[];
  subtitle: string;
}

function FontTypes({ fonts, subtitle }: Readonly<FontTypesProps>) {
  return (
    <div className="space-y-5">
      <StyleguideSubtitle>{subtitle}</StyleguideSubtitle>

      <div className="space-y-5">
        {fonts.map((font) => (
          <div
            key={font.typographyType}
            className="flex items-end justify-between border-b border-b-neutral-100 pb-5"
          >
            <span className={cn("text-neutral-800", font.className)}>
              AaBbCc123#!&;
            </span>
            <span className="text-subtext-500 text-neutral-500">
              {font.typographyType}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FontTypes;
