import React from 'react';
import { createContext } from 'react';
import { TableColumns, TableTypes } from '../components/table/types';
export const AdminTablesContext = createContext({
  route: '',
  tableData: [] as TableTypes[] | null,
  setTableData: (tableData: TableTypes[]) => (null),
});