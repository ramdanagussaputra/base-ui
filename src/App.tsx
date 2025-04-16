import { RouterProvider } from "react-router";
import { MassiveBaseUIProvider } from "massive-base-ui";

import { router } from "@/router/Router";

function App() {
  return (
    <MassiveBaseUIProvider>
      <RouterProvider router={router} />
    </MassiveBaseUIProvider>
  );
}

export default App;
