import {
  Badge,
  capitalizeFirstWord,
  Tooltip,
  ProgressTooltip,
} from "massive-base-ui";

import StyleguideGroup from "@/component/styleguide/StyleguideGroup";
import StyleguideTitle from "@/component/styleguide/StyleguideTitle";

import {
  progressTooltipConfigs,
  tooltipConfigs,
} from "@/component/styleguide/tooltip/data";

function Tooltips() {
  return (
    <StyleguideGroup>
      <StyleguideTitle>Tooltips</StyleguideTitle>

      <div className="grid w-fit grid-cols-4 gap-5">
        {tooltipConfigs.map((config, index) => (
          <Tooltip
            message={config.message}
            position={config.position}
            key={index}
            variant={config.variant}
          >
            <Badge color="secondary">
              {capitalizeFirstWord(config.position)} Tooltip
            </Badge>
          </Tooltip>
        ))}
      </div>

      <div className="flex items-center gap-5">
        {progressTooltipConfigs.map((config, index) => (
          <ProgressTooltip
            position={config.position}
            content={config.content}
            key={index}
          >
            <Badge color="info1">
              {capitalizeFirstWord(config.position)} Progress Tooltip
            </Badge>
          </ProgressTooltip>
        ))}
      </div>
    </StyleguideGroup>
  );
}

export default Tooltips;
