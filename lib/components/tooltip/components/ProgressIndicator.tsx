import { TickCircle } from "iconsax-react";

interface ProgressIndicatorProps {
  status: "completed" | "in-progress" | "pending";
  isLastItem: boolean;
}

export function ProgressIndicator({
  status,
  isLastItem,
}: ProgressIndicatorProps) {
  return (
    <>
      <div className="border-secondary-200 z-10 flex h-[28px] w-[28px] items-center justify-center rounded-full border bg-(--progress-tooltip-bg)">
        {status === "completed" && (
          <TickCircle variant="Bold" size={22} className="text-primary-600" />
        )}

        {status === "in-progress" && (
          <span className="bg-primary-600 flex size-[18px] items-center justify-center rounded-full">
            <span className="size-[8px] rounded-full bg-(--progress-tooltip-bg)" />
          </span>
        )}
      </div>
      {!isLastItem && (
        <span className="bg-secondary-200 absolute ms-[13.5px] h-full w-[0.5px]" />
      )}
    </>
  );
}
