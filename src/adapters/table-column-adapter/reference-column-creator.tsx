import React from 'react';
import ReferenceModel from '../../models/ReferencesTypes';
import { EditContent } from '../../pages/admin/components/edit-buttons';
import { TableColumns, TableTypes } from '../../pages/admin/components/table/types';
import { ColumnCreator } from './table-column-creator';
import { TableColumnInterface } from './table-column-interface';


export class ReferenceColumnCreator extends ColumnCreator {
  tableData: TableTypes[];

  constructor(tableData: ReferenceModel[]) {
    super();
    this.tableData = tableData;
  }

  public factoryMethod(): TableColumnInterface {
    return new ReferenceColumns();
  }
  
}

class ReferenceColumns implements TableColumnInterface {
  buildColumnHeaders(tableData: ReferenceModel[]): [string[], TableColumns[]] {
    const columnHeaders = tableData.map((data) => (
      {
        id: data.id,
        authors: data.authors,
        shortName: data.shortName,
        reference: data.reference,
        type: data.type,
        year: data.year,
        edit: <EditContent inputs={data} />
      }
    ));
    return [Object.keys(columnHeaders[0]), columnHeaders];
  }
  
}