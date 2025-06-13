import { ProgressTooltipContent } from "#/components/tooltip/model";
import { DateBlock } from "#/components/tooltip/components/DateBlock";
import { ProgressIndicator } from "#/components/tooltip/components/ProgressIndicator";

import { cn } from "#/utils";

interface ProgressCardProps {
  content: ProgressTooltipContent;
  isLastItem: boolean;
}

export function ProgressCard({ content, isLastItem }: ProgressCardProps) {
  const isCompleted = content.status === "completed";
  const isInProgress = content.status === "in-progress";
  const isPending = content.status === "pending";

  return (
    <div className="relative flex gap-3.5">
      <ProgressIndicator status={content.status} isLastItem={isLastItem} />
      <div
        className={cn("flex flex-col gap-1", {
          "mb-[1.0625rem]": content?.date && !isLastItem,
          "mb-[2.1875rem]": !content?.date && !isLastItem,
        })}
      >
        <p
          className={cn("text-secondary-800 whitespace-nowrap", {
            "text-b3-600": isInProgress,
            "text-b3-400": isCompleted || isPending,
          })}
        >
          {content?.title}
        </p>
        <p className="text-b4-400 text-secondary-500 whitespace-nowrap">
          {content?.description}
        </p>
        {content?.date && <DateBlock date={content.date} />}
      </div>
    </div>
  );
}
