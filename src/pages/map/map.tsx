import React from 'react';
import { dataAdapter } from '../../adapters/api-data/api-data-adapter';
import { LoadingSpinner } from '../../components/loading-spinner';
import { MapComponentWrapper } from '../../components/map-component';
import { useApi } from '../../hooks/useApi';
import { CenoteModel } from '../../models/CenotesTypes';

export const Map = () => {
  const [cenotes, setCenotes] = React.useState<CenoteModel[] | null>(null);
  const { data, loading, error, fetch } = useApi('api/cenotes', 'get', {
    size: 3000,
  });

  React.useEffect(() => {
    if (data) {
      setCenotes(dataAdapter('cenotes', data));
    }
  }, [data]);

  React.useEffect(() => {
    fetch();
  }, []);

  if (!data && loading) {
    return (
      <LoadingSpinner />
    );
  }

  if (!cenotes) {
    return null;
  }

  return <MapComponentWrapper data={cenotes} />;
};
