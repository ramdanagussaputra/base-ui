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

      {/* Portal-Enhanced Tooltips (Default) */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-medium">Portal Tooltips (Enhanced)</h3>

        <div className="flex w-fit flex-wrap items-center gap-5">
          {tooltipConfigs.map((config) => (
            <Tooltip
              message={config.message}
              // position={config.position}
              position={config.position}
              key={`portal-${config.position}-${config.variant}`}
              variant={config.variant}
              isPortal={true}
            >
              <Badge color="secondary">
                {capitalizeFirstWord(config.position)}
              </Badge>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Traditional Tooltips (Backward Compatibility) */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-medium">
          Traditional Tooltips (Legacy)
        </h3>
        <div className="grid w-fit grid-cols-4 gap-5">
          {tooltipConfigs.slice(0, 4).map((config) => (
            <Tooltip
              message={config.message}
              position={config.position}
              key={`traditional-${config.position}`}
              variant={config.variant}
              isPortal={false}
            >
              <Badge color="info1">
                {capitalizeFirstWord(config.position)} (Legacy)
              </Badge>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Progress Tooltips */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-medium">Progress Tooltips</h3>
        <div className="flex items-center gap-5">
          {progressTooltipConfigs.map((config) => (
            <ProgressTooltip
              position={config.position}
              content={config.content}
              key={`progress-${config.position}`}
            >
              <Badge color="info1">
                {capitalizeFirstWord(config.position)} Progress Tooltip
              </Badge>
            </ProgressTooltip>
          ))}
        </div>
      </div>

      {/* Specific top-right (Maintenance) Example */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-medium">Top Right (Anchor) Example</h3>
        <div className="flex items-center gap-5">
          <Tooltip
            message="Under Maintenance / This menu is temporarily unavailable and will be available again soon."
            position="top-right"
            variant="default"
          >
            <Badge color="warning">
              Maintenance Tooltip (Top Right Anchor)
            </Badge>
          </Tooltip>
        </div>
      </div>
    </StyleguideGroup>
  );
}

export default Tooltips;
