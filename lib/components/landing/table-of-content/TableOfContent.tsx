import { cn } from "#/utils";

interface TableOfContentLandingProps {
  className?: string;
  title?: string;
  items: Array<{
    groupTitle?: string;
    list: Array<{ title: string; href: string }>;
  }>;
  activeHref?: string;
}

export default function TableOfContentLanding({
  className,
  title = "Table of Content",
  items,
  activeHref,
}: TableOfContentLandingProps) {
  return (
    <div
      className={cn(
        "bg-secondary-50 flex h-fit max-w-[20rem] flex-col gap-5 rounded-[1.25rem] p-10",
        className,
      )}
    >
      <p className="text-subtext-600 text-primary-600">{title}</p>
      {items?.map((group, groupIndex) => (
        <div key={groupIndex} className="flex flex-col">
          {group.groupTitle && (
            <p className="text-b3-500 text-secondary-500">{group.groupTitle}</p>
          )}
          {group.list.map((item, itemIndex) => {
            const isActive = item.href === activeHref;

            return (
              <a
                key={`${groupIndex}-${itemIndex}`}
                href={item.href}
                className={cn(
                  "text-b3-400 text-secondary-800 hover mx-2.5 flex items-center gap-[1.21875rem] rounded-lg",
                  isActive && "text-primary-600 bg-[#4B4A5E]/30",
                  !isActive && "hover:bg-[#4B4A5E]/12",
                )}
              >
                {isActive && (
                  <span className="bg-primary-600 absolute ms-2.5 size-1.5 -translate-x-1/2 rounded-full" />
                )}
                <span className="bg-secondary-800 ms-2.5 w-[1px] shrink-0 self-stretch" />

                <span className="truncate py-[0.5625rem] pe-3.5">
                  {item.title}
                </span>
              </a>
            );
          })}
        </div>
      ))}
    </div>
  );
}
