import { TickCircle } from "iconsax-react";
import Icon from "#/components/icon/Icon";

interface ProgressIndicatorProps {
  status: "completed" | "in-progress" | "pending";
  isLastItem: boolean;
}

export function ProgressIndicator({
  status,
  isLastItem,
}: ProgressIndicatorProps) {
  return (
    <div className="relative flex justify-center">
      <div className="border-secondary-200 z-10 flex size-[1.75rem] items-center justify-center rounded-full border bg-(--progress-tooltip-bg)">
        {status === "completed" && (
          <Icon
            icon={TickCircle}
            variant="Bold"
            className="text-primary-600 size-[1.375rem]"
          />
        )}

        {status === "in-progress" && (
          <span className="bg-primary-600 flex size-[1.125rem] items-center justify-center rounded-full">
            <span className="size-[0.6rem] rounded-full bg-(--progress-tooltip-bg)" />
          </span>
        )}
      </div>
      {!isLastItem && (
        <span className="bg-secondary-200 absolute h-full w-[0.5px]" />
      )}
    </div>
  );
}
