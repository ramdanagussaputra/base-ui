import { cn } from "#/utils";

import chevron from "#/components/tooltip/asset/chevron.svg";
import { ProgressTooltipContent } from "#/components/tooltip/model";
import { ProgressCard } from "#/components/tooltip/components/ProgressCard";

interface ProgressTooltipProps {
  children: React.ReactNode;
  position?: "left" | "right";
  content?: ProgressTooltipContent[];
  title?: string;
  description?: string;
}

export function ProgressTooltip({
  children,
  position = "left",
  content = [],
  title = "Status Progress",
  description,
}: ProgressTooltipProps) {
  const completedCount = content.filter(
    (item) => item.status === "completed",
  ).length;

  return (
    <div className="group/progress-tooltip relative flex w-fit items-center">
      {children}
      <div
        className={cn(
          "absolute z-[9999] hidden items-center rounded-(--progress-tooltip-rounded) bg-(--progress-tooltip-bg) p-5 shadow-(--progress-tooltip-shadow) group-hover/progress-tooltip:flex",
          {
            "left-0 -translate-x-[calc(100%+16px)]": position === "left",
            "right-0 translate-x-[calc(100%+16px)]": position === "right",
          },
        )}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <p className="text-b2-600 text-secondary-700">{title}</p>
            <p className="text-b4-400 text-secondary-500">
              {description ||
                `${completedCount} of ${content.length} steps completed`}
            </p>
          </div>

          <div>
            {content.map((item, index) => (
              <ProgressCard
                key={index}
                content={item}
                isLastItem={index === content.length - 1}
              />
            ))}
          </div>
        </div>
        <img
          src={chevron}
          alt="chevron"
          className={cn("absolute", {
            "right-0 translate-x-[13px]": position === "left",
            "left-0 -translate-x-[13px] rotate-180": position === "right",
          })}
        />
      </div>
    </div>
  );
}
