import { createBrowserRouter } from "react-router";

import SidebarPage from "@/page/SidebarPage";
import TablePage from "@/page/TablePage";
import FormsPage from "@/page/FormsPage";
import NavigationPage from "@/page/NavigationPage";
import Dialogpage from "@/page/DialogPage";
import ButtonsPage from "@/page/ButtonsPage";

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
  {
    path: "/navigation",
    element: <NavigationPage />,
  },
  {
    path: "/dialog",
    element: <Dialogpage />,
  },
  {
    path: "/buttons",
    element: <ButtonsPage />,
  },
]);
