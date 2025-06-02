interface DialogPanelTitleProps {
  children: React.ReactNode;
}

export function DialogPanelTitle({
  children,
}: Readonly<DialogPanelTitleProps>) {
  return (
    <h3 className="text-center text-(length:--dialog-title-font-size) leading-(--dialog-title-line-height) font-(--dialog-title-font-weight) text-(--dialog-title-color)">
      {children}
    </h3>
  );
}
