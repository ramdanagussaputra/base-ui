import { createBrowserRouter } from "react-router";

import SidebarPage from "@/page/SidebarPage";
import TablePage from "@/page/TablePage";
import FormsPage from "@/page/FormsPage";

export const router = createBrowserRouter([
  {
    path: "/sidebar/overview",
    element: <SidebarPage />,
  },
  {
    path: "/table",
    element: <TablePage />,
  },
  {
    path: "/forms",
    element: <FormsPage />,
  },
]);
