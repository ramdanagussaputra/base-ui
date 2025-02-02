import SidebarPage from "@/components/SidebarPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/sidebar/overview",
    element: <SidebarPage />,
  },
]);
