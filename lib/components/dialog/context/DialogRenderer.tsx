import { Dialog } from "#/components/dialog/Dialog";
import { Button } from "#/components/button/Button";
import React from "react";

type DialogType = "regular" | "small";

interface DialogConfig {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  type?: DialogType;
  isConfirmLoading?: boolean;
}

interface DialogCallbacks {
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

interface DialogState extends DialogConfig, DialogCallbacks {
  isOpen: boolean;
}

interface DialogRendererProps {
  readonly state: DialogState;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
}

export function DialogRenderer({
  state,
  onClose,
  onConfirm,
  onCancel,
}: Readonly<DialogRendererProps>) {
  if (!state.isOpen) {
    return null;
  }

  return (
    <Dialog
      isDialogOpen={state.isOpen}
      closeDialog={onClose}
      showDialog={() => {}} // Not needed in this context
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      {state.type === "small" ? (
        <SmallDialogContent state={state} />
      ) : (
        <RegularDialogContent state={state} />
      )}
    </Dialog>
  );
}

function SmallDialogContent({ state }: Readonly<{ state: DialogState }>) {
  return (
    <Dialog.Panel className="w-full max-w-[36.75rem]">
      <div>
        <div className="mb-4">
          <Dialog.Panel.Title className="text-left">
            {state.title}
          </Dialog.Panel.Title>
        </div>

        <div className="mb-7 flex flex-col gap-4">
          <Dialog.Panel.Description className="text-left">
            {state.description}
          </Dialog.Panel.Description>
          {state.content}
        </div>

        <DialogActions
          cancelText={state.cancelText}
          confirmText={state.confirmText}
          isConfirmLoading={state.isConfirmLoading}
          variant="small"
        />
      </div>
    </Dialog.Panel>
  );
}

function RegularDialogContent({ state }: Readonly<{ state: DialogState }>) {
  return (
    <Dialog.Panel className="flex items-center justify-center">
      {state.icon}

      <div className="flex flex-col items-center justify-center gap-5">
        <Dialog.Panel.Title>{state.title}</Dialog.Panel.Title>
        <Dialog.Panel.Description>{state.description}</Dialog.Panel.Description>
        {state.content}
      </div>

      <DialogActions
        cancelText={state.cancelText}
        confirmText={state.confirmText}
        isConfirmLoading={state.isConfirmLoading}
        variant="regular"
      />
    </Dialog.Panel>
  );
}

interface DialogActionsProps {
  readonly cancelText?: string;
  readonly confirmText?: string;
  readonly isConfirmLoading?: boolean;
  readonly variant: "small" | "regular";
}

function DialogActions({
  cancelText,
  confirmText,
  isConfirmLoading,
  variant,
}: Readonly<DialogActionsProps>) {
  const isSmall = variant === "small";
  const containerClass = isSmall
    ? "flex justify-end gap-3"
    : "flex w-full gap-2.5";
  const buttonClass = isSmall ? "" : "w-full";

  return (
    <div className={containerClass}>
      {cancelText && (
        <Dialog.Panel.SlotButtonCancel>
          <Button
            variant="outline"
            color="secondary"
            className={buttonClass}
            type="button"
          >
            {cancelText}
          </Button>
        </Dialog.Panel.SlotButtonCancel>
      )}

      {confirmText && (
        <Dialog.Panel.SlotButtonConfirm>
          <Button
            className={buttonClass}
            isLoading={isConfirmLoading}
            type="button"
          >
            {confirmText}
          </Button>
        </Dialog.Panel.SlotButtonConfirm>
      )}
    </div>
  );
}
