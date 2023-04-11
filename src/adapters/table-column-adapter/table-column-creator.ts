import { ColumnDef } from '@tanstack/table-core';
import {
  TableColumns,
  TableTypes,
} from '../../pages/admin/components/table/types';
import { TableColumnInterface } from './table-column-interface';

export abstract class ColumnCreator {

  abstract tableData: TableTypes[];

  public abstract factoryMethod(): TableColumnInterface;

  private populateColumns<T extends TableTypes>(data: string[]): ColumnDef<T, string>[] | null {
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

  public buildColumnHeaders(): [ColumnDef<TableTypes, string>[] | null, TableColumns[]] {
    const product = this.factoryMethod();
    const [tableKeys, readyTableData] = product.buildColumnHeaders(this.tableData);
    return [this.populateColumns(tableKeys), readyTableData];
  }
}
