import { cn } from "#/utils";

interface DialogPanelTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogPanelTitle({
  children,
  className,
}: Readonly<DialogPanelTitleProps>) {
  return (
    <h3
      className={cn(
        "text-center text-(length:--dialog-title-font-size) leading-(--dialog-title-line-height) font-(--dialog-title-font-weight) text-(--dialog-title-color)",
        className,
      )}
    >
      {children}
    </h3>
  );
}
