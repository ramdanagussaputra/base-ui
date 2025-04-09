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
    | "neutral";
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
} as {
  primary: string;
  secondary: string;
  error: string;
  warning: string;
  success: string;
  info1: string;
  info2: string;
  neutral: string;
};

export function Spinner({ size = 32, color = "primary" }: SpinnerProps) {
  const spinnerColor = colors[color];

  const style = {
    width: size,
    height: size,
  };

  return (
    <div className="relative flex w-fit items-center justify-center rounded-xl">
      <div
        className={cn(
          "absolute rounded-full border-[3px] opacity-20",
          spinnerColor,
        )}
        style={style}
      />
      <div
        className={cn(
          "absolute animate-spin rounded-full border-[3px]",
          `${spinnerColor} border-t-transparent border-r-transparent`,
        )}
        style={style}
      />
    </div>
  );
}
