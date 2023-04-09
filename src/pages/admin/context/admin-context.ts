import { createContext } from 'react';
import { TableTypes } from '../components/table/types';

interface IAdminTablesContext {
  route: string;
  tableData?: TableTypes[] | null;
  setTableData: React.Dispatch<React.SetStateAction<TableTypes[] | null>>
}

export const AdminTablesContext = createContext<IAdminTablesContext>({
  route: '',
  tableData: [] as TableTypes[] | null,
  setTableData: () => undefined,
});