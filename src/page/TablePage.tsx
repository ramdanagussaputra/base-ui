import Searchbar from "@/component/searchbar/Searchbar";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Body, Table } from "massive-base-ui";

import { formatedDummyData } from "./dummyTableData";

const columnHelper = createColumnHelper<{
  code: number | null;
  beneficiaryName: string | null;
  createdDate: string | null;
  categories: string[] | null;
  status: string | null;
}>();

export const columns = [
  columnHelper.accessor("code", {
    id: "code",
    header: () => <span className="whitespace-nowrap">Code</span>,
    cell: (info) => <>{info.getValue() ? info.getValue() : "-"}</>,
  }),
  columnHelper.accessor("beneficiaryName", {
    id: "beneficiaryName",
    header: () => <span className="whitespace-nowrap">Beneficiary Name</span>,
    cell: (info) => <>{info.getValue() ? info.getValue() : "-"}</>,
  }),
  columnHelper.accessor("categories", {
    id: "categories",
    header: () => <span className="whitespace-nowrap">Categories</span>,
    cell: (info) => <>{info.getValue()!.length < 1 ? "-" : info.getValue()}</>,
  }),
  columnHelper.accessor("createdDate", {
    id: "createdDate",
    header: () => <span className="whitespace-nowrap">Created Date</span>,
    cell: (info) => <>{info.getValue() ? info.getValue() : "-"}</>,
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: () => <span className="whitespace-nowrap">Status</span>,
    cell: (info) => <>{info.getValue() ? info.getValue() : "-"}</>,
  }),
];

function TablePage() {
  const table = useReactTable({
    columns,
    data: formatedDummyData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <main className="p-10">
      <Table>
        <Table.Header className="justify-between">
          <Body as={"span"} level="1" bold="semibold">
            Total <span className="text-primary-600">10</span> project briefs
          </Body>

          <div className="w-[14.3125rem]">
            <Searchbar />
          </div>
        </Table.Header>

        <Table.Content>
          <Table.Content.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Content.Header.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Content.Header.Row.Head key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </Table.Content.Header.Row.Head>
                ))}
              </Table.Content.Header.Row>
            ))}
          </Table.Content.Header>

          <Table.Content.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Content.Body.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Content.Body.Row.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Content.Body.Row.Cell>
                ))}
              </Table.Content.Body.Row>
            ))}
          </Table.Content.Body>
        </Table.Content>

        <Table.Footer>Table Footer</Table.Footer>
      </Table>
    </main>
  );
}

export default TablePage;
