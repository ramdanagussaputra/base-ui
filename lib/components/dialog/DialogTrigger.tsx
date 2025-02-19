import { Slot } from "@radix-ui/react-slot";
import { useDialogContextInternal } from "#/components/dialog/context/useDialogContextInternal";

interface DialogTriggerProps {
  children: React.ReactNode;
}

export function DialogTrigger({ children }: Readonly<DialogTriggerProps>) {
  const { showDialog } = useDialogContextInternal();

  return <Slot onClick={showDialog}>{children}</Slot>;
}
