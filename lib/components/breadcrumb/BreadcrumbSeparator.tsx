import { Slot } from "@radix-ui/react-slot";

interface BreadcrumbSeparatorProps {
  children?: React.ReactNode;
}

export function BreadcrumbSeparator({
  children,
}: Readonly<BreadcrumbSeparatorProps>) {
  return (
    <Slot className="size-(--breadcrumb-separator-size) text-(--breadcrumb-separator-color)">
      {children}
    </Slot>
  );
}
