import { StepperItem } from "#/components/stepper/StepperItem";

import { cn } from "#/utils";
import { useStepperContext } from "#/components/stepper/context/useStepperContext";
import { useEffect } from "react";

interface StepperProps {
  labels: string[];
}

export function Stepper({ labels = [] }: StepperProps) {
  const { currentStep, setStep } = useStepperContext();

  const stepAmount = labels.length;
  const stepsArray = Array.from(
    { length: stepAmount },
    (_, index) => index + 1,
  );

  useEffect(() => {
    if (currentStep === 0 || !currentStep) {
      setStep(1);
    }
  }, [setStep, currentStep]);

  return (
    <div className="flex w-fit items-center">
      {stepsArray.map((step, index) => (
        <div
          className="group flex items-center gap-2.5"
          key={`${step}${currentStep}`}
        >
          <div
            className={cn(
              "ml-2.5 w-[2.1875rem] border-t border-neutral-200 group-first:hidden",
              {
                "border-neutral-950": currentStep > step,
              },
            )}
          ></div>

          <StepperItem step={step} label={labels[index]} />
        </div>
      ))}
    </div>
  );
}
