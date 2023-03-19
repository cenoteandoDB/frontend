import { ColumnDef } from '@tanstack/table-core';
import { TableTypes } from '../components/table/table-wrapper';
import { languages } from './languages';

export function populateColumns<T extends TableTypes>(
  data: string[],
  language = 'spanish'
): ColumnDef<T, string>[] {
  const columns: ColumnDef<T, string>[] = [];

  data.map((column) => {
    columns.push({
      accessorKey: languages[language][column],
      id: column,
      cell: (info) => info.getValue(),
      accessorFn: (acc: T) => {
        const columnAcc = acc[column as keyof T];
        if (typeof columnAcc === 'boolean') {
          return columnAcc ? 'Sí' : 'No';
        }
        return columnAcc;
      },
    });
  });

  return columns;
}
