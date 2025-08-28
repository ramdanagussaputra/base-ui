import React, { useState, useCallback } from "react";

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

const initialState: DialogState = {
  isOpen: false,
  type: "regular",
  title: "",
  description: "",
  confirmText: "",
  cancelText: "",
  icon: null,
  content: null,
  isConfirmLoading: false,
  confirmButton: undefined,
  cancelButton: undefined,
  onConfirm: undefined,
  onCancel: undefined,
  onClose: undefined,
};

export function useDialogState() {
  const [state, setState] = useState<DialogState>(initialState);

  const updateState = useCallback((updates: Partial<DialogState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const show = useCallback(
    (config: Partial<DialogConfig> = {}) => {
      updateState({ ...config, isOpen: true });
    },
    [updateState],
  );

  const close = useCallback(() => {
    const currentOnClose = state.onClose;
    updateState({
      isOpen: false,
      isConfirmLoading: false,
    });
    currentOnClose?.();
  }, [updateState, state.onClose]);

  const updateConfig = useCallback(
    (config: Partial<DialogConfig>) => {
      updateState(config);
    },
    [updateState],
  );

  const setCallbacks = useCallback(
    (callbacks: Partial<DialogCallbacks>) => {
      updateState(callbacks);
    },
    [updateState],
  );

  const setLoading = useCallback(
    (loading: boolean) => {
      updateState({ isConfirmLoading: loading });
    },
    [updateState],
  );

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    state,
    actions: {
      show,
      close,
      updateConfig,
      setCallbacks,
      setLoading,
    },
    reset,
  };
}
