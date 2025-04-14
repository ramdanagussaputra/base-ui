export interface TabsProps {
  id?: string;
  tabs: {
    name: string;
    content: React.ReactNode;
  }[];
  tabsContainerClassName?: string;
  contentContainerClassName?: string;
  onTabClick?: () => void;
}
