export interface SidebarBodySubMenu {
  name: string;
  title: string;
  href?: string;
  subItems?: Omit<SidebarBodySubMenu, "subItems">[];
}

export interface SidebarBodyMenu {
  name: string;
  icon: React.ReactNode;
  title: string;
  href?: string;
  subMenus?: SidebarBodySubMenu[];
}
export interface SidebarConfig {
  id: string;
  groupTitle: string | null;
  menus: SidebarBodyMenu[];
}
