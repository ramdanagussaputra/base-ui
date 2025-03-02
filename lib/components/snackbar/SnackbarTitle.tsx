import { ReactNode } from "react";

interface SnackbarTitleProps {
  children: ReactNode;
}

export function SnackbarTitle({ children }: SnackbarTitleProps) {
  return (
    <h6 className="text-(length:--snackbar-title-font-size) leading-(--snackbar-title-line-height) font-(--snackbar-title-font-weight) text-(--snackbar-title-text-color)">
      {children}
    </h6>
  );
}
