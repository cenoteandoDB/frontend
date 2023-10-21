import {
  TableColumns,
  TableTypes,
} from '../../pages/admin/components/table/types';
import {
  CenotesTableQueryQuery,
  LayersTableQueryQuery,
} from '../../__generated__/graphql';

export interface TableColumnInterface {
  buildColumnHeaders(
    tableData:
      | TableTypes[]
      | CenotesTableQueryQuery['cenotes']
      | LayersTableQueryQuery['layers']
  ): [string[], TableColumns[]];
}
