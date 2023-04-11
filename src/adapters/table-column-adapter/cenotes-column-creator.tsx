import React from 'react';
import { CenoteModel } from '../../models/CenotesTypes';
import { EditContent } from '../../pages/admin/components/edit-buttons';
import { CenoteTableColumns, TableColumns } from '../../pages/admin/components/table/types';
import { ColumnCreator } from './table-column-creator';
import { TableColumnInterface } from './table-column-interface';

export class CenotesColumnCreator extends ColumnCreator {
  tableData: CenoteModel[];

  constructor(tableData: CenoteModel[]) {
    super();
    this.tableData = tableData;
  }

  public factoryMethod(): TableColumnInterface {
    return new CenotesColumns();
  }
}

class CenotesColumns implements TableColumnInterface {
  buildColumnHeaders(tableData: CenoteModel[]): [string[], TableColumns[]] {
    const columnHeaders = tableData.map((data) => (
      {
        id: data.id,
        name: data.name,
        state: data.gadm?.name_1,
        municipality: data.gadm?.name_2,
        type: data.type,
        issues: data.issues,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        touristic: data.touristic,
        edit: <EditContent inputs={data} />
      } as CenoteTableColumns
    ));
    return [Object.keys(columnHeaders[0]), columnHeaders];
  }
}