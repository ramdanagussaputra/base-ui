import { Badge, Tag } from "massive-base-ui";

import StyleguideGroup from "@/component/styleguide/StyleguideGroup";
import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";
import StyleguideTitle from "@/component/styleguide/StyleguideTitle";
import { Add } from "iconsax-react";

type BadgeConfig = {
  color:
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "warning"
    | "info1"
    | "info2";
  size: "medium" | "small";
};

const badgesConfigs: BadgeConfig[] = [
  {
    color: "primary",
    size: "medium",
  },
  {
    color: "primary",
    size: "small",
  },
  {
    color: "secondary",
    size: "medium",
  },
  {
    color: "secondary",
    size: "small",
  },
  {
    color: "error",
    size: "medium",
  },
  {
    color: "error",
    size: "small",
  },
  {
    color: "success",
    size: "medium",
  },
  {
    color: "success",
    size: "small",
  },
  {
    color: "warning",
    size: "medium",
  },
  {
    color: "warning",
    size: "small",
  },
  {
    color: "info1",
    size: "medium",
  },
  {
    color: "info1",
    size: "small",
  },
  {
    color: "info2",
    size: "medium",
  },
  {
    color: "info2",
    size: "small",
  },
];

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
