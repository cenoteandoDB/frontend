import React from 'react';

import { CenoteModel } from '../../models/CenotesTypes';
import { EditContent } from '../../pages/admin/components/edit-buttons';
import {
  adaptCenoteIssue,
  adaptCenoteType,
  CenoteTableColumns,
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
    const columnHeaders = tableData.map((data) => {
      const filteredDataIssues =
        (data.issues &&
          data.issues
            .filter((x): x is NonNullable<typeof x> => x !== null)
            .map((y) => adaptCenoteIssue[y])) ??
        [];
      return {
        id: data.id,
        nombre: data.name,
        estado: data.location.municipality,
        municipalidad: data.location.state,
        tipo: adaptCenoteType[data.type],
        problemas: filteredDataIssues,
        creado: formatDate(data.createdAt),
        actualizado: formatDate(data.updatedAt),
        turistico: data.touristic,
        editar: <EditContent inputs={data} url={`/admin/cenotes/form/${data.id}`} />,
        ficha: <ViewButton link={data.id} />,
      };
    });
    return [Object.keys(columnHeaders[0]), columnHeaders];
  }
}
