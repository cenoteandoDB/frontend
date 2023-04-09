import { ColumnDef } from '@tanstack/table-core';
import { TableTypes } from '../pages/admin/components/table/types';

export function populateColumns<T extends TableTypes>(
  data: string[] | null
): ColumnDef<T, string>[] | null {

  if (!data) {
    return null;
  }

  const columns: ColumnDef<T, string>[] = [];

  data.map((column) => {
    columns.push({
      accessorKey: column,
      id: column,
      cell: (info) => info.getValue(),
      accessorFn: (acc: T)=> {
        const columnAcc = acc[column as keyof T] as string;
        if (typeof columnAcc === 'boolean') {
          return columnAcc ? 'Sí' : 'No';
        }
        return columnAcc;
      },
      enableColumnFilter: column !== 'edit'
    });
  });

  return columns;
}
