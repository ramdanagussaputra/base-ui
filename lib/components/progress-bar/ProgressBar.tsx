import { cn } from "#/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function ProgressBar({ 
  progress, 
  className, 
  showPercentage = true,
  size = "md" 
}: ProgressBarProps) {
  const sizeClasses = {
    sm: "h-1",
    md: "h-2", 
    lg: "h-3"
  };

  return (
    <div className={cn("flex w-full items-center", className)}>
      <div className={cn("bg-secondary-100 mr-4 flex-1 rounded-full", sizeClasses[size])}>
        <div
          className="bg-primary-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        ></div>
      </div>

      {showPercentage && (
        <span className="text-xs text-secondary-700 font-normal">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
}