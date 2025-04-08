import { Tag, Badge, Tooltip, Spinner } from "massive-base-ui";

export function BadgesPage() {
  return (
    <section className="grid grid-cols-[max-content_1fr] gap-4 p-10">
      <Spinner />

      <Tag onRemove={() => console.log("remove")}>
        Tag Badge <Tag.RemoveButton />
      </Tag>

      <Tooltip message="asd">
        <Tag onRemove={() => {}}>Tag Badge</Tag>
      </Tooltip>

      <Tag onRemove={() => console.log("remove")} isRounded>
        <span className="divide-secondary-200 divide-x">
          <span className="pr-1.5 font-light">Category</span>
          <span className="pl-1.5">Filter</span>
        </span>
        <Tag.RemoveButton />
      </Tag>

      <Tag isRounded onRemove={() => {}}>
        Tag Badge
      </Tag>

      <Badge>Default</Badge>
      <Badge size="small">Default</Badge>

      <Badge color="error">Error</Badge>
      <Badge size="small" color="error">
        Error
      </Badge>

      <Badge color="info1">Info1</Badge>
      <Badge size="small" color="info1">
        Info1
      </Badge>

      <Badge color="info2">Info2</Badge>
      <Badge size="small" color="info2">
        Info2
      </Badge>

      <Badge color="primary">Primary</Badge>
      <Badge size="small" color="primary">
        Primary
      </Badge>

      <Badge color="secondary">Secondary</Badge>
      <Badge size="small" color="secondary">
        Secondary
      </Badge>

      <Badge color="warning">Warning</Badge>
      <Badge size="small" color="warning">
        Warning
      </Badge>

      <Badge color="success">Success</Badge>
      <Badge size="small" color="success">
        Success
      </Badge>
    </section>
  );
}
