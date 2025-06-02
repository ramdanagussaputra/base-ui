import { Button, Stepper as StepperUI, useStepper } from "massive-base-ui";

import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

function Stepper() {
  const { nextStep, prevStep } = useStepper();

  return (
    <div className="spapce-y-5">
      <StyleguideSubtitle>Stepper</StyleguideSubtitle>

      <div className="mt-5 space-y-5">
        <StepperUI
          labels={["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6"]}
        />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={prevStep}>
            Prev Step
          </Button>
          <Button onClick={nextStep}>Next Step</Button>
        </div>
      </div>
    </div>
  );
}

export default Stepper;
