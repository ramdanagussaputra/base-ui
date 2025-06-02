import { cn } from "#/utils";
import checklist from "#/components/form/asset/checkbox-arrow.svg";
import { useStepperContext } from "#/components/stepper/context/useStepperContext";

interface StepperItemProps {
  step: number;
  label: string;
}

export function StepperItem({ label, step }: StepperItemProps) {
  const { currentStep, setStep } = useStepperContext();

  const isCurrentStep = step === currentStep;
  const isMoreThanCurrent = step > currentStep;
  const isLessThanCurrent = step < currentStep;

  function click() {
    if (isLessThanCurrent) {
      setStep(step);
    }
  }

  return (
    <button
      onClick={click}
      className={cn("flex items-center gap-2", {
        "cursor-pointer": isLessThanCurrent,
      })}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-md bg-neutral-100",
          {
            "bg-primary-600": isLessThanCurrent,
            "bg-secondary-950": isCurrentStep,
            "bg-secondary-50": isMoreThanCurrent,
          },
        )}
      >
        {!isLessThanCurrent && (
          <span
            className={cn("text-b1 font-medium", {
              "text-neutral-0": isCurrentStep,
              "text-secondary-400": isMoreThanCurrent,
            })}
          >
            {step}
          </span>
        )}

        {isLessThanCurrent && <img src={checklist} alt="checklist icon" />}
      </div>

      <h6
        className={cn({
          "text-neutral-950": isCurrentStep || isLessThanCurrent,
          "text-secondary-400": isMoreThanCurrent,
        })}
      >
        {label}
      </h6>
    </button>
  );
}
