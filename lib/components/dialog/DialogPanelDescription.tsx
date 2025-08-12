import { cn } from "#/utils";

interface DialogPanelDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogPanelDescription({
  children,
  className,
}: Readonly<DialogPanelDescriptionProps>) {
  return (
    <p
      className={cn(
        "text-center text-(length:--dialog-description-font-size) leading-(--dialog-description-line-height) font-(--dialog-description-font-weight) text-(--dialog-description-color)",
        className,
      )}
    >
      {children}
    </p>
  );
}
