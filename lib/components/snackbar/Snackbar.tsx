import { ReactNode } from "react";

import { SnackbarTitle } from "#/components/snackbar/SnackbarTitle";

import { SnackbarProvider } from "#/components/snackbar/context/SnackbarProvider";
import { SnackbarDescription } from "#/components/snackbar/SnackbarDescription";

import { cn } from "#/utils";

interface SnackbarProps {
  color?: "success" | "error";
  children: ReactNode;
  className?: string;
}

export function Snackbar({
  color = "success",
  children,
  className,
}: Readonly<SnackbarProps>) {
  const isSuccess = color === "success";
  const isError = color === "error";

  return (
    <SnackbarProvider value={{ color }}>
      <div
        className={cn(
          "w-fit max-w-[28.0625rem] rounded-(--snackbar-rounded) border px-5 py-3.5",
          {
            "border-(--snackbar-success-border-color) bg-(--snackbar-success-bg)":
              isSuccess,
            "border-(--snackbar-error-border-color) bg-(--snackbar-error-bg)":
              isError,
          },
          className,
        )}
      >
        {children}
      </div>
    </SnackbarProvider>
  );
}

Snackbar.Title = SnackbarTitle;
Snackbar.Description = SnackbarDescription;
