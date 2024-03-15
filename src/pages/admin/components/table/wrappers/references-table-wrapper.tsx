import React from 'react';

import { useQuery } from '@apollo/client';
import { LoadingSpinner } from '../../../../../components/loading-spinner';
import { gql } from '../../../../../__generated__';
import { Heading } from '@chakra-ui/react';
import { columnFactory } from '../../../../../adapters/table-column-adapter/column-factory';
import { CenoteandoTable } from '../cenoteando-table';

const GET_REFERENCES_LIST = gql(/* GraphQL */ `
  query ReferencesTableQuery {
    references {
      cenoteando_id
      type
      unique_code
      title
      short_name
      date_primary
      authors
      journal_name
      issue
      institution
      date_secondary
      book
      pages
      doi
      url
      keywords
      has_pdf
      pdf_name
      mendeley_ref
      uploaded_mendeley
      validated_mendeley
      uploaded_dropbox
      uploaded_gcp
      cenotes_count
      species_count
      createdAt
      updatedAt
    }
  }
`);

export const ReferencesTableWrapper = () => {
  const { data, error, loading } = useQuery(GET_REFERENCES_LIST, {
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data || data.references?.length === 0 || error) {
    return <Heading>Something went wrong</Heading>;
  }

  const tableValues = columnFactory(data.references)?.buildColumnHeaders();

  if (!tableValues) {
    return null;
  }

  return <CenoteandoTable columns={tableValues[0]} data={tableValues[1]} />;
};
