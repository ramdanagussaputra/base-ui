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

        {/* Simple test tooltip */}
        <div className="mb-4 border border-dashed border-gray-300 p-4">
          <p className="mb-2 text-sm text-gray-600">Simple test tooltip:</p>

          <Tooltip message="Test tooltip!" position="top" isPortal={true}>
            <button className="rounded bg-blue-500 px-3 py-1 text-white">
              Complex Test
            </button>
          </Tooltip>
        </div>

        <div className="flex w-fit flex-wrap items-center gap-5">
          {tooltipConfigs.map((config) => (
            <Tooltip
              message={config.message}
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

      {/* Accessibility Demo */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-medium">Accessibility Features</h3>
        <div className="flex items-center gap-5">
          <Tooltip
            message="Try using Tab to focus, Enter/Space to toggle, or Escape to close"
            position="top"
            isPortal={true}
          >
            <Badge color="success">Keyboard Navigation</Badge>
          </Tooltip>

          <Tooltip
            message="This tooltip is announced to screen readers with proper ARIA attributes"
            position="bottom"
            isPortal={true}
          >
            <Badge color="warning">Screen Reader Support</Badge>
          </Tooltip>
        </div>
      </div>

      {/* Overflow Container Demo */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-medium">Overflow Container Test</h3>
        <div className="relative h-32 w-64 overflow-hidden rounded border-2 border-dashed border-gray-300 p-4">
          <p className="mb-2 text-sm text-gray-600">
            This container has overflow:hidden
          </p>
          <div className="flex gap-2">
            <Tooltip
              message="Portal tooltip escapes overflow container!"
              position="top"
              isPortal={true}
            >
              <Badge color="secondary">Portal</Badge>
            </Tooltip>

            <Tooltip
              message="Traditional tooltip gets clipped by container"
              position="top"
              isPortal={false}
            >
              <Badge color="info1">Traditional</Badge>
            </Tooltip>
          </div>
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
    </StyleguideGroup>
  );
}

export default Tooltips;
