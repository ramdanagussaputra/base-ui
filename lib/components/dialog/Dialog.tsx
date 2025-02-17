import { useMemo, useState } from "react";

import DialogTrigger from "#/components/dialog/DialogTrigger";

import { dialogContext } from "#/components/dialog/context/useDialogContext";

interface DialogProps {
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

export function Dialog({
  onCancel,
  onConfirm,
  children,
}: Readonly<DialogProps>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const value = useMemo(
    () => ({
      onConfirm,
      onCancel,
      showDialog: () => setIsDialogOpen(true),
      closeDialog: () => setIsDialogOpen(false),
      isDialogOpen,
    }),
    [onConfirm, onCancel, isDialogOpen],
  );

  return (
    <dialogContext.Provider value={value}>{children}</dialogContext.Provider>
  );
}

Dialog.Trigger = DialogTrigger;
