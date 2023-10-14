import { TableColumns, TableTypes } from '../../pages/admin/components/table/types';
import { LayersTableQueryQuery } from '../../__generated__/graphql';


export interface TableColumnInterface {
  buildColumnHeaders(tableData: TableTypes[] |  LayersTableQueryQuery['layers']): [string[], TableColumns[]];
}