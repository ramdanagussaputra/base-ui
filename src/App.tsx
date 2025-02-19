import { RouterProvider } from "react-router";
import { router } from "@/router/Router";
import { DialogProvider } from "massive-base-ui";

function App() {
  return (
    <DialogProvider>
      <RouterProvider router={router} />
    </DialogProvider>
  );
}

export default App;
