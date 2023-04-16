import { TableColumns, TableTypes } from '../../pages/admin/components/table/types';


export interface TableColumnInterface {
  buildColumnHeaders(tableData: TableTypes[]): [string[], TableColumns[]];
}