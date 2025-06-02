import { cn } from "#/utils";
import { CSSProperties } from "react";

interface ColorBarProps {
  className?: string;
  bgColor?: CSSProperties["backgroundColor"];
  textColor?: CSSProperties["color"];
  children?: React.ReactNode;
}

function ColorBar({
  className,
  children,
  bgColor,
  textColor,
}: Readonly<ColorBarProps>) {
  return (
    <div
      className={cn(
        "text-b3-600 flex items-center justify-between px-2.5 py-3",
        className,
      )}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {children}
    </div>
  );
}

export default ColorBar;
