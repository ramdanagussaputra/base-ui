import { Outlet, useLocation, useNavigate } from "react-router";
import { ColorSwatch } from "iconsax-react";
import {
  generateUniqueId,
  MainLayout as Layout,
  Sidebar,
} from "massive-base-ui";

function MainLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Layout
      // renderHeader={() => <div>Header</div>}
      renderSidebar={() => (
        <Sidebar navigateFunction={navigate} currentPath={pathname}>
          <div className="flex h-full flex-col justify-between">
            <div>
              <Sidebar.Header>
                <span className="text-primary-600 text-2xl">
                  Massive Base UI
                </span>
              </Sidebar.Header>
              <Sidebar.Body
                sidebarConfig={[
                  {
                    id: generateUniqueId("sidebar-"),
                    groupTitle: "Overview",
                    menus: [
                      {
                        title: "Styleguide",
                        routerPathname: "sidebar-styleguide",
                        href: "/overview/styleguide",
                        icon: <ColorSwatch />,
                      },
                    ],
                  },
                ]}
              />
            </div>

            <Sidebar.Footer>
              <div className="px-5">
                <p>&copy;2025 All rights reserved</p>
              </div>
            </Sidebar.Footer>
          </div>
        </Sidebar>
      )}
    >
      <Outlet />
    </Layout>
  );
}

export default MainLayout;
