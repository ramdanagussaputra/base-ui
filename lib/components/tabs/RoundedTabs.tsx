import { cn } from "#/utils";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { TabsProps } from "#/components/tabs/model";

export function RoundedTabs({
  tabs,
  onTabClick,
  tabsContainerClassName,
  contentContainerClassName,
  ...props
}: Readonly<TabsProps>) {
  return (
    <TabGroup
      onChange={() => {
        if (onTabClick) {
          setTimeout(onTabClick, 0);
        }
      }}
      {...props}
    >
      <TabList
        className={cn(
          "flex w-full items-end gap-(--rounded-tabs-gap) outline-hidden",
          tabsContainerClassName,
        )}
      >
        {tabs.map((tab) => (
          <Tab
            className="cursor-pointer rounded-full border border-(--rounded-tabs-border-color) px-(--rounded-tabs-padding-horizontal) py-(--rounded-tabs-padding-vertical) text-(length:--rounded-tabs-font-size) leading-(--rounded-tabs-line-height) font-(--rounded-tabs-font-weight) whitespace-nowrap text-(--rounded-tabs-border-color) outline-hidden duration-100 data-selected:bg-(--rounded-tabs-bg-color--active) data-selected:text-(--rounded-tabs-color--active)"
            key={tab.name}
          >
            {tab.name}
          </Tab>
        ))}
      </TabList>

      <TabPanels className={cn("outline-hidden", contentContainerClassName)}>
        {tabs.map((tab) => (
          <TabPanel key={tab.name} className="outline-hidden">
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
