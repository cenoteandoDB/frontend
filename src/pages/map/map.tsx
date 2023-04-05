import React from 'react';
import { useApi } from '../../hooks/useApi';
import { CenoteModel } from '../../models/CenotesTypes';
import { MapComponentWrapper } from './components/map-component';

export const Map = () => {
  const [cenotes, setCenotes] = React.useState<CenoteModel[] | null>(null);
  const { data, loading, error, fetch } = useApi(
    'api/cenotes',
    'get',
    { size: 3000 }
  );

  React.useEffect(() => {
    if (data) {
      const cenotesMap = data.content.map(
        (cenote: CenoteModel) => new CenoteModel(cenote)
      );
      setCenotes(cenotesMap);
    }
  },[data]);

  React.useEffect(() => {
    fetch();
  },[]);

  if (!cenotes) {
    return null;
  }

  return <MapComponentWrapper data={cenotes} />;
};