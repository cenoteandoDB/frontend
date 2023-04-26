import React from 'react';
import { VariableModel } from '../../models/VariablesTypes';
import { EditContent } from '../../pages/admin/components/edit-buttons';
import { TableTypes, VariablesTableColumns } from '../../pages/admin/components/table/types';
import { ColumnCreator } from './table-column-creator';
import { TableColumnInterface } from './table-column-interface';

export class VariablesColumnCreator extends ColumnCreator {
  tableData: TableTypes[];

  constructor(tableData: VariableModel[]) {
    super();
    this.tableData = tableData;
  }

  public factoryMethod(): TableColumnInterface {
    return new VariablesColumns();
  }
}

class VariablesColumns implements TableColumnInterface {
  buildColumnHeaders(tableData: VariableModel[]): [string[], VariablesTableColumns[]] {
    const columnHeaders = tableData.map((data) => (
      {
        id: data.id,
        name: data.name,
        description: data.description,
        theme: data.theme,
        accessLevel: data.accessLevel,
        dataType: data.type,
        origin: data.origin,
        timeSeries: data.timeseries,
        multiple: data.multiple,
        enumValues: data.enumValues,
        unit: data.units,
        methodology: data.methodology,
        edit: <EditContent inputs={data} />
      } as VariablesTableColumns
    ));
    return [Object.keys(columnHeaders[0]), columnHeaders];
  }
  
}