import { useSnackbar } from "notistack";
import { createContext, ReactNode } from "react";

type SnackbarContext = {
  color: "success" | "error";
  closeSnackbar?: () => void;
};

export const snackbarContext = createContext<SnackbarContext | undefined>({
  color: "success",
  closeSnackbar: undefined,
});

interface SnackbarProviderProps {
  children: ReactNode;
  value: SnackbarContext;
}

export function SnackbarProvider({
  children,
  value,
}: Readonly<SnackbarProviderProps>) {
  const { closeSnackbar } = useSnackbar();

  return (
    <snackbarContext.Provider value={{ ...value, closeSnackbar }}>
      {children}
    </snackbarContext.Provider>
  );
}
