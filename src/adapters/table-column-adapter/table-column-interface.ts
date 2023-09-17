import { TableColumns, TableTypes } from '../../pages/admin/components/table/types';
import { LayersQuery } from '../../__generated__/graphql';


export interface TableColumnInterface {
  buildColumnHeaders(tableData: TableTypes[] |  LayersQuery['layers']): [string[], TableColumns[]];
}