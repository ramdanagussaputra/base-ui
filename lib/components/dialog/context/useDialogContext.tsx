import React, { createContext, useContext, useMemo } from "react";

import { DialogRenderer } from "./DialogRenderer";
import { useDialogState } from "./useDialogState";

type DialogType = "regular" | "small";

interface DialogButtonConfig {
  text?: string;
  size?: "extra-small" | "small" | "medium" | "large";
  color?: "primary" | "secondary" | "error";
  variant?: "solid" | "light" | "no-background" | "outline" | "link";
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

interface DialogConfig {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  type?: DialogType;
  isConfirmLoading?: boolean;
  confirmButton?: DialogButtonConfig;
  cancelButton?: DialogButtonConfig;
}

interface DialogCallbacks {
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

interface DialogState extends DialogConfig, DialogCallbacks {
  isOpen: boolean;
}

interface DialogActions {
  show: (config?: Partial<DialogConfig>) => void;
  close: () => void;
  updateConfig: (config: Partial<DialogConfig>) => void;
  setCallbacks: (callbacks: Partial<DialogCallbacks>) => void;
  setLoading: (loading: boolean) => void;
}

interface DialogContext extends DialogActions {
  state: DialogState;
}

const dialogContext = createContext<DialogContext | undefined>(undefined);

export function useDialogContext(): DialogContext {
  const context = useContext(dialogContext);

  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }

  return context;
}

interface DialogProviderProps {
  readonly children: React.ReactNode;
}

export function DialogProvider({ children }: Readonly<DialogProviderProps>) {
  const { state, actions } = useDialogState();

  const handleConfirm = () => {
    state.onConfirm?.();
  };

  const handleCancel = () => {
    actions.close();
    state.onCancel?.();
  };

  const handleClose = () => {
    actions.close();
  };

  const contextValue = useMemo(
    () => ({
      state,
      ...actions,
    }),
    [state, actions],
  );

  return (
    <dialogContext.Provider value={contextValue}>
      {children}
      <DialogRenderer
        state={state}
        onClose={handleClose}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </dialogContext.Provider>
  );
}

// Legacy API support - these functions provide backward compatibility
export function useDialog() {
  const context = useDialogContext();

  return {
    // Modern API
    show: context.show,
    close: context.close,
    updateConfig: context.updateConfig,
    setCallbacks: context.setCallbacks,
    setLoading: context.setLoading,
    state: context.state,

    // Legacy API
    showDialog: context.show,
    closeDialog: context.close,
    setTitle: (title: string) => context.updateConfig({ title }),
    setDescription: (description: string) =>
      context.updateConfig({ description }),
    setConfirmText: (confirmText: string) =>
      context.updateConfig({ confirmText }),
    setCancelText: (cancelText: string) => context.updateConfig({ cancelText }),
    setIcon: (icon: React.ReactNode) => context.updateConfig({ icon }),
    setDialogContent: (content: React.ReactNode) =>
      context.updateConfig({ content }),
    setDialogType: (type: "regular" | "small") =>
      context.updateConfig({ type }),
    setIsConfirmLoading: context.setLoading,
    setOnConfirm: (callback: () => void) =>
      context.setCallbacks({ onConfirm: callback }),
    setOnCancel: (callback: () => void) =>
      context.setCallbacks({ onCancel: callback }),
    setOnClose: (callback: () => void) =>
      context.setCallbacks({ onClose: callback }),
  };
}

// Modern convenience hook for common dialog patterns
export function useConfirmDialog() {
  const { show, setCallbacks } = useDialogContext();

  return {
    showConfirmDialog: (config: DialogConfig & DialogCallbacks) => {
      setCallbacks({
        onConfirm: config.onConfirm,
        onCancel: config.onCancel,
        onClose: config.onClose,
      });
      show(config);
    },
  };
}
