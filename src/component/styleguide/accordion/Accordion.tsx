import { ArrowDown2, ArrowUp2 } from "iconsax-react";

import {
  Accordion as AccordionComponent,
  AccordionManagerProvider,
  useAccordionManager,
  useStandaloneAccordionManager,
  cn,
} from "massive-base-ui";

import Icon from "#/components/icon/Icon";
import StyleguideGroup from "../StyleguideGroup";
import StyleguideTitle from "../StyleguideTitle";
import StyleguideSubtitle from "../StyleguideSubtitle";

// Component demonstrating AccordionManagerProvider approach
function AccordionWithManagerProvider() {
  const accordionManager = useAccordionManager();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={accordionManager.openAll}
          className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
        >
          Open All
        </button>
        <button
          onClick={accordionManager.closeAll}
          className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
        >
          Close All
        </button>
        <button
          onClick={accordionManager.toggleAll}
          className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
        >
          Toggle All
        </button>
        <button
          onClick={() => accordionManager.openById("provider-accordion-1")}
          className="rounded bg-purple-500 px-3 py-1 text-sm text-white hover:bg-purple-600"
        >
          Open #1 Only
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <AccordionComponent id="provider-accordion-1">
          {(open) => (
            <>
              <AccordionComponent.Trigger>
                <div
                  className={cn(
                    "bg-primary-600 text-neutral-0 flex cursor-pointer items-center justify-between rounded-md px-4 py-2",
                    {
                      "rounded-b-none": open,
                    },
                  )}
                >
                  Controlled Accordion #1
                  <Icon
                    size={14}
                    className={cn(
                      "transition-transform",
                      open ? "rotate-0" : "rotate-180",
                    )}
                    icon={ArrowUp2}
                  />
                </div>
              </AccordionComponent.Trigger>
              <AccordionComponent.Content>
                <p className="border-primary-600 rounded-b-xl border p-2">
                  This accordion can be controlled globally with the buttons
                  above. It has ID "provider-accordion-1".
                </p>
              </AccordionComponent.Content>
            </>
          )}
        </AccordionComponent>

        <AccordionComponent id="provider-accordion-2">
          {(open) => (
            <>
              <AccordionComponent.Trigger>
                <div
                  className={cn(
                    "bg-secondary-600 text-neutral-0 flex cursor-pointer items-center justify-between rounded-md px-4 py-2",
                    {
                      "rounded-b-none": open,
                    },
                  )}
                >
                  Controlled Accordion #2
                  <Icon
                    size={14}
                    className={cn(
                      "transition-transform",
                      open ? "rotate-0" : "rotate-180",
                    )}
                    icon={ArrowUp2}
                  />
                </div>
              </AccordionComponent.Trigger>
              <AccordionComponent.Content>
                <p className="border-secondary-600 rounded-b-xl border p-2">
                  This accordion is also controlled globally. It has ID
                  "provider-accordion-2".
                </p>
              </AccordionComponent.Content>
            </>
          )}
        </AccordionComponent>

        <AccordionComponent>
          {(open) => (
            <>
              <AccordionComponent.Trigger>
                <div
                  className={cn(
                    "text-neutral-0 flex cursor-pointer items-center justify-between rounded-md bg-gray-600 px-4 py-2",
                    {
                      "rounded-b-none": open,
                    },
                  )}
                >
                  Independent Accordion (No ID)
                  <Icon
                    size={14}
                    className={cn(
                      "transition-transform",
                      open ? "rotate-0" : "rotate-180",
                    )}
                    icon={ArrowUp2}
                  />
                </div>
              </AccordionComponent.Trigger>
              <AccordionComponent.Content>
                <p className="rounded-b-xl border border-gray-600 p-2">
                  This accordion has no ID, so it's not affected by global
                  controls. It works independently.
                </p>
              </AccordionComponent.Content>
            </>
          )}
        </AccordionComponent>
      </div>
    </div>
  );
}

