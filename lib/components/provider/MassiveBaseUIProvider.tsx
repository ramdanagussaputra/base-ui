import { DialogProvider } from "#/components/dialog";

interface MassiveBaseUIProviderProps {
  children: React.ReactNode;
}

export function MassiveBaseUIProvider({
  children,
}: MassiveBaseUIProviderProps) {
  return <DialogProvider>{children}</DialogProvider>;
}
