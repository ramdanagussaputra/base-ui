import { useDialogContext } from "#/components/dialog/context/useDialogContext";
import type {
  DialogConfig,
  DialogCallbacks,
} from "#/components/dialog/context/types";

interface ShowDialogProps extends DialogConfig, DialogCallbacks {
  isConfirmLoading?: boolean;
  // Legacy property names for backward compatibility
  dialogContent?: React.ReactNode;
  dialogType?: "regular" | "small";
}

/**
 * Modern dialog hook that provides a clean, declarative API for showing dialogs.
 * This hook follows clean code principles and the Law of Demeter.
 *
 * @example
 * ```typescript
 * const { showDialog, closeDialog } = useDialog();
 *
 * // Modern API (recommended)
 * showDialog({
 *   title: "Confirm Action",
 *   description: "Are you sure you want to continue?",
 *   confirmText: "Yes",
 *   cancelText: "No",
 *   content: <div>Custom content</div>,
 *   type: "small",
 *   onConfirm: () => console.log("Confirmed!"),
 *   onCancel: () => console.log("Cancelled!")
 * });
 *
 * // Legacy API (still supported)
 * showDialog({
 *   title: "Confirm Action",
 *   dialogContent: <div>Custom content</div>, // Legacy property name
 *   dialogType: "small", // Legacy property name
 * });
 * ```
 *
 * @note Property priority: `type` > `dialogType` > default "regular"
 * @note Property priority: `content` > `dialogContent` > null
 */
export function useDialog() {
  const { show, close, setCallbacks, setLoading } = useDialogContext();

  function showDialog({
    title,
    description,
    confirmText,
    cancelText,
    icon,
    content,
    type,
    onConfirm,
    onCancel,
    onClose,
    isConfirmLoading = false,
    // Legacy properties for backward compatibility
    dialogContent,
    dialogType,
  }: Readonly<ShowDialogProps>) {
    // Close any existing dialog first
    close();

    // Set up callbacks if provided
    if (onConfirm || onCancel || onClose) {
      setCallbacks({
        onConfirm: onConfirm
          ? () => {
              onConfirm();
              if (isConfirmLoading) {
                setLoading(true);
              }
            }
          : undefined,
        onCancel: onCancel
          ? () => {
              onCancel();
              setLoading(false);
            }
          : undefined,
        onClose,
      });
    }

    // Show dialog with configuration
    // Support both new and legacy property names
    // Priority: explicit type > explicit dialogType > default "regular"
    const dialogTypeToUse = type ?? dialogType ?? "regular";

    show({
      title: title || "",
      description: description || "",
      confirmText: confirmText || "",
      cancelText: cancelText || "",
      icon: icon || null,
      content: content || dialogContent || null, // Support both content and dialogContent
      type: dialogTypeToUse,
      isConfirmLoading,
    });
  }

  function closeDialog() {
    setLoading(false);
    close();
  }

  return {
    showDialog,
    closeDialog,
  };
}
