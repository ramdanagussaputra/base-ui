import { createContext, useContext } from "react";

type DialogContextInternal = {
  onConfirm: () => void;
  onCancel: () => void;
  showDialog: () => void;
  closeDialog: () => void;
  isDialogOpen: boolean;
};

export const dialogContextInternal = createContext<
  DialogContextInternal | undefined
>({
  onConfirm: () => {},
  onCancel: () => {},
  showDialog: () => {},
  closeDialog: () => {},
  isDialogOpen: false,
});

export function useDialogContextInternal() {
  const context = useContext(dialogContextInternal);

  if (!context) {
    throw new Error(
      "useDialogContextInternal must be used within a DialogInternalProvider",
    );
  }

  return context;
}
