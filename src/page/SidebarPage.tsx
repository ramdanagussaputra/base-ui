import {
  ArrowRight2,
  Buildings2,
  Category,
  Musicnote,
  People,
  Profile2User,
  Setting,
} from "iconsax-react";

import { generateUniqueId } from "#/utils";
import { Sidebar, MainLayout, Breadcrumb } from "massive-base-ui";
import { useLocation, useNavigate } from "react-router";

const SidebarConfig = [
  {
    id: generateUniqueId("sidebar-"),
    groupTitle: "Membership",
    menus: [
      {
        routerPathname: "sidebar",
        icon: <Profile2User />,
        title: "Membership",
        subMenus: [
          {
            routerPathname: "sidebar-overview",
            title: "Overview",
            href: "/sidebar/overview",
          },
          {
            routerPathname: "membership-request",
            title: "Request",
            href: "/membership/request",
            subItems: [
              {
                routerPathname: "membership-request-on-request",
                title: "On Request",
                href: "/membership/request/on-request",
              },
              {
                routerPathname: "membership-request-on-validation",
                title: "On Validation",
                href: "/membership/request/on-validation",
              },
              {
                routerPathname: "membership-request-on-revised",
                title: "On Revised",
                href: "/membership/request/on-revised",
              },
              {
                routerPathname: "membership-request-on-approval",
                title: "On Approval",
                href: "/membership/request/on-approval",
              },
            ],
          },
          {
            routerPathname: "membership-contract",
            title: "Contract",
            href: "/membership/contract",
          },
          {
            routerPathname: "membership-list",
            title: "List",
            href: "/membership/list",
          },
        ],
      },
    ],
  },
  {
    id: generateUniqueId("sidebar-"),
    groupTitle: null,
    menus: [
      {
        routerPathname: "dashboard",
        icon: <Category />,
        title: "Dashboard",
        href: "/",
      },
    ],
  },
  {
    id: generateUniqueId("sidebar-"),
    groupTitle: "Documentation",
    menus: [
      {
        routerPathname: "company",
        icon: <Buildings2 />,
        title: "Company",
        href: "/company",
      },
      {
        routerPathname: "member",
        icon: <People />,
        title: "Member",
        subMenus: [
          {
            routerPathname: "member-beneficiary",
            title: "Beneficiary",
            href: "/member/beneficiary",
          },
          {
            routerPathname: "member-beneficiary-contract",
            title: "Beneficiary Contract",
            href: "/member/beneficiary-contract",
          },
        ],
      },
      {
        routerPathname: "catalogue",
        icon: <Musicnote />,
        title: "Catalogue",
        subMenus: [
          {
            routerPathname: "catalogue-song",
            title: "Song",
            href: "/catalogue/song",
          },
          {
            routerPathname: "catalogue-publisher",
            title: "Publisher",
            href: "/catalogue/publisher",
          },
          {
            routerPathname: "catalogue-composer",
            title: "Composer",
            href: "/catalogue/composer",
          },
          {
            routerPathname: "catalogue-product",
            title: "Product",
            href: "/catalogue/product",
          },
        ],
      },
    ],
  },
  {
    id: generateUniqueId("sidebar-"),
    groupTitle: null,
    menus: [
      {
        routerPathname: "configuration",
        icon: <Setting />,
        title: "Configuration",
        subMenus: [
          {
            routerPathname: "configuration-society",
            title: "Society",
            href: "/configuration/society",
          },
          {
            routerPathname: "configuration-territory",
            title: "Territory",
            href: "/configuration/territory",
          },
        ],
      },
    ],
  },
];

function SidebarPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <MainLayout
      renderHeader={() => (
        <header className="flex h-[80px] items-center px-5">
          <Breadcrumb
            urlPath={pathname}
            breadcrumbSeparator={<ArrowRight2 />}
            navigateFunction={navigate}
          />
        </header>
      )}
      renderSidebar={() => (
        <Sidebar navigateFunction={navigate} currentPath={pathname}>
          <div className="flex h-full flex-col justify-between">
            <div>
              <Sidebar.Header> </Sidebar.Header>
              <Sidebar.Body sidebarConfig={SidebarConfig} />
            </div>
            {/* 
            <Sidebar.Footer>
              <div className="px-10">
                <div>Footer Content Item</div>
                <div>Footer Content Item</div>
                <div>Footer Content Item</div>
              </div>
            </Sidebar.Footer> */}
          </div>
        </Sidebar>
      )}
    >
      <div className="px-5">This is content</div>
    </MainLayout>
  );
}

export default SidebarPage;
