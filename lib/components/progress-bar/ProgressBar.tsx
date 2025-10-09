import { cn } from "#/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
}

export default function ProgressBar({
  progress,
  className,
  showPercentage = true,
  size = "md",
  variant = "primary",
}: Readonly<ProgressBarProps>) {
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const variantClasses = {
    primary: {
      track: "bg-secondary-100",
      fill: "bg-primary-600",
    },
    secondary: {
      track: "bg-secondary-100",
      fill: "bg-secondary-900",
    },
  };

  return (
    <div className={cn("flex w-full items-center", className)}>
      <div
        className={cn(
          "mr-4 flex-1 rounded-full",
          sizeClasses[size],
          variantClasses[variant].track,
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            variantClasses[variant].fill,
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        ></div>
      </div>

      {showPercentage && (
        <span className="text-secondary-700 text-xs font-normal">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
}
