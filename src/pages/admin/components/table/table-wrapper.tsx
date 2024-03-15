import React from 'react';

import { getTableComponent } from './table-wrapper-dictionary';

interface TableProps {
  route: string;
}

export const CenoteandoTableWrapper: React.FC<TableProps> = ({ route }) => {
  const CenoteandoTableWrapper = getTableComponent(route);
  return <CenoteandoTableWrapper />;
};
