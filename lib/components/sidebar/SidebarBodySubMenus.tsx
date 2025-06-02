import { SidebarBodySubMenu as SidebarBodySubMenuType } from "#/components/sidebar/model";
import { SidebarBodySubMenu } from "#/components/sidebar/SidebarBodySubMenu";

interface SidebarBodySubMenusProps {
  subMenus: SidebarBodySubMenuType[];
}

export function SidebarBodySubMenus({
  subMenus,
}: Readonly<SidebarBodySubMenusProps>) {
  return (
    <div>
      {subMenus.map((subMenu) => (
        <SidebarBodySubMenu key={subMenu.routerPathname} {...subMenu} />
      ))}
    </div>
  );
}
