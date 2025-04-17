import { Badge, Tag } from "massive-base-ui";
import { Add } from "iconsax-react";

import StyleguideGroup from "@/component/styleguide/StyleguideGroup";
import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";
import StyleguideTitle from "@/component/styleguide/StyleguideTitle";

import { badgesConfigs } from "@/component/styleguide/badges-tags/data";

function BadgesTags() {
  return (
    <StyleguideGroup>
      <StyleguideTitle>Badges and Tags</StyleguideTitle>

      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-5">
          <StyleguideSubtitle>Badges</StyleguideSubtitle>

          <div className="grid grid-cols-8 gap-5">
            {badgesConfigs.map((config) => (
              <Badge
                key={`${config.color}-${config.size}`}
                color={config.color}
                size={config.size}
              >
                Badge
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <StyleguideSubtitle>Tags</StyleguideSubtitle>

          <div className="grid grid-cols-[max-content_max-content] gap-5">
            <Tag onRemove={() => {}}>
              Tag Badge
              <Tag.RemoveButton>
                <Add className="rotate-45" />
              </Tag.RemoveButton>
            </Tag>

            <Tag onRemove={() => {}} isRounded>
              Rounded Tag Badge
              <Tag.RemoveButton>
                <Add className="rotate-45" />
              </Tag.RemoveButton>
            </Tag>
          </div>
        </div>
      </div>
    </StyleguideGroup>
  );
}

export default BadgesTags;
