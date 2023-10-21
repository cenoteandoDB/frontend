import { ColumnDef } from '@tanstack/table-core';
import {
  TableColumns,
  TableTypes,
} from '../../pages/admin/components/table/types';
import { CenotesTableQueryQuery, LayersTableQueryQuery } from '../../__generated__/graphql';
import { TableColumnInterface } from './table-column-interface';

export abstract class ColumnCreator {

  abstract tableData: TableTypes[] | CenotesTableQueryQuery['cenotes'] | LayersTableQueryQuery['layers'];
  abstract enableFilter: string[]

  public abstract factoryMethod(): TableColumnInterface;

  private populateColumns<T extends TableTypes>(tableHeaderKeys: string[]): ColumnDef<T, string>[] {
    const columns: ColumnDef<T, string>[] = [];
    tableHeaderKeys.map((column) => {
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
        enableColumnFilter: !this.enableFilter.includes(column)
      });
    });
  
    return columns;
  }

  public buildColumnHeaders(): [ColumnDef<TableTypes, string>[], TableColumns[]] | null{
    const product = this.factoryMethod();
    const [tableHeaders, readyTableData] = product.buildColumnHeaders(this.tableData);
    const populatedTableHeaders = this.populateColumns(tableHeaders);
    if (!populatedTableHeaders || !readyTableData) {
      return null;
    }
    return [populatedTableHeaders, readyTableData];
  }
}
