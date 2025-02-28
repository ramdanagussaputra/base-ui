import { DialogProvider } from "#/components/dialog";
import { StepperProvider } from "#/components/stepper/context/useStepperContext";
import { QueryParamsProvider } from "#/context/useQueryParamsContext";

interface MassiveBaseUIProviderProps {
  children: React.ReactNode;
}

export function MassiveBaseUIProvider({
  children,
}: MassiveBaseUIProviderProps) {
  return (
    <QueryParamsProvider>
      <StepperProvider>
        <DialogProvider>{children}</DialogProvider>
      </StepperProvider>
    </QueryParamsProvider>
  );
}
