import { Add } from "iconsax-react";
import { useTagContext } from "#/components/tag/context/useTagContext";
import Icon from "#/components/icon/Icon";

interface TagRemoveButtonProps {
  children?: React.ReactNode;
}

function TagRemoveButton({
  children = (
    <Icon
      icon={Add}
      className="size-(--tag-close-button-size) rotate-45 text-(--tag-close-button-color)"
    />
  ),
}: Readonly<TagRemoveButtonProps>) {
  const { onRemove } = useTagContext();

  return (
    <button className="has-hover:cursor-pointer" onClick={onRemove}>
      {children}
    </button>
  );
}

export default TagRemoveButton;
