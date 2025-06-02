import { SidebarConfig } from "#/components/sidebar/model";
import { SidebarBodyMenu } from "#/components/sidebar/SidebarBodyMenu";

export function SidebarBodyMenus({
  menus,
}: Readonly<Omit<SidebarConfig, "groupTitle" | "id">>) {
  return (
    <>
      {menus.map((menu) => (
        <SidebarBodyMenu
          key={menu.routerPathname}
          routerPathname={menu.routerPathname}
          icon={menu.icon}
          title={menu.title}
          subMenus={menu.subMenus}
          href={menu.href}
        />
      ))}
    </>
  );
}
