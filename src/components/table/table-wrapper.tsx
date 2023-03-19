import React, { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
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
  tableData?: TableTypes[];
}

//TODO Think in a way to handle the wrapper and the fetchs
// should the parent component send the data or should this component
// make the fetch?

//TODO implement fetch call from here based on the table type
// In order to detect the table type we must need to extract the url from
// react router. E.g. "cenoteando.org/table/cenote", we extract "cenote" and
// we extract from a dictionary the route to fetch
export const CenoteandoTableWrapper: React.FC<TableProps> = () => {
  const { data, loading, error, fetch } = useApi('api/cenotes', 'get', {}, { size: 150 });
  const [tableData, setTableData] = useState<TableTypes[] | null>(null);

  const columnHeaders: TableColumns[] | undefined = tableData?.map((dat) => {
    if (dat instanceof CenoteModel && dat) {
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
    if (dat instanceof VariableModel && dat) {
      return dat;
    }

    return {};
  });

  const tableKeys = columnHeaders ? Object.keys(columnHeaders?.[0]) : null;
  const columns = populateColumns<TableTypes>(tableKeys);

  useEffect(() => {
    if (data !== null) {
      const cenotesMap = data.content.map(
        (cenote: CenoteModel) => new CenoteModel(cenote)
      );
      setTableData(cenotesMap);
    }
  }, [data]);

  useEffect(() => {
    fetch();
  }, []);

  if (!columns) {
    return null;
  }

  return <CenoteandoTable data={columnHeaders} columns={columns} />;
};
