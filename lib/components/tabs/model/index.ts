export interface TabsProps {
  id?: string;
  tabs: {
    name: string;
    content: React.ReactNode;
  }[];
  tabsContainerClassName?: string;
  contentContainerClassName?: string;
  tabsWrapperClassName?: string;
  tabsOuterWrapperClassName?: string;
  onTabClick?: (tabIndex: number) => void;
  selectedIndex?: number;
}
