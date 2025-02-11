import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

interface TabsProps {
  tabs: {
    name: string;
    content: React.ReactNode;
  }[];
  onTabClick?: () => void;
}

export function RoundedTabs({ tabs, onTabClick }: TabsProps) {
  return (
    <TabGroup
      onChange={() => {
        if (onTabClick) {
          setTimeout(onTabClick, 0);
        }
      }}
    >
      <TabList className="flex w-full items-end gap-(--rounded-tabs-gap) outline-hidden">
        {tabs.map((tab) => (
          <Tab
            className="cursor-pointer rounded-full border border-(--rounded-tabs-border-color) p-(--rounded-tabs-padding) text-(length:--rounded-tabs-font-size) leading-(--rounded-tabs-line-height) font-(--rounded-tabs-font-weight) whitespace-nowrap text-(--rounded-tabs-border-color) outline-hidden duration-100 data-selected:bg-(--rounded-tabs-bg-color--active) data-selected:text-(--rounded-tabs-color--active)"
            key={tab.name}
          >
            {tab.name}
          </Tab>
        ))}
      </TabList>

      <TabPanels className="outline-hidden">
        {tabs.map((tab) => (
          <TabPanel key={tab.name} className="outline-hidden">
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
