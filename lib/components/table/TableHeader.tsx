import { cn } from "#/utils";

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function TableHeader({
  children,
  className,
}: Readonly<TableHeaderProps>) {
  return (
    <header
      className={cn("flex items-center gap-5 px-5 py-[1.0625rem]", className)}
    >
      {children}
    </header>
  );
}
