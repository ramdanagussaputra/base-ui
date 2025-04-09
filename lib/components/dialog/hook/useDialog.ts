import { useDialogContext } from "#/components/dialog/context/useDialogContext";

interface ShowDialogProps {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  isConfirmLoading?: boolean;
}

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
    setIsConfirmLoading,
  } = useDialogContext();

  function showDialog({
    title,
    description,
    confirmText,
    cancelText,
    icon,
    onConfirm,
    onCancel,
    isConfirmLoading = false,
  }: Readonly<ShowDialogProps>) {
    closeDialog?.();

    setCancelText?.(cancelText || "");
    setConfirmText?.(confirmText || "");
    setDescription?.(description || "");
    setIcon?.(icon || null);
    setOnCancel?.(() =>
      onCancel
        ? () => {
            onCancel();
            setIsConfirmLoading?.(false);
          }
        : () => {},
    );
    setOnConfirm?.(() =>
      onConfirm
        ? () => {
            onConfirm();

            if (isConfirmLoading) {
              setIsConfirmLoading?.(true);
            }
          }
        : () => {},
    );
    setTitle?.(title || "");

    showDialogInternal?.();
  }

  return {
    closeDialog: closeDialog!,
    showDialog,
  };
}
