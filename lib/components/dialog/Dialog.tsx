import { useMemo } from "react";

import { DialogTrigger } from "#/components/dialog/DialogTrigger";
import { DialogPanel } from "#/components/dialog/DialogPanel";

import { dialogContextInternal } from "#/components/dialog/context/useDialogContextInternal";

interface DialogProps {
  onConfirm: () => void;
  onCancel: () => void;
  isDialogOpen: boolean;
  showDialog: () => void;
  closeDialog: () => void;
  children: React.ReactNode;
}

export function Dialog({
  onCancel = () => {},
  onConfirm = () => {},
  closeDialog = () => {},
  showDialog = () => {},
  isDialogOpen = false,
  children,
}: Readonly<DialogProps>) {
  const value = useMemo(
    () => ({
      onConfirm,
      onCancel,
      showDialog,
      closeDialog,
      isDialogOpen,
    }),
    [onConfirm, onCancel, isDialogOpen, showDialog, closeDialog],
  );

  return (
    <dialogContextInternal.Provider value={value}>
      {children}
    </dialogContextInternal.Provider>
  );
}

Dialog.Trigger = DialogTrigger;
Dialog.Panel = DialogPanel;
