import TagRemoveButton from "#/components/tag/TagRemoveButton";
import { tagContext } from "#/components/tag/context/useTagContext";

interface TagProps {
  children: React.ReactNode;
  onRemove: () => void;
}

export function Tag({ children, onRemove }: Readonly<TagProps>) {
  return (
    <tagContext.Provider value={{ onRemove }}>
      <div className="group flex w-fit items-center gap-1.5 rounded-(--tag-rounded) border border-(--tag-border-color) bg-(--tag-bg) px-1.5 py-1 text-(length:--tag-font-size) leading-(--tag-line-height) font-(--tag-font-weight) text-(--tag-font-color) duration-150 hover:bg-(--tag-bg--hover)">
        {children}
      </div>
    </tagContext.Provider>
  );
}

Tag.RemoveButton = TagRemoveButton;

// interface TagProps {
//   children: React.ReactNode;
//   color?:
//     | "primary"
//     | "secondary"
//     | "error"
//     | "warning"
//     | "success"
//     | "info1"
//     | "info2";
//   size?: "small" | "medium";
// }

// export function Tag({ children, color = 'primary', size = 'medium' }: Readonly<TagProps>) {
//   const isSmall = size === "small";
//   const isMedium = size === "medium";

//   const isPrimary = color === "primary";
//   const isSecondary = color === "secondary";
//   const isError = color === "error";
//   const isWarning = color === "warning";
//   const isSuccess = color === "success";
//   const isInfo1 = color === "info1";
//   const isInfo2 = color === "info2";

//   return <div className="">{children}</div>;
// }
