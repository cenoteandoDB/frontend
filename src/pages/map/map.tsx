import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { LoadingSpinner } from '../../components/loading-spinner';
import { MapComponentWrapper } from '../../components/map-component';
import { CenotesGeoJsonQuery } from '../../__generated__/graphql';

const GET_CENOTES_FOR_MAP = gql`
  query CenotesGeoJson {
    cenotes {
      id
      name
      type
      touristic
      location {
        geojson
      }
    }
  }
`;

export const Map = () => {
  const { data, error, loading } =
    useQuery<CenotesGeoJsonQuery>(GET_CENOTES_FOR_MAP);

  if (!data && loading) {
    return <LoadingSpinner />;
  }

  if (!data?.cenotes) {
    return null;
  }

  return <MapComponentWrapper data={data.cenotes} />;
};
