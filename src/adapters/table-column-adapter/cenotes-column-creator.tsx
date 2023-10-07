import React from 'react';
import { CenoteModel, CenoteType } from '../../models/CenotesTypes';
import { EditContent } from '../../pages/admin/components/edit-buttons';
import {
  CenoteTableColumns,
  TableColumns,
} from '../../pages/admin/components/table/types';
import { ViewButton } from '../../pages/admin/components/view-button';
import { ColumnCreator } from './table-column-creator';
import { TableColumnInterface } from './table-column-interface';

export class CenotesColumnCreator extends ColumnCreator {
  enableFilter: string[];
  tableData: CenoteModel[];

  constructor(tableData: CenoteModel[]) {
    super();
    this.tableData = tableData;
    this.enableFilter = ['editar', 'ficha'];
  }

  public factoryMethod(): TableColumnInterface {
    return new CenotesColumns();
  }
}

class CenotesColumns implements TableColumnInterface {
  buildColumnHeaders(tableData: CenoteModel[]): [string[], TableColumns[]] {
    const columnHeaders = tableData.map(
      (data) =>
        ({
          id: data.id,
          nombre: data.name,
          estado: data.gadm?.name_1,
          municipalidad: data.gadm?.name_2,
          tipo: CenoteType[data.type as keyof typeof CenoteType],
          problemas: data.issues,
          creado: data.formatCreatedAtDate(),
          actualizado: data.formatUpdatedAtDate(),
          turistico: data.touristic,
          editar: <EditContent inputs={data} />,
          ficha: <ViewButton link={data.id} />,
        } as CenoteTableColumns)
    );
    return [Object.keys(columnHeaders[0]), columnHeaders];
  }
}
