import ReferenceModel from '../../models/ReferencesTypes';
import {
  TableColumns,
  TableTypes
} from '../../pages/admin/components/table/types';
import { ReferencesTableQueryQuery } from '../../__generated__/graphql';
import { ColumnCreator } from './table-column-creator';
import { TableColumnInterface } from './table-column-interface';

export class ReferenceColumnCreator extends ColumnCreator {
  enableFilter: string[];
  tableData: TableTypes[];

  constructor(tableData: ReferenceModel[]) {
    super();
    this.tableData = tableData;
    this.enableFilter = ['edit'];
  }

  public factoryMethod(): TableColumnInterface {
    return new ReferenceColumns();
  }
}

class ReferenceColumns implements TableColumnInterface {
  buildColumnHeaders(
    tableData: ReferencesTableQueryQuery['references']
  ): [string[], TableColumns[]] {
    const columnHeaders =
      tableData?.map((data) => ({
        unique_code: data.unique_code,
        short_name: data.short_name,
        type: data.type,
        year: data.date_primary,
        autores: data.authors,
        doi: data.doi,
        pdf: data.has_pdf,
        // editar: <EditContent inputs={data} />,
      })) ?? [];

    return [Object.keys(columnHeaders[0]), columnHeaders];
  }
}
