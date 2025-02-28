import { Button, Stepper, useStepper } from "massive-base-ui";

function StepperPage() {
  const { nextStep, prevStep } = useStepper();

  return (
    <div className="p-10">
      <Stepper labels={["Step 1", "Step 2", "Step 3"]} />

      <div className="mt-2.5 flex gap-2">
        <Button onClick={() => prevStep()}>Prev Step</Button>
        <Button
          onClick={() => {
            nextStep();
          }}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}

export default StepperPage;