// Component demonstrating standalone approach
function AccordionWithStandaloneManager() {
  const accordionManager = useStandaloneAccordionManager();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={accordionManager.openAll}
          className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
        >
          Open All ({accordionManager.getRegisteredCount()})
        </button>
        <button
          onClick={accordionManager.closeAll}
          className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
        >
          Close All
        </button>
        <button
          onClick={() => {
            const states = accordionManager.getAllStates();
            alert(`Accordion states: ${JSON.stringify(states, null, 2)}`);
          }}
          className="rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
        >
          Show States
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <AccordionComponent
          id="standalone-accordion-1"
          onRegister={accordionManager.register}
        >
          {(isOpen) => (
            <>
              <AccordionComponent.Trigger>
                <div className="flex items-center gap-2.5">
                  <p className="text-b3-400 text-secondary-700 whitespace-nowrap">
                    Standalone Controlled Accordion #1
                  </p>
                  <div className="bg-secondary-100 h-[1px] w-full" />
                  <div className="border-secondary-300 flex size-7 shrink-0 items-center justify-center rounded-md border">
                    <Icon
                      icon={isOpen ? ArrowDown2 : ArrowUp2}
                      className="size-3"
                    />
                  </div>
                </div>
              </AccordionComponent.Trigger>

              <AccordionComponent.Content>
                <p className="border-secondary-300 rounded border p-2">
                  This accordion uses the standalone manager approach with
                  onRegister prop.
                </p>
              </AccordionComponent.Content>
            </>
          )}
        </AccordionComponent>

        <AccordionComponent
          id="standalone-accordion-2"
          onRegister={accordionManager.register}
        >
          {(isOpen) => (
            <>
              <AccordionComponent.Trigger>
                <div className="flex items-center gap-2.5">
                  <p className="text-b3-400 text-primary-700 whitespace-nowrap">
                    Standalone Controlled Accordion #2
                  </p>
                  <div className="bg-primary-100 h-[1px] w-full" />
                  <div className="border-primary-300 flex size-7 shrink-0 items-center justify-center rounded-md border">
                    <Icon
                      icon={isOpen ? ArrowDown2 : ArrowUp2}
                      className="size-3"
                    />
                  </div>
                </div>
              </AccordionComponent.Trigger>

              <AccordionComponent.Content>
                <p className="border-primary-300 rounded border p-2">
                  Another accordion managed by the standalone manager.
                </p>
              </AccordionComponent.Content>
            </>
          )}
        </AccordionComponent>
      </div>
    </div>
  );
}

function Accordion() {
  return (
    <StyleguideGroup>
      <StyleguideTitle>Accordion</StyleguideTitle>

      <div className="flex justify-between gap-x-5">
        {/* Original Examples */}
        <div className="w-full space-y-4">
          <StyleguideSubtitle>Original Examples</StyleguideSubtitle>
          <div className="flex flex-col gap-8">
            <AccordionComponent>
              {(open) => (
                <>
                  <AccordionComponent.Trigger>
                    <div
                      className={cn(
                        "bg-primary-600 text-neutral-0 flex cursor-pointer items-center justify-between rounded-md px-4 py-2",
                        {
                          "rounded-b-none": open,
                        },
                      )}
                    >
                      Example Accordion Trigger
                      <Icon
                        size={14}
                        className={cn(
                          "transition-transform",
                          open ? "rotate-0" : "rotate-180",
                        )}
                        icon={ArrowUp2}
                      />
                    </div>
                  </AccordionComponent.Trigger>
                  <AccordionComponent.Content>
                    <p className="border-primary-600 rounded-b-xl border p-2">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Delectus quo aliquid quibusdam ullam eum, aperiam quas
                      accusamus architecto, quisquam, optio illum atque
                      exercitationem voluptate dolorum inventore fuga
                      consectetur. Commodi, culpa.
                    </p>
                  </AccordionComponent.Content>
                </>
              )}
            </AccordionComponent>

            <AccordionComponent>
              {(isOpen) => (
                <>
                  <AccordionComponent.Trigger>
                    <div className="flex items-center gap-2.5">
                      <p className="text-b3-400 text-secondary-700 whitespace-nowrap">
                        5 files in queue waiting for import...
                      </p>
                      <div className="bg-secondary-100 h-[1px] w-full" />
                      <div className="border-secondary-300 flex size-7 shrink-0 items-center justify-center rounded-md border">
                        <Icon
                          icon={isOpen ? ArrowDown2 : ArrowUp2}
                          className="size-3"
                        />
                      </div>
                    </div>
                  </AccordionComponent.Trigger>

                  <AccordionComponent.Content>
                    content
                  </AccordionComponent.Content>
                </>
              )}
            </AccordionComponent>
          </div>
        </div>

        {/* Global Control with Provider */}
        <div className="w-full space-y-4">
          <StyleguideSubtitle>
              Global w/ AccordionManagerProvider
          </StyleguideSubtitle>
          <AccordionManagerProvider>
            <AccordionWithManagerProvider />
          </AccordionManagerProvider>
        </div>

        {/* Global Control with Standalone Hook */}
        <div className="w-full space-y-4">
          <StyleguideSubtitle>Global Control w/ Standalone Manager</StyleguideSubtitle>
          <AccordionWithStandaloneManager />
        </div>
      </div>
    </StyleguideGroup>
  );
}

export default Accordion;
