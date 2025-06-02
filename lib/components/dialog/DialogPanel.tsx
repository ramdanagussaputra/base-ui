import {
  Dialog,
  DialogBackdrop,
  DialogPanel as DialogPanelHeadless,
} from "@headlessui/react";

import { DialogPanelTitle } from "#/components/dialog/DialogPanelTitle";
import { DialogPanelDescription } from "#/components/dialog/DialogPanelDescription";
import { DialogPanelSlotButtonConfirm } from "#/components/dialog/DialogPanelSlotButtonConfirm";
import { DialogPanelSlotButtonCancel } from "#/components/dialog/DialogPanelSlotButtonCancel";

import { useDialogContextInternal } from "#/components/dialog/context/useDialogContextInternal";
import { cn } from "#/utils";

interface DialogPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogPanel({
  children,
  className,
}: Readonly<DialogPanelProps>) {
  const { closeDialog, isDialogOpen } = useDialogContextInternal();

  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
      className="relative z-50 outline-none"
    >
      <DialogBackdrop className="fixed inset-0 z-50 bg-(--dialog-backdrop-color)" />

      <div className="fixed inset-0 z-50 flex min-h-full w-screen items-center justify-center overflow-y-auto p-4">
        <DialogPanelHeadless
          transition
          className="z-50 h-auto w-auto duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
        >
          <div
            className={cn(
              "bg-neutral-0 flex w-(--dialog-panel-width) flex-col gap-[1.875rem] rounded-xl px-[1.875rem] py-10 shadow-[0px_0px_18px_0px_rgba(0,0,0,0.09)]",
              className,
            )}
          >
            {children}
          </div>
        </DialogPanelHeadless>
      </div>
    </Dialog>
  );
}

DialogPanel.Title = DialogPanelTitle;
DialogPanel.Description = DialogPanelDescription;
DialogPanel.SlotButtonConfirm = DialogPanelSlotButtonConfirm;
DialogPanel.SlotButtonCancel = DialogPanelSlotButtonCancel;
