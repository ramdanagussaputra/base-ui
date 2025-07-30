import { Slot } from "@radix-ui/react-slot";

import { cn } from "#/utils";

interface SmallMessageBoxProps {
  variant?: "success" | "error";
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function SmallMessageBox({
  variant = "error",
  children,
  icon,
  fullWidth = true,
}: Readonly<SmallMessageBoxProps>) {
  const isSuccess = variant === "success";
  const isError = variant === "error";

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-md border px-3 py-[0.78125rem]",
        {
          "w-full": fullWidth,
          "w-fit": !fullWidth,
        },
        {
          "border-[var(--messagebox-success-border-color)] bg-[var(--messagebox-success-bg-color)]":
            isSuccess,
          "border-[var(--messagebox-error-border-color)] bg-[var(--messagebox-error-bg-color)]":
            isError,
        },
      )}
    >
      <Slot
        className={cn("size-4", {
          "text-[var(--messagebox-success-icon-color)]": isSuccess,
          "text-[var(--messagebox-error-icon-color)]": isError,
        })}
      >
        {icon}
      </Slot>

      <p
        className={cn("text-b4-400", {
          "text-[var(--small-messagebox-error-color)]": isError,
          "text-[var(--small-messagebox-success-color)]": isSuccess,
        })}
      >
        {children}
      </p>
    </div>
  );
}
