import useQueryParams from "#/hook/useQueryParams";
import { createContext, useContext, useCallback } from "react";

type StepperContext = {
  currentStep: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
};

export const stepperContext = createContext<StepperContext | undefined>({
  currentStep: 1,
  setStep: () => {},
  nextStep: () => {},
  prevStep: () => {},
});

export function useStepperContext() {
  const context = useContext(stepperContext);

  if (!context) {
    throw new Error("useStepperContext must be used within a StepperProvider");
  }

  return context;
}

interface StepperProviderProps {
  children: React.ReactNode;
}

export function StepperProvider({ children }: Readonly<StepperProviderProps>) {
  const [searchParams, setSearchParams] = useQueryParams();

  const currentStep = searchParams.get("step")
    ? Number(searchParams.get("step"))
    : 0;

  const setStep = useCallback(
    (step: number) => {
      searchParams.set("step", String(step));
      setSearchParams();
    },
    [searchParams, setSearchParams],
  );

  const nextStep = useCallback(() => {
    if (currentStep <= 6) {
      setStep(currentStep + 1);
    }
  }, [currentStep, setStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setStep(currentStep - 1);
    }
  }, [currentStep, setStep]);

  return (
    <stepperContext.Provider
      value={{
        currentStep,
        setStep,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </stepperContext.Provider>
  );
}
