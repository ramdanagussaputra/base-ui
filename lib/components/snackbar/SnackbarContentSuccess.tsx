import { forwardRef } from "react";
import { CustomContentProps, SnackbarContent } from "notistack";
import { Add } from "iconsax-react";

import { Snackbar } from "#/components/snackbar/Snackbar";
import tickSquareIcon from "#/components/snackbar/asset/tick-square.svg";
import { useSnackbar } from "./hook/useSnackbar";

interface SnackbarSuccessProps extends CustomContentProps {
  description?: string;
}

export const SnackbarContentSuccess = forwardRef<
  HTMLDivElement,
  SnackbarSuccessProps
>((props, ref) => {
  const { message, description, id } = props;
  const { removeSnackbar } = useSnackbar();

  const snackbarId = `${id}`;

  return (
    <SnackbarContent id={snackbarId} ref={ref} role="alert">
      <Snackbar color="success">
        <div className="flex items-start justify-between gap-5">
          <div className="flex gap-2.5">
            <img
              src={tickSquareIcon}
              alt="Tick Square Icon"
              className="size-[1.875rem]"
            />

            <div className="flex flex-col justify-center gap-0.5">
              <Snackbar.Title>{message}</Snackbar.Title>

              {description && (
                <Snackbar.Description>{description}</Snackbar.Description>
              )}
            </div>
          </div>

          <button
            className="cursor-pointer"
            onClick={() => removeSnackbar(snackbarId)}
          >
            <Add className="text-secondary-300 size-[1.875rem] rotate-45" />
          </button>
        </div>
      </Snackbar>
    </SnackbarContent>
  );
});
