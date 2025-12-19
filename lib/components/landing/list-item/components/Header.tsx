import { useListItemContext } from "#/components/landing/list-item/contexts/ListItemContext";
import { cn } from "#/utils";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}
export default function Header({ children, className }: HeaderProps) {
  const context = useListItemContext();

  const title = context.title;
  const description = context.description;

  return (
    <div className={cn("flex items-center justify-between gap-5", className)}>
      <div className="flex grow flex-col gap-2.5">
        <span className="text-secondary-900 text-subtext-600">{title}</span>
        <span className="text-b3-400 text-secondary-500">{description}</span>
      </div>
      {children}
    </div>
  );
}
