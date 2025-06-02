import { useSnackbar as useNotistackSnackbar } from "notistack";

export function useSnackbar() {
  const { enqueueSnackbar, closeSnackbar } = useNotistackSnackbar();

  return { insertSnackbar: enqueueSnackbar, removeSnackbar: closeSnackbar };
}
