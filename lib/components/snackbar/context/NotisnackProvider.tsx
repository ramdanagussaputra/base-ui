import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";

import { SnackbarContentSuccess } from "#/components/snackbar/SnackbarContentSuccess";

interface NotisnackProviderProps {
  children: ReactNode;
  domRoot?: HTMLElement;
}

export function NotisnackProvider({
  children,
  domRoot = document.body,
}: NotisnackProviderProps) {
  return (
    <SnackbarProvider
      maxSnack={4}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      domRoot={domRoot}
      preventDuplicate
      Components={{
        success: SnackbarContentSuccess,
      }}
      classes={{
        containerRoot: "absolute",
      }}
    >
      {children}
    </SnackbarProvider>
  );
}
