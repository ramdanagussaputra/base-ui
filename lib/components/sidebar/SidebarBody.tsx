import { SidebarConfig } from "#/components/sidebar/model";
import { SidebarBodyMenus } from "#/components/sidebar/SidebarBodyMenus";

interface SidebarBodyProps {
  sidebarConfig: SidebarConfig[];
}

export function SidebarBody({ sidebarConfig }: Readonly<SidebarBodyProps>) {
  return (
    <div className="overflow-auto">
      {sidebarConfig.map((sidebarGroup) => {
        const hasGroup = !!sidebarGroup.groupTitle;

        if (hasGroup) {
          return (
            <div key={sidebarGroup.id} className="mb-[0.625rem] px-5">
              <span className="text-primary-500 b-13-20-500 px-1 uppercase">
                {sidebarGroup?.groupTitle}
              </span>
              <SidebarBodyMenus menus={sidebarGroup.menus} />
            </div>
          );
        }

        return (
          <div key={sidebarGroup.id} className="mb-[0.625rem] px-5">
            <SidebarBodyMenus menus={sidebarGroup.menus} />
          </div>
        );
      })}
    </div>
  );
}
