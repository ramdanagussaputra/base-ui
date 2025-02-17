import { createContext, useContext } from "react";

type DialogContext = {
  onConfirm: () => void;
  onCancel: () => void;
  showDialog: () => void;
  closeDialog: () => void;
  isDialogOpen: boolean;
};

export const dialogContext = createContext<DialogContext | undefined>({
  onConfirm: () => {},
  onCancel: () => {},
  showDialog: () => {},
  closeDialog: () => {},
  isDialogOpen: false,
});

export function useDialogContext() {
  const context = useContext(dialogContext);

  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }

  return context;
}
