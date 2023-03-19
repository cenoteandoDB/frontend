import React from 'react';
import {
  CenoteIssue,
  CenoteModel,
  CenoteType,
} from '../../models/CenotesTypes';
import { VariableModel } from '../../models/VariablesTypes';
import { populateColumns } from '../../utils/populate-columns';
import { CenoteandoTable } from './table';

export type TableTypes = CenoteModel | VariableModel;

interface CenoteTableColumns {
  id: string;
  name: string;
  state: string;
  municipality: string;
  type: CenoteType;
  issues: CenoteIssue[];
  createdAt: string;
  updatedAt: string;
  touristic: boolean;
}

type TableColumns = CenoteTableColumns | VariableModel | object;

interface TableProps {
  tableData: TableTypes[];
}

export const CenoteandoTableWrapper: React.FC<TableProps> = ({ tableData }) => {
  if (!tableData) {
    return null;
  }

  const columnHeaders: TableColumns[] = tableData.map((dat) => {
    if (dat instanceof CenoteModel) {
      const { geojson, gadm, social, alternativeNames, ...remaining } = dat;

      return {
        id: remaining.id,
        name: remaining.name,
        state: gadm?.name_1,
        municipality: gadm?.name_2,
        type: remaining.type,
        issues: remaining.issues,
        createdAt: remaining.createdAt,
        updatedAt: remaining.updatedAt,
        touristic: remaining.touristic,
      } as CenoteTableColumns;
    }
    if (dat instanceof VariableModel) {
      return dat;
    }

    return {};
  });

  const tableKeys = Object.keys(columnHeaders?.[0]);
  const columns = populateColumns<TableTypes>(tableKeys);

  console.log(columnHeaders, columns);

  return <CenoteandoTable data={columnHeaders} columns={columns} />;
};
