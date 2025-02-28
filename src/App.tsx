import { RouterProvider } from "react-router";
import { router } from "@/router/Router";
import { MassiveBaseUIProvider } from "massive-base-ui";

function App() {
  return (
    <MassiveBaseUIProvider>
      <RouterProvider router={router} />
    </MassiveBaseUIProvider>
  );
}

export default App;
