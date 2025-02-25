import { Tag } from "massive-base-ui";

export function BadgesPage() {
  return (
    <section className="grid grid-cols-2 p-10">
      <Tag onRemove={() => console.log("remove")}>
        Tag Badge <Tag.RemoveButton />
      </Tag>

      <Tag onRemove={() => {}}>Tag Badge</Tag>
    </section>
  );
}
