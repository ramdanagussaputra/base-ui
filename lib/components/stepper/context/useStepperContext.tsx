import { createContext, useContext } from "react";

type StepperContext = {
  currentStep: number;
  setStep: (step: number) => void;
  nextStep?: () => void;
  prevStep?: () => void;
};

const stepperContext = createContext<StepperContext | undefined>(undefined);

export function useStepperContext() {
  const context = useContext(stepperContext);
  if (!context) {
    throw new Error("useStepperContext must be used within a StepperProvider");
  }
  return context;
}

interface StepperProviderProps {
  children: React.ReactNode;
  currentStep: number;
  setStep: (step: number) => void;
  nextStep?: () => void;
  prevStep?: () => void;
}

export function StepperProvider({
  children,
  currentStep,
  setStep,
  nextStep,
  prevStep,
}: Readonly<StepperProviderProps>) {
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
