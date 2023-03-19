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

//TODO Think in a way to handle the wrapper and the fetchs
// should the parent component send the data or should this component
// make the fetch?

//TODO implement fetch call from here based on the table type
// In order to detect the table type we must need to extract the url from
// react router. E.g. "cenoteando.org/table/cenote", we extract "cenote" and
// we extract from a dictionary the route to fetch
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
