import { RoundedTabs } from "massive-base-ui";

function NavigationPage() {
  return (
    <div className="p-10">
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
    </div>
  );
}

export default NavigationPage;
