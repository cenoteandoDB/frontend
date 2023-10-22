import React, { useEffect, useState } from 'react';

import { useApi } from '../../../../hooks/useApi';

import { dataAdapter } from '../../../../adapters/api-data/api-data-adapter';
import { columnFactory } from '../../../../adapters/table-column-adapter/column-factory';
import { LoadingSpinner } from '../../../../components/loading-spinner';
import { AdminTablesContext } from '../../context/admin-context';
import { CenoteandoTable } from './cenoteando-table';
import { TableTypes } from './types';
import { getTableComponent } from './table-wrapper-dictionary';
import { useDisclosure } from '@chakra-ui/react';

interface ModalContextType {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const ModalContext = React.createContext<ModalContextType | undefined>(
  undefined
);

interface ModalContextProviderProps {
  children: JSX.Element;
}

export const CustomModalContextProvider: React.FC<
  ModalContextProviderProps
> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const contextValue = React.useMemo(
    () => ({
      isOpen,
      onClose,
      onOpen,
    }),
    [isOpen]
  );

  console.log('rendering');

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

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
  const { data, loading, error, fetch } = useApi(`api/${route}`, 'get', {
    size: 3000,
  });

  useEffect(() => {
    if (data) {
      setTableData(dataAdapter(route, data));
    }
  }, [data]);

  useEffect(() => {
    fetch();
  }, [route]);

  if (route === 'layers' || route === 'cenotes') {
    const CenoteandoTableWrapper = getTableComponent(route);
    return <CenoteandoTableWrapper />;
  }

  //TODO implement error handling
  if (error) {
    return null;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  const columns = columnFactory(tableData)?.buildColumnHeaders() || undefined;

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
      <CustomModalContextProvider>
        <CenoteandoTable data={columns[1]} columns={columns[0]} />
      </CustomModalContextProvider>
    </AdminTablesContext.Provider>
  );
};
