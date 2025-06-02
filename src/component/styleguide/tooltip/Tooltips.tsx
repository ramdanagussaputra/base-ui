import { Badge, capitalizeFirstWord, Tooltip } from "massive-base-ui";

import StyleguideGroup from "@/component/styleguide/StyleguideGroup";
import StyleguideTitle from "@/component/styleguide/StyleguideTitle";

import { tooltipConfigs } from "@/component/styleguide/tooltip/data";

function Tooltips() {
  return (
    <StyleguideGroup>
      <StyleguideTitle>Tooltips</StyleguideTitle>

      <div className="flex items-center gap-5">
        {tooltipConfigs.map((config) => (
          <Tooltip message={config.message} position={config.position}>
            <Badge color="secondary">
              {capitalizeFirstWord(config.position)} Tooltip
            </Badge>
          </Tooltip>
        ))}
      </div>
    </StyleguideGroup>
  );
}

export default Tooltips;
