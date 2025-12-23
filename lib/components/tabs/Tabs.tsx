import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { TabsProps } from "#/components/tabs/model";
import { cn } from "#/utils";

export function Tabs({
  tabs,
  contentContainerClassName,
  onTabClick,
  tabsContainerClassName,
  tabsWrapperClassName,
  tabsOuterWrapperClassName,
  ...props
}: Readonly<TabsProps>) {
  return (
    <TabGroup
      onChange={(index: number) => {
        if (onTabClick) {
          setTimeout(() => onTabClick(index), 0);
        }
      }}
      className="relative"
      {...props}
    >
      <TabList
        className={cn(
          "sticky top-0 flex w-full items-end justify-between outline-hidden",
          tabsOuterWrapperClassName,
        )}
      >
        <div className={cn("w-full", tabsWrapperClassName)}>
          {tabs.map((tab) => (
            <Tab
              className={cn(
                "cursor-pointer border-b-(length:--tabs-border-width) border-transparent p-(--tabs-padding) text-(length:--tabs-font-size) whitespace-nowrap text-(--tabs-font-color) outline-hidden duration-100 data-selected:border-(--tabs-border-color--selected) data-selected:border-b-(--tabs-border-width) data-selected:font-(--tabs-font-weight--selected) data-selected:text-(--tabs-font-color--selected)",
                tabsContainerClassName,
              )}
              key={tab.name}
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
