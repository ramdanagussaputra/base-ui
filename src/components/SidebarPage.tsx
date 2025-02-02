import {
  Buildings2,
  Category,
  Musicnote,
  People,
  Profile2User,
  Setting,
} from "iconsax-react";

import { generateUniqueId } from "#/utils";
import { Sidebar } from "massive-base-ui";
import { useLocation, useNavigate } from "react-router";

const SidebarConfig = [
  {
    id: generateUniqueId("sidebar-"),
    groupTitle: "Membership",
    menus: [
      {
        name: "sidebar",
        icon: <Profile2User />,
        title: "Membership",
        subMenus: [
          {
            name: "sidebar-overview",
            title: "Overview",
            href: "/sidebar/overview",
          },
          {
            name: "membership-request",
            title: "Request",
            href: "/membership/request",
            subItems: [
              {
                name: "membership-request-on-request",
                title: "On Request",
                href: "/membership/request/on-request",
              },
              {
                name: "membership-request-on-validation",
                title: "On Validation",
                href: "/membership/request/on-validation",
              },
              {
                name: "membership-request-on-revised",
                title: "On Revised",
                href: "/membership/request/on-revised",
              },
              {
                name: "membership-request-on-approval",
                title: "On Approval",
                href: "/membership/request/on-approval",
              },
            ],
          },
          {
            name: "membership-contract",
            title: "Contract",
            href: "/membership/contract",
          },
          {
            name: "membership-list",
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
        name: "dashboard",
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
        name: "company",
        icon: <Buildings2 />,
        title: "Company",
        href: "/company",
      },
      {
        name: "member",
        icon: <People />,
        title: "Member",
        subMenus: [
          {
            name: "member-beneficiary",
            title: "Beneficiary",
            href: "/member/beneficiary",
          },
          {
            name: "member-beneficiary-contract",
            title: "Beneficiary Contract",
            href: "/member/beneficiary-contract",
          },
        ],
      },
      {
        name: "catalogue",
        icon: <Musicnote />,
        title: "Catalogue",
        subMenus: [
          {
            name: "catalogue-song",
            title: "Song",
            href: "/catalogue/song",
          },
          {
            name: "catalogue-publisher",
            title: "Publisher",
            href: "/catalogue/publisher",
          },
          {
            name: "catalogue-composer",
            title: "Composer",
            href: "/catalogue/composer",
          },
          {
            name: "catalogue-product",
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
        name: "configuration",
        icon: <Setting />,
        title: "Configuration",
        subMenus: [
          {
            name: "configuration-society",
            title: "Society",
            href: "/configuration/society",
          },
          {
            name: "configuration-territory",
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
    <div>
      <Sidebar navigateFunction={navigate} currentPath={pathname}>
        <div className="flex h-full flex-col justify-between">
          <div>
            <Sidebar.Header>Test</Sidebar.Header>
            <Sidebar.Body sidebarConfig={SidebarConfig} />
          </div>

          <Sidebar.Footer>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
          </Sidebar.Footer>
        </div>
      </Sidebar>
    </div>
  );
}

export default SidebarPage;
