interface DialogPanelDescriptionProps {
  children: React.ReactNode;
}

export function DialogPanelDescription({
  children,
}: Readonly<DialogPanelDescriptionProps>) {
  return (
    <p className="text-(length:--dialog-description-font-size) leading-(--dialog-description-line-height) font-(--dialog-description-font-weight) text-(--dialog-description-color)">
      {children}
    </p>
  );
}
