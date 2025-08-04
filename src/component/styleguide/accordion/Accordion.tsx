import { ArrowDown2, ArrowUp2 } from "iconsax-react";

import { Accordion as AccordionComponent, cn } from "massive-base-ui";

import Icon from "#/components/icon/Icon";
import StyleguideGroup from "../StyleguideGroup";
import StyleguideTitle from "../StyleguideTitle";

function Accordion() {
  return (
    <StyleguideGroup>
      <StyleguideTitle>Accordion</StyleguideTitle>

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
                  exercitationem voluptate dolorum inventore fuga consectetur.
                  Commodi, culpa.
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

              <AccordionComponent.Content>content</AccordionComponent.Content>
            </>
          )}
        </AccordionComponent>
      </div>
    </StyleguideGroup>
  );
}

export default Accordion;
