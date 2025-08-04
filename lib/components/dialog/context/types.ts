import React from "react";

export type DialogType = "regular" | "small";

export interface DialogConfig {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  type?: DialogType;
  isConfirmLoading?: boolean;
}

export interface DialogCallbacks {
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

export interface DialogState extends DialogConfig, DialogCallbacks {
  isOpen: boolean;
}

export interface DialogActions {
  show: (config?: Partial<DialogConfig>) => void;
  close: () => void;
  updateConfig: (config: Partial<DialogConfig>) => void;
  setCallbacks: (callbacks: Partial<DialogCallbacks>) => void;
  setLoading: (loading: boolean) => void;
}

export interface DialogContext extends DialogActions {
  state: DialogState;
}
