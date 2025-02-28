import { Tag, Badge } from "massive-base-ui";

export function BadgesPage() {
  return (
    <section className="grid grid-cols-[max-content_1fr] gap-4 p-10">
      <Tag onRemove={() => console.log("remove")}>
        Tag Badge <Tag.RemoveButton />
      </Tag>

      <Tag onRemove={() => {}}>Tag Badge</Tag>

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

      <Badge>Badge</Badge>
      <Badge size="small">Badge</Badge>

      <Badge color="error">Badge</Badge>
      <Badge size="small" color="error">
        Badge
      </Badge>

      <Badge color="info1">Badge</Badge>
      <Badge size="small" color="info1">
        Badge
      </Badge>

      <Badge color="info2">Badge</Badge>
      <Badge size="small" color="info2">
        Badge
      </Badge>

      <Badge color="primary">Badge</Badge>
      <Badge size="small" color="primary">
        Badge
      </Badge>

      <Badge color="secondary">Badge</Badge>
      <Badge size="small" color="secondary">
        Badge
      </Badge>

      <Badge color="warning">Badge</Badge>
      <Badge size="small" color="warning">
        Badge
      </Badge>

      <Badge color="success">Badge</Badge>
      <Badge size="small" color="success">
        Badge
      </Badge>
    </section>
  );
}
