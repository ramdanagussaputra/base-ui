import { RoundedTabs, Tabs as TabsUI } from "massive-base-ui";

import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

function Tabs() {
  return (
    <div className="space-y-5">
      <StyleguideSubtitle>Tab</StyleguideSubtitle>

      <div className="space-y-3">
        <TabsUI
          tabs={[
            {
              name: "Tab 1",
              content: <div>Tab 1 content</div>,
            },
            {
              name: "Tab 2",
              content: <div>Tab 2 content</div>,
            },
            {
              name: "Tab 3",
              content: <div>Tab 3 content</div>,
            },
            {
              name: "Tab 4",
              content: <div>Tab 4 content</div>,
            },
          ]}
        />

        <RoundedTabs
          tabs={[
            { name: "Tab 1", content: <div>Tab 1 content</div> },
            { name: "Tab 2", content: <div>Tab 2 content</div> },
            { name: "Tab 3", content: <div>Tab 3 content</div> },
            { name: "Tab 4", content: <div>Tab 4 content</div> },
          ]}
        />
      </div>
    </div>
  );
}

export default Tabs;
