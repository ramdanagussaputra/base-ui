import { Add } from "iconsax-react";

import Icon from "#/components/icon/Icon";

interface ModalHeaderProps {
  onClose: () => void;
}

export function ModalHeader({ onClose }: Readonly<ModalHeaderProps>) {
  return (
    <div className="border-secondary-100 flex items-center justify-between border-b px-6 py-4">
      <h2 className="text-h5-600 text-secondary-900">Edit Photo</h2>

      <button onClick={onClose} className="cursor-pointer">
        <Icon icon={Add} className="text-secondary-700 size-8 rotate-45" />
      </button>
    </div>
  );
}
