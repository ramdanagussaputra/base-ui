import { RoundedTabs, Tabs } from "massive-base-ui";

function NavigationPage() {
  return (
    <div className="flex flex-col gap-10 p-10">
      <RoundedTabs
        tabs={[
          {
            name: "Tab 1",
            content: <div>Tab 1 content</div>,
          },
          {
            name: "Tab 2",
            content: <div>Tab 2 content</div>,
          },
        ]}
      />

      <Tabs
        tabs={[
          {
            name: "Tab 1",
            content: <div>Tab 1 content</div>,
          },
          {
            name: "Tab 2",
            content: <div>Tab 2 content</div>,
          },
        ]}
      />
    </div>
  );
}

export default NavigationPage;
