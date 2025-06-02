import TagRemoveButton from "#/components/tag/TagRemoveButton";
import { tagContext } from "#/components/tag/context/useTagContext";
import { cn } from "#/utils";

interface TagProps {
  children: React.ReactNode;
  onRemove: () => void;
  isRounded?: boolean;
}

export function Tag({
  children,
  onRemove,
  isRounded = false,
}: Readonly<TagProps>) {
  return (
    <tagContext.Provider value={{ onRemove }}>
      <div
        className={cn(
          "flex w-fit items-center gap-1.5 rounded-(--tag-rounded) border border-(--tag-border-color) bg-(--tag-bg) px-1.5 py-1 text-(length:--tag-font-size) leading-(--tag-line-height) font-(--tag-font-weight) text-(--tag-font-color) duration-150 has-[button:hover]:bg-(--tag-bg--hover)",
          {
            "rounded-full px-2.5": isRounded,
          },
        )}
      >
        {children}
      </div>
    </tagContext.Provider>
  );
}

Tag.RemoveButton = TagRemoveButton;
