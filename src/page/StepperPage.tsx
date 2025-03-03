import { Add, TickSquare } from "iconsax-react";
import { Button, Stepper, useStepper, Snackbar } from "massive-base-ui";

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
      {/* 
      <div className="mt-10">
        <Button>Open Snackbar</Button>
      </div> */}

      <div className="mt-10 flex flex-col gap-5">
        <Snackbar>
          <div className="flex items-start justify-between gap-5">
            <div className="flex gap-2.5">
              <TickSquare
                variant="Bold"
                className="text-success-600 size-[1.875rem]"
              />

              <div className="flex flex-col justify-center gap-0.5">
                <Snackbar.Title>Title</Snackbar.Title>
                <Snackbar.Description>
                  lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                  eiusmod
                </Snackbar.Description>
              </div>
            </div>

            <button className="cursor-pointer">
              <Add className="text-secondary-300 size-[1.875rem] rotate-45" />
            </button>
          </div>
        </Snackbar>
      </div>
    </div>
  );
}

export default StepperPage;
