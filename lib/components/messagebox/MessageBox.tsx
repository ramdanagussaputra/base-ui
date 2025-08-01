import { Add } from "iconsax-react";
import { Slot } from "@radix-ui/react-slot";
import Icon from "#/components/icon/Icon";

import { cn } from "#/utils";

export function MessageBox({
  variant = "info",
  title,
  children,
  action,
  onClose,
  icon,
}: Readonly<{
  variant?: "success" | "info" | "warning" | "error" | 'secondary';
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  icon?: React.ReactNode;
}>) {
  const isSuccess = variant === "success";
  const isInfo = variant === "info";
  const isWarning = variant === "warning";
  const isError = variant === "error";
  const isSecondary = variant === "secondary";

  return (
    <div
      className={cn("flex items-start gap-4 rounded-lg border p-3.5", {
        "border-[var(--messagebox-success-border-color)] bg-[var(--messagebox-success-bg-color)]":
          isSuccess,
        "border-[var(--messagebox-info-border-color)] bg-[var(--messagebox-info-bg-color)]":
          isInfo,
        "border-[var(--messagebox-warning-border-color)] bg-[var(--messagebox-warning-bg-color)]":
          isWarning,
        "border-[var(--messagebox-error-border-color)] bg-[var(--messagebox-error-bg-color)]":
          isError,
        "border-[var(--messagebox-secondary-border-color)] bg-[var(--messagebox-secondary-bg-color)]":
          isSecondary,
      })}
    >
      <Slot
        className={cn("size-9", {
          "text-[var(--messagebox-success-icon-color)]": isSuccess,
          "text-[var(--messagebox-info-icon-color)]": isInfo,
          "text-[var(--messagebox-warning-icon-color)]": isWarning,
          "text-[var(--messagebox-error-icon-color)]": isError,
          "text-[var(--messagebox-secondary-icon-color)]": isSecondary,
        })}
      >
        {icon}
      </Slot>

      <div className="flex flex-1 flex-col gap-1">
        <h6 className={cn("text-b2-600 text-[var(--messagebox-title-color)]")}>
          {title}
        </h6>

        <div className={cn("text-b3-400 text-[var(--messagebox-description-color)]")}>
          {children}
        </div>
      </div>

      {action && <div className="self-center">{action}</div>}

      {onClose && !action && (
        <button onClick={onClose} className="cursor-pointer">
          <Icon
            icon={Add}
            className="size-8 rotate-45 text-[var(--color-secondary-300)]"
            size={20}
          />
        </button>
      )}
    </div>
  );
}
