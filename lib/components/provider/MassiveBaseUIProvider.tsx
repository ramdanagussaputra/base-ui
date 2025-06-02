import { DialogProvider } from "#/components/dialog";
import { StepperProvider } from "#/components/stepper/context/useStepperContext";
import { QueryParamsProvider } from "#/context/useQueryParamsContext";
import { ModalProvider } from "#/components/modal/context/useModalContext";

interface MassiveBaseUIProviderProps {
  children: React.ReactNode;
}

export function MassiveBaseUIProvider({
  children,
}: MassiveBaseUIProviderProps) {
  return (
    <QueryParamsProvider>
      <StepperProvider>
        <ModalProvider>
          <DialogProvider>{children}</DialogProvider>
        </ModalProvider>
      </StepperProvider>
    </QueryParamsProvider>
  );
}
