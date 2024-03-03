import React from 'react';

import { useQuery } from '@apollo/client';
import { LoadingSpinner } from '../../../../../components/loading-spinner';
import { gql } from '../../../../../__generated__';
import { CenoteandoTable } from '../cenoteando-table';
import { Heading } from '@chakra-ui/react';
import { columnFactory } from '../../../../../adapters/table-column-adapter/column-factory';

const GET_CENOTES_LIST = gql(/* GraphQL */ `
  query CenotesTableQuery {
    cenotes {
      id
      name
      location {
        state
        county
      }
      type
      createdAt
      updatedAt
      touristic
      issues
      variable_count
    }
  }
`);

export const CenotesTableWrapper = () => {
  const { data, error, loading } = useQuery(GET_CENOTES_LIST, {
    fetchPolicy: 'cache-first'
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data || data.cenotes?.length === 0 || error) {
    return <Heading>Something went wrong</Heading>;
  }

  const tableValues = columnFactory(data.cenotes)?.buildColumnHeaders();

  if (!tableValues) {
    return null;
  }

  return <CenoteandoTable columns={tableValues[0]} data={tableValues[1]} />;
};
