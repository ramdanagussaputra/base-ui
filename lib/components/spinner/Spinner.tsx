import { cn } from "#/utils";

interface SpinnerProps {
  size?: number;
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "info1"
    | "info2"
    | "neutral"
    | "default";
}

const colors = {
  primary: "border-primary-500",
  secondary: "border-secondary-500",
  error: "border-error-500",
  warning: "border-warning-500",
  success: "border-success-600",
  info1: "border-info1-600",
  info2: "border-info2-600",
  neutral: "border-neutral-0",
  default: "border-secondary-200",
} as {
  primary: string;
  secondary: string;
  error: string;
  warning: string;
  success: string;
  info1: string;
  info2: string;
  neutral: string;
  default: string;
};

export function Spinner({ size = 32, color = "default" }: SpinnerProps) {
  const spinnerColor = colors[color];

  const style = {
    width: size,
    height: size,
  };

  const isSmallSize = size <= 20;
  const smallSizeBorder = {
    "border-[2px]": isSmallSize,
  };

  return (
    <div className="relative flex w-fit items-center justify-center rounded-xl">
      <div
        className={cn(
          "absolute rounded-full border-[3px] opacity-20",
          spinnerColor,
          smallSizeBorder,
        )}
        style={style}
      />
      <div
        className={cn(
          "absolute animate-spin rounded-full border-[3px]",
          `${spinnerColor} border-t-transparent border-r-transparent`,
          smallSizeBorder,
        )}
        style={style}
      />
    </div>
  );
}
