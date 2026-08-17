import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card/Card";

export interface IDataTableColumn {
  id: string;
  label: string;
}

export interface IDataTableRow {
  id: string;
  cells: Record<string, ReactNode>;
}

export interface IDataTableProps {
  caption: string;
  columns: readonly IDataTableColumn[];
  rows: readonly IDataTableRow[];
  emptyState: ReactNode;
}

export function DataTable({
  caption,
  columns,
  rows,
  emptyState,
}: IDataTableProps) {
  return (
    <Card variant="elevated" className="overflow-hidden !p-0">
      {rows.length === 0 ? (
        <div className="p-md tablet:p-lg">{emptyState}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <caption className="sr-only">{caption}</caption>

            <thead className="bg-gray-100">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    scope="col"
                    className="px-md py-sm text-small font-semibold text-gray-700"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className="px-md py-md text-small text-gray-700"
                    >
                      {row.cells[column.id] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}