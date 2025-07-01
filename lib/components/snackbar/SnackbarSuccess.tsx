import { Add } from "iconsax-react";
import Icon from "#/components/icon/Icon";

import { Snackbar } from "#/components/snackbar/Snackbar";
import tickSquareIcon from "#/components/snackbar/asset/tick-square.svg";

interface SnackbarSuccessProps {
  description?: string;
  title: string;
  closeSnackbar: () => void;
}

export function SnackbarSuccess({
  closeSnackbar,
  title,
  description,
}: Readonly<SnackbarSuccessProps>) {
  return (
    <Snackbar color="success">
      <div className="flex items-start justify-between gap-5">
        <div className="flex gap-2.5">
          <img
            src={tickSquareIcon}
            alt="Tick Square Icon"
            className="size-[1.875rem]"
          />

          <div className="flex flex-col justify-center gap-0.5">
            <Snackbar.Title>{title}</Snackbar.Title>

            {description && (
              <Snackbar.Description>{description}</Snackbar.Description>
            )}
          </div>
        </div>

        {closeSnackbar && (
          <button className="cursor-pointer" onClick={closeSnackbar}>
            <Icon
              icon={Add}
              className="text-secondary-300 size-[1.875rem] rotate-45"
            />
          </button>
        )}
      </div>
    </Snackbar>
  );
}

export default SnackbarSuccess;
