import React from 'react';
import { useQuery } from '@apollo/client';
import { columnFactory } from '../../../../adapters/table-column-adapter/column-factory';
import { LoadingSpinner } from '../../../../components/loading-spinner';
import { gql } from '../../../../__generated__';
import { CenoteandoTable } from './table';

const GET_LAYERS_LISTS = gql(/* GraphQL */ `
  query Layers {
    layers {
      description
      id
      name
      metadata
    }
  }
`);

export const LayersTableWrapper = () => {
  const { loading, error, data } = useQuery(GET_LAYERS_LISTS);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data?.layers || data.layers.length === 0) {
    return null;
  }

  const layers = data.layers || [];

  const columns = columnFactory(layers)?.buildColumnHeaders() || undefined;

  if (!columns?.[0] || !columns?.[1]) {
    return null;
  }

  return <CenoteandoTable data={columns[1]} columns={columns[0]} />;
};
