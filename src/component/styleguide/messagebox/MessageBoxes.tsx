import { InfoCircle, TickCircle, Warning2 } from "iconsax-react";
import { Button, MessageBox, SmallMessageBox } from "massive-base-ui";
import Icon from "#/components/icon/Icon";

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
          icon={<Icon icon={TickCircle} variant="Bulk" />}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </MessageBox>

        <MessageBox
          variant="info"
          title="Info Message"
          icon={<Icon icon={InfoCircle} variant="Bulk" />}
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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </MessageBox>

        <MessageBox
          variant="warning"
          title="Warning Message"
          icon={<Icon icon={Warning2} variant="Bulk" />}
          onClose={() => {
            console.log("close");
          }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </MessageBox>

        <MessageBox
          variant="error"
          title="Error Message"
          icon={<Icon icon={Warning2} variant="Bulk" />}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </MessageBox>

        <SmallMessageBox
          variant="success"
          icon={<Icon icon={TickCircle} variant="Bulk" />}
        >
          Short message
        </SmallMessageBox>

        <SmallMessageBox
          variant="error"
          icon={<Icon icon={Warning2} variant="Bulk" />}
        >
          Short message
        </SmallMessageBox>
      </div>
    </StyleguideGroup>
  );
}

export default MessageBoxes;
