import { Slot } from "@radix-ui/react-slot";
import { useDialogContextInternal } from "./context/useDialogContextInternal";

interface DialogPanelSlotButtonConfirmProps {
  children: React.ReactNode;
}

export function DialogPanelSlotButtonConfirm({
  children,
}: Readonly<DialogPanelSlotButtonConfirmProps>) {
  const { onConfirm } = useDialogContextInternal();

  return (
    <Slot
      onClick={(e) => {
        e?.stopPropagation();
        onConfirm();
      }}
    >
      {children}
    </Slot>
  );
}
