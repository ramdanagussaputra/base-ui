import { Slot } from "@radix-ui/react-slot";
import { useDialogContext } from "#/components/dialog/context/useDialogContext";

interface DialogTriggerProps {
  children: React.ReactNode;
}

function DialogTrigger({ children }: Readonly<DialogTriggerProps>) {
  const { showDialog } = useDialogContext();

  return <Slot onClick={showDialog}>{children}</Slot>;
}

export default DialogTrigger;
