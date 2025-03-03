import { TableContentHeader } from "#/components/table/TableContentHeader";
import { TableContentBody } from "#/components/table/TableContentBody";

interface TableContentProps {
  children: React.ReactNode;
}

export function TableContent({ children }: Readonly<TableContentProps>) {
  return (
    <div className="relative max-h-[31.1rem] overflow-x-auto">
      <table className="w-full">{children}</table>
    </div>
  );
}

TableContent.Header = TableContentHeader;
TableContent.Body = TableContentBody;
