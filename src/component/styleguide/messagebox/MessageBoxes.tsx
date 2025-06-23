import { InfoCircle, TickCircle, Warning2 } from "iconsax-react";
import { Button, MessageBox } from "massive-base-ui";

import StyleguideGroup from "@/component/styleguide/StyleguideGroup";
import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

function MessageBoxes() {
  return (
    <StyleguideGroup>
      <StyleguideSubtitle>Message Boxes</StyleguideSubtitle>
      <div className="flex flex-col gap-4">
        <MessageBox
          variant="success"
          title="Success Message"
          icon={<TickCircle variant="Bulk" />}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </MessageBox>

        <MessageBox
          variant="info"
          title="Info Message"
          icon={<InfoCircle variant="Bulk" />}
          action={
            <Button
              variant="outline"
              color="secondary"
              size="small"
              className="bg-secondary-0"
            >
              Action
            </Button>
          }
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </MessageBox>

        <MessageBox
          variant="warning"
          title="Warning Message"
          icon={<Warning2 variant="Bulk" />}
          onClose={() => {
            console.log("close");
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </MessageBox>

        <MessageBox
          variant="error"
          title="Error Message"
          icon={<Warning2 variant="Bulk" />}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </MessageBox>
      </div>
    </StyleguideGroup>
  );
}

export default MessageBoxes;
