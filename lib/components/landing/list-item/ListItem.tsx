import FooterText from "./components/FooterText";
import Header from "./components/Header";
import Item from "./components/Item";
import ItemContainer from "./components/ItemContainer";
import PaginationControl from "./components/PaginationControl";
import PaginationIndicator from "./components/PaginationIndicator";
import Searchbar from "./components/Searchbar";
import ViewAllAction from "./components/ViewAllAction";
import { ListItemContext } from "./contexts/ListItemContext";

export interface ListItemLandingProps {
  children: React.ReactNode;
  title: string;
  description: string;
  currentPage?: number;
  handleNextPage?: () => void;
  handlePrevPage?: () => void;
  maxPage?: number;
}

function ListItemLandingRoot({
  children,
  title,
  description,
  currentPage,
  maxPage,
  handleNextPage,
  handlePrevPage,
}: ListItemLandingProps) {
  return (
    <ListItemContext.Provider
      value={{
        title,
        description,
        currentPage,
        maxPage,
        handleNextPage,
        handlePrevPage,
      }}
    >
      <div className="flex flex-col gap-5">{children}</div>
    </ListItemContext.Provider>
  );
}

const HeaderWithSubComponents = Object.assign(Header, {
  PaginationControl,
  ViewAllAction,
});

const ItemNamespace = Object.assign(Item, {
  Container: ItemContainer,
  Content: Item,
});

export const ListItemLanding = Object.assign(ListItemLandingRoot, {
  Header: HeaderWithSubComponents,
  Item: ItemNamespace,
  PaginationIndicator,
  FooterText,
  Searchbar,
});
