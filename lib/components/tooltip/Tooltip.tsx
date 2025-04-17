import { cn } from "#/utils";
import { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  message: string;
  position?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ children, message, position = "top" }: TooltipProps) {
  const isTop = position === "top";
  const isBottom = position === "bottom";
  const isLeft = position === "left";
  const isRight = position === "right";

  return (
    <div className="group/tooltip relative w-fit">
      {children}
      <div
        className={cn(
          "bg-secondary-900 text-b4-400 text-secondary-0 absolute z-[9999] hidden w-max rounded-sm px-1.5 py-1 opacity-0 group-hover/tooltip:block group-hover/tooltip:opacity-100",
          {
            "-bottom-full left-1/2 -translate-x-1/2": isBottom,
            "-top-full left-1/2 -translate-x-1/2": isTop,
            "top-1/2 right-full mr-2 -translate-y-1/2": isLeft,
            "top-1/2 left-full ml-2 -translate-y-1/2": isRight,
          },
        )}
      >
        {message}

        <div
          className={cn("absolute h-0 w-0", {
            "border-b-secondary-900 bottom-full left-1/2 -translate-x-1/2 border-r-[3px] border-b-[6px] border-l-[3px] border-r-transparent border-l-transparent":
              isBottom,
            "border-t-secondary-900 top-full left-1/2 -translate-x-1/2 border-t-[6px] border-r-[3px] border-l-[3px] border-r-transparent border-l-transparent":
              isTop,
            "border-l-secondary-900 top-1/2 left-full -translate-y-1/2 border-t-[3px] border-b-[3px] border-l-[6px] border-t-transparent border-b-transparent":
              isLeft,
            "border-r-secondary-900 top-1/2 right-full -translate-y-1/2 border-t-[3px] border-r-[6px] border-b-[3px] border-t-transparent border-b-transparent":
              isRight,
          })}
        />
      </div>
    </div>
  );
}
