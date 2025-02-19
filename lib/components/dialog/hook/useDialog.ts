import { useDialogContext } from "#/components/dialog/context/useDialogContext";

export function useDialog() {
  const {
    closeDialog,
    showDialog: showDialogInternal,
    setCancelText,
    setConfirmText,
    setDescription,
    setIcon,
    setOnCancel,
    setOnConfirm,
    setTitle,
  } = useDialogContext();

  function showDialog({
    title,
    description,
    confirmText,
    cancelText,
    icon,
    onConfirm,
    onCancel,
  }: {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    icon?: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) {
    closeDialog?.();

    setCancelText?.(cancelText || "");
    setConfirmText?.(confirmText || "");
    setDescription?.(description || "");
    setIcon?.(icon || null);
    setOnCancel?.(() => onCancel || (() => {}));
    setOnConfirm?.(() => onConfirm || (() => {}));
    setTitle?.(title || "");

    showDialogInternal?.();
  }

  return {
    closeDialog,
    showDialog,
  };
}
