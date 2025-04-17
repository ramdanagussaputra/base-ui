import useQueryParams from "#/hook/useQueryParams";
import { createContext, useContext } from "react";

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

  function setStep(step: number) {
    searchParams.set("step", String(step));
    setSearchParams();
  }

  function nextStep() {
    if (currentStep <= 6) {
      setStep(currentStep + 1);
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      setStep(currentStep - 1);
    }
  }

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
