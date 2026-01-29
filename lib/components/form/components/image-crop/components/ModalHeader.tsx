import { CloseCircle } from "iconsax-react";

import Icon from "#/components/icon/Icon";

interface ModalHeaderProps {
  onClose: () => void;
}

export function ModalHeader({ onClose }: Readonly<ModalHeaderProps>) {
  return (
    <div className="border-secondary-100 flex items-center justify-between border-b px-6 py-4">
      <h2 className="text-h5-600 text-secondary-900">Edit Photo</h2>
      <button
        type="button"
        onClick={onClose}
        className="text-secondary-400 hover:text-secondary-600 transition-colors"
      >
        <Icon icon={CloseCircle} variant="Bold" className="size-6" />
      </button>
    </div>
  );
}
