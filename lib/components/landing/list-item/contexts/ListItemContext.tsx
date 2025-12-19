import { createContext, useContext } from "react";
import { ListItemLandingProps } from "#/components/landing/list-item/ListItem";

export const ListItemContext = createContext<Omit<
  ListItemLandingProps,
  "children"
> | null>(null);

export const useListItemContext = () => {
  const context = useContext(ListItemContext);
  if (!context) {
    throw new Error("useListItemContext must be used within a ListItemLanding");
  }
  return context;
};
