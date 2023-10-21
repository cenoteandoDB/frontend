import React from 'react';

import { CenoteModel } from '../../models/CenotesTypes';
import { EditContent } from '../../pages/admin/components/edit-buttons';
import {
  adaptCenoteType,
  CenoteTableColumns
} from '../../pages/admin/components/table/types';
import { ViewButton } from '../../pages/admin/components/view-button';
import { formatDate } from '../../utils/formatDate';
import { CenotesTableQueryQuery } from '../../__generated__/graphql';
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
  buildColumnHeaders(
    tableData: CenotesTableQueryQuery['cenotes']
  ): [string[], CenoteTableColumns[]] {
    if (!tableData) {
      const defaultValues = {
        id: '',
        nombre: '',
        estado: '',
        municipalidad: '',
        creado: '',
        actualizado: '',
        turistico: false,
      };
      return [[''], [defaultValues]];
    }
    const columnHeaders = tableData
      .filter((x): x is NonNullable<typeof x> => x !== null)
      .map((data) => {
        return {
          id: data.id,
          nombre: data.name,
          estado: data.location.municipality,
          municipalidad: data.location.state,
          tipo: adaptCenoteType[data.type],
          problemas: data.issues,
          creado: formatDate(data.createdAt),
          actualizado: formatDate(data.updatedAt),
          turistico: data.touristic,
          editar: <EditContent newInput={data} />,
          ficha: <ViewButton link={data.id} />,
        };
      });
    return [Object.keys(columnHeaders[0]), columnHeaders];
  }
}
