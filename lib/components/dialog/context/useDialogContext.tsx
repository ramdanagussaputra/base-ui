import React, { createContext, useContext, useMemo, useState } from "react";

import { Dialog } from "#/components/dialog/Dialog";
import { Button } from "#/components/button/Button";

export type DialogContext = {
  setOnConfirm?: (callback: () => void) => void;
  setOnCancel?: (callback: () => void) => void;
  showDialog?: () => void;
  closeDialog?: () => void;
  setTitle?: (title: string) => void;
  setDescription?: (text: string) => void;
  setConfirmText?: (text: string) => void;
  setCancelText?: (text: string) => void;
  setIcon?: (icon: React.ReactNode) => void;
  setIsConfirmLoading?: (loading: boolean) => void;
  setOnClose?: (callback: () => void) => void;
};

export const dialogContext = createContext<DialogContext | undefined>({
  closeDialog: () => {},
  showDialog: () => {},
  setCancelText: () => {},
  setConfirmText: () => {},
  setDescription: () => {},
  setIcon: () => {},
  setOnCancel: () => {},
  setOnConfirm: () => {},
  setTitle: () => {},
  setIsConfirmLoading: () => {},
  setOnClose: () => {},
});

export function useDialogContext() {
  const context = useContext(dialogContext);

  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }

  return context;
}

interface DialogProviderProps {
  children: React.ReactNode;
}

export function DialogProvider({ children }: Readonly<DialogProviderProps>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [onClose, setOnClose] = useState<null | (() => void)>(null);
  const [cancelText, setCancelText] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [icon, setIcon] = useState<null | React.ReactNode>(null);
  const [onCancel, setOnCancel] = useState<null | (() => void)>(null);
  const [onConfirm, setOnConfirm] = useState<null | (() => void)>(null);
  const [title, setTitle] = useState("");
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  const value = useMemo(
    () => ({
      closeDialog: () => setIsDialogOpen(false),
      showDialog: () => setIsDialogOpen(true),
      setCancelText: (text: string) => setCancelText(text),
      setConfirmText: (text: string) => setConfirmText(text),
      setDescription: (text: string) => setDescriptionText(text),
      setIcon: (icon: React.ReactNode) => setIcon(icon),
      setOnCancel: (callback: () => void) => setOnCancel(callback),
      setOnConfirm: (callback: () => void) => setOnConfirm(callback),
      setTitle: (text: string) => setTitle(text),
      setIsConfirmLoading: (value: boolean) => setIsConfirmLoading(value),
      setOnClose: (callback: () => void) => setOnClose(callback),
    }),
    [],
  );

  return (
    <dialogContext.Provider value={value}>
      {children}

      <Dialog
        isDialogOpen={isDialogOpen}
        closeDialog={() => {
          setIsConfirmLoading(false);
          setIsDialogOpen(false);
          onClose?.();
        }}
        showDialog={() => setIsDialogOpen(true)}
        onCancel={onCancel || (() => {})}
        onConfirm={onConfirm || (() => {})}
      >
        <Dialog.Panel className="flex items-center justify-center">
          {icon}

          <div className="flex flex-col items-center justify-center gap-5">
            <Dialog.Panel.Title>{title}</Dialog.Panel.Title>

            <Dialog.Panel.Description>
              {descriptionText}
            </Dialog.Panel.Description>
          </div>

          <div className="flex w-full gap-2.5">
            {cancelText && (
              <Dialog.Panel.SlotButtonCancel>
                <Button variant="outline" color="secondary" className="w-full">
                  {cancelText}
                </Button>
              </Dialog.Panel.SlotButtonCancel>
            )}

            {confirmText && (
              <Dialog.Panel.SlotButtonConfirm>
                <Button className="w-full" isLoading={isConfirmLoading}>
                  {confirmText}
                </Button>
              </Dialog.Panel.SlotButtonConfirm>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
    </dialogContext.Provider>
  );
}
