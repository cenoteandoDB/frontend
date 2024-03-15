import {
  GraphqlTableTypes,
  TableColumns,
  TableTypes
} from '../../pages/admin/components/table/types';

export interface TableColumnInterface {
  buildColumnHeaders(
    tableData:
      | TableTypes[]
      | GraphqlTableTypes
  ): [string[], TableColumns[]];
}
