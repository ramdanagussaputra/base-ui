import { ReactNode } from "react";

interface SnackbarDescriptionProps {
  children: ReactNode;
}

export function SnackbarDescription({
  children,
}: Readonly<SnackbarDescriptionProps>) {
  return (
    <p className="text-(length:--snackbar-description-font-size) leading-(--snackbar-description-line-height) font-(--snackbar-description-font-weight) text-(--snackbar-description-text-color)">
      {children}
    </p>
  );
}
