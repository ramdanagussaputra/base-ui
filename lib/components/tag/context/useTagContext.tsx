import { createContext, useContext } from "react";

type TagContext = {
  onRemove: () => void;
};

export const tagContext = createContext<TagContext | undefined>({
  onRemove: () => {},
});

export function useTagContext() {
  const context = useContext(tagContext);

  if (!context) {
    throw new Error("useTagContext must be used within a TagProvider");
  }

  return context;
}
