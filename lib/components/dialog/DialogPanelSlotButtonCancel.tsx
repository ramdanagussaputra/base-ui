import { Slot } from "@radix-ui/react-slot";
import { useDialogContextInternal } from "./context/useDialogContextInternal";

interface DialogPanelSlotButtonCancelProps {
  children: React.ReactNode;
}

export function DialogPanelSlotButtonCancel({
  children,
}: Readonly<DialogPanelSlotButtonCancelProps>) {
  const { onCancel } = useDialogContextInternal();

  return <Slot onClick={() => onCancel()}>{children}</Slot>;
}
