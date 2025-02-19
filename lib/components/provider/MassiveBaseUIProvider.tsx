import { DialogProvider } from "#/components/dialog";

interface MassiveBaseUIProviderProps {
  children: React.ReactNode;
}

function MassiveBaseUIProvider({ children }: MassiveBaseUIProviderProps) {
  return <DialogProvider>{children}</DialogProvider>;
}

export default MassiveBaseUIProvider;
