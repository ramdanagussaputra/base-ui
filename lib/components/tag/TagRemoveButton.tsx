import { Add } from "iconsax-react";
import { useTagContext } from "#/components/tag/context/useTagContext";

interface TagRemoveButtonProps {
  children?: React.ReactNode;
}

function TagRemoveButton({
  children = (
    <Add className="size-(--tag-close-button-size) rotate-45 text-(--tag-close-button-color)" />
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
