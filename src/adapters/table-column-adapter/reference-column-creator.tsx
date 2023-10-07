import React from 'react';

import ReferenceModel from '../../models/ReferencesTypes';
import { EditContent } from '../../pages/admin/components/edit-buttons';
import {
  ReferenceTableColumns,
  TableColumns,
  TableTypes,
} from '../../pages/admin/components/table/types';
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
  buildColumnHeaders(tableData: ReferenceModel[]): [string[], TableColumns[]] {
    const columnHeaders = tableData.map(
      (data) =>
        ({
          id: data.id,
          autores: data.authors,
          nombre_corto: data.shortName,
          referencia: data.reference,
          tipo: data.type,
          año: data.year,
          editar: <EditContent inputs={data} />,
        } as ReferenceTableColumns)
    );
    return [Object.keys(columnHeaders[0]), columnHeaders];
  }
}
