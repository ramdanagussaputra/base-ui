import { useState } from "react";

import StyleguideGroup from "@/component/styleguide/StyleguideGroup";
import StyleguideTitle from "@/component/styleguide/StyleguideTitle";
import { Stepper } from "#/components/stepper/Stepper";
import Tabs from "@/component/styleguide/navigations/tabs/Tabs";
import Breadcrumbs from "@/component/styleguide/navigations/breadcrumbs/Breadcrumbs";

function Navigation() {
  const [currentStep, setStep] = useState(1);
  const labels = ["Step 1", "Step 2", "Step 3"]; // Example labels

  return (
    <StyleguideGroup>
      <StyleguideTitle>Navigations</StyleguideTitle>

      <Stepper labels={labels} />
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="rounded bg-neutral-200 px-4 py-2"
          onClick={() => setStep(currentStep - 1)}
          disabled={currentStep <= 1}
        >
          Previous
        </button>
        <button
          type="button"
          className="rounded bg-neutral-950 px-4 py-2 text-white"
          onClick={() => setStep(currentStep + 1)}
          disabled={currentStep >= labels.length}
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-2 gap-10">
        <Tabs />
        <Breadcrumbs />
      </div>
    </StyleguideGroup>
  );
}

export default Navigation;
