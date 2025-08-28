import { useDialogContext } from "#/components/dialog/context/useDialogContext";
import React from "react";

type Type = "regular" | "small";

interface DialogButtonConfig {
  text?: string;
  size?: "extra-small" | "small" | "medium" | "large";
  color?: "primary" | "secondary" | "error";
  variant?: "solid" | "light" | "no-background" | "outline" | "link";
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

interface DConfig {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  type?: Type;
  isConfirmLoading?: boolean;
  confirmButton?: DialogButtonConfig;
  cancelButton?: DialogButtonConfig;
}

interface DCallbacks {
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

interface ShowDialogProps extends DConfig, DCallbacks {
  isConfirmLoading?: boolean;
  // Legacy property names for backward compatibility
  dialogContent?: React.ReactNode;
  dialogType?: "regular" | "small";
}

// Export types for external use
export type {
  DialogButtonConfig,
  DConfig as DialogConfig,
  DCallbacks as DialogCallbacks,
};

/**
 * Modern dialog hook that provides a clean, declarative API for showing dialogs.
 * This hook follows clean code principles and the Law of Demeter.
 *
 * @example
 * ```typescript
 * const { showDialog, closeDialog, confirm } = useDialog();
 *
 * // Modern API (recommended)
 * showDialog({
 *   title: "Confirm Action",
 *   description: "Are you sure you want to continue?",
 *   confirmText: "Yes",
 *   cancelText: "No",
 *   content: <div>Custom content</div>,
 *   type: "small",
 *   confirmButton: {
 *     text: "Confirm",
 *     color: "primary",
 *     variant: "solid",
 *     size: "medium"
 *   },
 *   cancelButton: {
 *     text: "Cancel",
 *     color: "secondary",
 *     variant: "outline",
 *     size: "medium"
 *   },
 *   onConfirm: () => console.log("Confirmed!"),
 *   onCancel: () => console.log("Cancelled!")
 * });
 *
 * // Convenient confirm method
 * confirm({
 *   title: "Delete Item",
 *   description: "This action cannot be undone.",
 *   confirmButton: { text: "Delete", color: "error" },
 *   cancelButton: { text: "Keep", variant: "outline" },
 *   onConfirm: () => deleteItem(),
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
    confirmButton,
    cancelButton,
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
      confirmButton,
      cancelButton,
    });
  }

  function closeDialog() {
    setLoading(false);
    close();
  }

  function confirm(options: {
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    confirmButton?: DialogButtonConfig;
    cancelButton?: DialogButtonConfig;
    onConfirm?: () => void;
    onCancel?: () => void;
    type?: Type;
  }) {
    showDialog({
      title: options.title,
      description: options.description,
      confirmText: options.confirmText,
      cancelText: options.cancelText,
      confirmButton: options.confirmButton,
      cancelButton: options.cancelButton,
      type: options.type || "regular",
      onConfirm: options.onConfirm
        ? () => {
            options.onConfirm?.();
            closeDialog(); // Auto-close after confirm
          }
        : undefined,
      onCancel: options.onCancel
        ? () => {
            options.onCancel?.();
            closeDialog(); // Auto-close after cancel
          }
        : () => {
            closeDialog(); // Auto-close if no custom cancel handler
          },
    });
  }

  return {
    showDialog,
    closeDialog,
    confirm,
  };
}
