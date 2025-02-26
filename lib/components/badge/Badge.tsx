import { cn } from "#/utils";

interface BadgeProps {
  children: React.ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "info1"
    | "info2";
  size?: "small" | "medium";
}

export function Badge({
  children,
  color = "primary",
  size = "medium",
}: Readonly<BadgeProps>) {
  const isSmall = size === "small";
  const isMedium = size === "medium";

  const isPrimary = color === "primary";
  const isSecondary = color === "secondary";
  const isError = color === "error";
  const isWarning = color === "warning";
  const isSuccess = color === "success";
  const isInfo1 = color === "info1";
  const isInfo2 = color === "info2";

  return (
    <div
      className={cn(
        "flex w-fit items-center justify-center rounded-(--badge-rounded) font-(--badge-font-weight)",
        {
          "px-1.5 py-1 text-(length:--badge-medium-font-size) leading-(--badge-medium-line-height)":
            isMedium,
          "px-1 py-0.5 text-(length:--badge-small-font-size) leading-(--badge-small-line-height)":
            isSmall,
          "border border-(--badge-primary-border-color) bg-(--badge-primary-bg) text-(--badge-primary-text-color)":
            isPrimary,
          "border border-[var(--badge-secondary-border-color)] bg-[var(--badge-secondary-bg)] text-[var(--badge-secondary-text-color)]":
            isSecondary,
          "border border-[var(--badge-success-border-color)] bg-[var(--badge-success-bg)] text-[var(--badge-success-text-color)]":
            isSuccess,
          "border border-[var(--badge-error-border-color)] bg-[var(--badge-error-bg)] text-[var(--badge-error-text-color)]":
            isError,
          "border border-[var(--badge-warning-border-color)] bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text-color)]":
            isWarning,
          "border border-[var(--badge-info1-border-color)] bg-[var(--badge-info1-bg)] text-[var(--badge-info1-text-color)]":
            isInfo1,
          "border border-[var(--badge-info2-border-color)] bg-[var(--badge-info2-bg)] text-[var(--badge-info2-text-color)]":
            isInfo2,
        },
      )}
    >
      {children}
    </div>
  );
}
