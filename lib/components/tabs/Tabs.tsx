import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { TabsProps } from "#/components/tabs/model";
import { cn } from "#/utils";

import { useSetTabParam } from "#/components/tabs/hook/useSetTabParam";

export function Tabs({
  id,
  tabs,
  contentContainerClassName,
  onTabClick,
  tabsContainerClassName,
}: Readonly<TabsProps>) {
  const { setTabParam } = useSetTabParam();

  return (
    <TabGroup
      onChange={() => {
        if (onTabClick) {
          setTimeout(onTabClick, 0);
        }
      }}
      className="relative"
    >
      <TabList className="sticky top-0 flex w-full items-end justify-between outline-hidden">
        <div className="w-full">
          {tabs.map((tab) => (
            <Tab
              className={cn(
                "cursor-pointer border-b-(length:--tabs-border-width) border-transparent p-(--tabs-padding) text-(length:--tabs-font-size) whitespace-nowrap text-(--tabs-font-color) outline-hidden duration-100 data-selected:border-(--tabs-border-color--selected) data-selected:border-b-(--tabs-border-width) data-selected:font-(--tabs-font-weight--selected) data-selected:text-(--tabs-font-color--selected)",
                tabsContainerClassName,
              )}
              key={tab.name}
              onClick={() =>
                setTabParam({ tabName: tab.name, tabId: id || "" })
              }
            >
              {tab.name}
            </Tab>
          ))}

          <div className="-mt-[1px] h-(--tabs-line-height) w-full bg-(--tabs-line-color)" />
        </div>
      </TabList>

      <TabPanels className="outline-hidden">
        {tabs.map((tab) => (
          <TabPanel
            key={tab.name}
            className={cn("outline-hidden", contentContainerClassName)}
          >
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
