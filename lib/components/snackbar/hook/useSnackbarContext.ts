import { useContext } from "react";

import { snackbarContext } from "#/components/snackbar/context/SnackbarProvider";

export function useSnackbarContext() {
  const context = useContext(snackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }

  return context;
}
