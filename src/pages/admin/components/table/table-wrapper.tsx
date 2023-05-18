import React, { useEffect, useState } from 'react';

import { useApi } from '../../../../hooks/useApi';

import { CenoteandoTable } from './table';
import { TableTypes } from './types';
import { AdminTablesContext } from '../../context/admin-context';
import { LoadingSpinner } from '../../../../components/loading-spinner';
import { dataAdapter } from '../../../../adapters/api-data/api-data-adapter';
import { columnFactory } from '../../../../adapters/table-column-adapter/column-factory';
interface TableProps {
  route: string;
}


//TODO Think in a way to handle the wrapper and the fetchs
// should the parent component send the data or should this component
// make the fetch?

//TODO implement fetch call from here based on the table type
// In order to detect the table type we must need to extract the url from
// react router. E.g. "cenoteando.org/table/cenote", we extract "cenote" and
// we extract from a dictionary the route to fetch
export const CenoteandoTableWrapper: React.FC<TableProps> = ({ route }) => {
  const [tableData, setTableData] = useState<TableTypes[] | null>(null);
  //TODO implement destructuration
  const columns = columnFactory(tableData)?.buildColumnHeaders()  || undefined;
  const { data, loading, error, fetch } = useApi(
    `api/${route}`,
    'get',
    { size: 3000 }
  );

  useEffect(() => {
    if (data) {
      setTableData(dataAdapter(route, data));
    }
  }, [data]);

  useEffect(() => {
    fetch();
  }, [route]);

  //TODO implement error handling
  if (error) {
    return null;
  }

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  if (!columns?.[0] || !columns?.[1]) {
    return null;
  }

  return (
    <AdminTablesContext.Provider
      value={{
        route: route,
        tableData,
        setTableData,
      }}
    >
      <CenoteandoTable data={columns[1]} columns={columns[0]} />
    </AdminTablesContext.Provider>
  );
};
