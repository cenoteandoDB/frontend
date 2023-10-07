import React from 'react';
import { VariableModel } from '../../models/VariablesTypes';
import { EditContent } from '../../pages/admin/components/edit-buttons';
import {
  TableTypes,
  VariablesTableColumns,
} from '../../pages/admin/components/table/types';
import { ColumnCreator } from './table-column-creator';
import { TableColumnInterface } from './table-column-interface';

export class VariablesColumnCreator extends ColumnCreator {
  enableFilter: string[];
  tableData: TableTypes[];

  constructor(tableData: VariableModel[]) {
    super();
    this.tableData = tableData;
    this.enableFilter = ['edit'];
  }

  public factoryMethod(): TableColumnInterface {
    return new VariablesColumns();
  }
}

class VariablesColumns implements TableColumnInterface {
  buildColumnHeaders(
    tableData: VariableModel[]
  ): [string[], VariablesTableColumns[]] {
    const columnHeaders = tableData.map(
      (data) =>
        ({
          id: data.id,
          nombre: data.name,
          descripcion: data.description,
          tema: data.theme,
          nivel_de_acceso: data.accessLevel,
          tipo_dato: data.type,
          origen: data.origin,
          series: data.timeseries,
          multiplos: data.multiple,
          enumValues: data.enumValues,
          unidad: data.units,
          metodologia: data.methodology,
          editar: <EditContent inputs={data} />,
        } as VariablesTableColumns)
    );
    return [Object.keys(columnHeaders[0]), columnHeaders];
  }
}
