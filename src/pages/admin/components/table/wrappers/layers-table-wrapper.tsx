import React from 'react';
import { useQuery } from '@apollo/client';
import { columnFactory } from '../../../../../adapters/table-column-adapter/column-factory';
import { LoadingSpinner } from '../../../../../components/loading-spinner';
import { gql } from '../../../../../__generated__';
import { CenoteandoTable } from '../cenoteando-table';

const GET_LAYERS_LISTS = gql(/* GraphQL */ `
  query LayersTableQuery {
    layers {
      description
      id
      name
      metadata
      thumbnail
    }
  }
`);

export const LayersTableWrapper = () => {
  const { loading, error, data } = useQuery(GET_LAYERS_LISTS, {
    fetchPolicy: 'cache-first'
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data?.layers || data.layers.length === 0 || error) {
    console.error(error);
    return null;
  }

  const layers = data.layers || [];

  const tableValues = columnFactory(layers)?.buildColumnHeaders() || undefined;

  if (!tableValues) {
    return null;
  }

  return <CenoteandoTable columns={tableValues[0]} data={tableValues[1]} />;
};
