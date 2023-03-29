import React, { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import {
  CenoteModel
} from '../../models/CenotesTypes';
import ReferenceModel from '../../models/ReferencesTypes';
import { VariableModel } from '../../models/VariablesTypes';
import { populateColumns } from '../../utils/populate-columns';
import { EditContent } from './editable-buttons';
import { CenoteandoTable } from './table';
import { CenoteTableColumns, TableColumns, TableTypes } from './types';

interface TableProps {
  route: string;
}

const classMap = {
  cenotes: (data: CenoteModel) => new CenoteModel(data),
  variables: (data: VariableModel) => new VariableModel(data),
  references: (data: ReferenceModel) => new ReferenceModel(data)
};

//TODO Think in a way to handle the wrapper and the fetchs
// should the parent component send the data or should this component
// make the fetch?

//TODO implement fetch call from here based on the table type
// In order to detect the table type we must need to extract the url from
// react router. E.g. "cenoteando.org/table/cenote", we extract "cenote" and
// we extract from a dictionary the route to fetch
export const CenoteandoTableWrapper: React.FC<TableProps> = ({ route }) => {
  const { data, loading, error, fetch } = useApi(
    `api/${route}`,
    'get',
    {},
    { size: 1500 }
  );
  //const { data, loading, error } = useLoaderData();
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
        edit: <EditContent id={remaining.id} route='cenotes' inputs={remaining}/>
      } as CenoteTableColumns;
    }
    if (dat instanceof VariableModel && dat) {
      return {
        id: dat.id,
        name: dat.name,
        description: dat.description,
        theme: dat.theme,
        timeSeries: dat.timeseries,
        multiple: dat.multiple,
        unit: dat.units,
        methodology: dat.methodology,
      };
    }
    
    if (dat instanceof ReferenceModel && dat) {
      return {
        id: dat.id,
        authors: dat.authors,
        shortName: dat.shortName,
        type: dat.type,
        year: dat.year,
      };
    }

    return {};
  });

  const tableKeys = columnHeaders ? Object.keys(columnHeaders?.[0]) : null;
  const columns = populateColumns<TableTypes>(tableKeys);

  useEffect(() => {
    if (data) {
      const classType = classMap[route as keyof typeof classMap];
      const classFromApi = data.content.map((cenote: CenoteModel & VariableModel & ReferenceModel) =>
        classType(cenote)
      );
      setTableData(classFromApi);
    }
  }, [data]);

  useEffect(() => {
    fetch();
  }, [route]);

  if (!columns) {
    return null;
  }

  return <CenoteandoTable data={columnHeaders} columns={columns} />;
};
