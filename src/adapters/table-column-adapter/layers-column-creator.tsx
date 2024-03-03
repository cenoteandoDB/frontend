import React from 'react';
import { DownloadButton } from '../../pages/admin/components/download-button';
import { DownloadLayer } from '../../pages/admin/components/download-layer';
import { PreviewLayer } from '../../pages/admin/components/preview-layer';
import { TableColumns } from '../../pages/admin/components/table/types';
import { LayersTableQueryQuery } from '../../__generated__/graphql';
import { ColumnCreator } from './table-column-creator';
import { TableColumnInterface } from './table-column-interface';

export class LayersColumnCreator extends ColumnCreator {
  enableFilter: string[];
  tableData: LayersTableQueryQuery['layers'];

  constructor(tableData: LayersTableQueryQuery['layers']) {
    super();
    this.tableData = tableData;
    this.enableFilter = ['metadatos', 'indice', 'descargar', 'preview'];
  }

  public factoryMethod(): TableColumnInterface {
    return new LayersColumns();
  }
}

class LayersColumns implements TableColumnInterface {
  buildColumnHeaders(
    tableData: LayersTableQueryQuery['layers']
  ): [string[], TableColumns[]] {
    const columnHeaders = tableData?.map((data, index) => {
      return {
        indice: index + 1,
        id: data?.id,
        nombre: data?.name,
        descripcion: data?.description,
        metadatos: <DownloadButton link={data?.metadata} />,
        descargar: <DownloadLayer layerId={data?.id ?? ''} />,
        preview: data?.thumbnail ? <PreviewLayer url={data.thumbnail}/> : null
      };
    });

    if (!columnHeaders) {
      return [[''], []];
    }

    return [Object.keys(columnHeaders[0]), columnHeaders];
  }
}
