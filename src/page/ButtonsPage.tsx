import { AddSquare } from "iconsax-react";
import { Button, Spinner } from "massive-base-ui";

function ButtonsPage() {
  return (
    <section className="grid grid-cols-[min-content_min-content_min-content_min-content] items-center gap-4 p-10">
      <Button color="primary" size="large" variant="solid">
        <div className="mx-4">
          <Spinner color="neutral" size={24} />
        </div>
        <Button.Icon>
          <AddSquare variant="Outline" />
        </Button.Icon>
        Solid Primer
        <Button.Icon>
          <AddSquare variant="Outline" />
        </Button.Icon>
      </Button>

      <Button color="primary" size="medium" variant="solid">
        <Button.Icon>
          <AddSquare variant="Outline" />
        </Button.Icon>
        Solid Primer
        <Button.Icon>
          <AddSquare variant="Outline" />
        </Button.Icon>
      </Button>

      <Button color="primary" size="small" variant="solid">
        Solid Primer
      </Button>

      <Button color="primary" size="extra-small" variant="solid" isDisabled>
        Solid Primer
      </Button>

      <Button color="secondary" size="large" variant="solid">
        Solid Secondary
      </Button>

      <Button color="secondary" size="medium" variant="solid">
        Solid Secondary
      </Button>

      <Button color="secondary" size="small" variant="solid">
        Solid Secondary
      </Button>

      <Button color="secondary" size="extra-small" variant="solid" isDisabled>
        Solid Secondary
      </Button>

      <Button color="error" size="large" variant="solid">
        Solid Error
      </Button>

      <Button color="error" size="medium" variant="solid">
        Solid Error
      </Button>

      <Button color="error" size="small" variant="solid">
        Solid Error
      </Button>

      <Button color="error" size="extra-small" variant="solid" isDisabled>
        Solid Error
      </Button>

      <Button color="primary" size="large" variant="light">
        <Button.Icon>
          <AddSquare variant="Outline" />
        </Button.Icon>
        Light Primary
      </Button>

      <Button color="primary" size="medium" variant="light">
        Light Primary
      </Button>

      <Button color="primary" size="small" variant="light">
        Light Primary
      </Button>

      <Button color="primary" size="extra-small" variant="light" isDisabled>
        Light Primary
      </Button>

      <Button color="secondary" size="large" variant="light">
        Light Secondary
      </Button>

      <Button color="secondary" size="medium" variant="light">
        Light Secondary
      </Button>

      <Button color="secondary" size="small" variant="light">
        Light Secondary
      </Button>

      <Button color="secondary" size="extra-small" variant="light" isDisabled>
        Light Secondary
      </Button>

      <Button color="error" size="large" variant="light">
        Light Error
      </Button>

      <Button color="error" size="medium" variant="light">
        Light Error
      </Button>

      <Button color="error" size="small" variant="light">
        Light Error
      </Button>

      <Button color="error" size="extra-small" variant="light" isDisabled>
        Light Error
      </Button>

      <Button color="primary" size="large" variant="no-background">
        NoBG Primary
      </Button>

      <Button color="primary" size="medium" variant="no-background">
        NoBG Primary
      </Button>

      <Button color="primary" size="small" variant="no-background">
        NoBG Primary
      </Button>

      <Button
        color="primary"
        size="extra-small"
        variant="no-background"
        isDisabled
      >
        NoBG Primary
      </Button>

      <Button color="secondary" size="large" variant="no-background">
        NoBG Secondary
      </Button>

      <Button color="secondary" size="medium" variant="no-background">
        NoBG Secondary
      </Button>

      <Button color="secondary" size="small" variant="no-background">
        NoBG Secondary
      </Button>

      <Button
        color="secondary"
        size="extra-small"
        variant="no-background"
        isDisabled
      >
        NoBG Secondary
      </Button>

      <Button color="error" size="large" variant="no-background">
        NoBG Error
      </Button>

      <Button color="error" size="medium" variant="no-background">
        NoBG Error
      </Button>

      <Button color="error" size="small" variant="no-background">
        NoBG Error
      </Button>

      <Button
        color="error"
        size="extra-small"
        variant="no-background"
        isDisabled
      >
        NoBG Error
      </Button>

      <Button color="primary" size="large" variant="outline">
        Outline Primary
      </Button>

      <Button color="primary" size="medium" variant="outline">
        Outline Primary
      </Button>

      <Button color="primary" size="small" variant="outline">
        Outline Primary
      </Button>

      <Button color="primary" size="extra-small" variant="outline" isDisabled>
        Outline Primary
      </Button>

      <Button color="secondary" size="large" variant="outline">
        Outline Secondary
      </Button>

      <Button color="secondary" size="medium" variant="outline">
        Outline Secondary
      </Button>

      <Button color="secondary" size="small" variant="outline">
        Outline Secondary
      </Button>

      <Button color="secondary" size="extra-small" variant="outline" isDisabled>
        Outline Secondary
      </Button>

      <Button color="error" size="large" variant="outline">
        Outline Error
      </Button>

      <Button color="error" size="medium" variant="outline">
        Outline Error
      </Button>

      <Button color="error" size="small" variant="outline">
        Outline Error
      </Button>

      <Button color="error" size="extra-small" variant="outline" isDisabled>
        Outline Error
      </Button>
    </section>
  );
}

export default ButtonsPage;
