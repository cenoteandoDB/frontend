import { gql, useQuery } from '@apollo/client';
import { Heading } from '@chakra-ui/react';
import React from 'react';
import {
  CenoteByIdQuery,
  CenotesTableQueryQuery,
  UpdateCenoteFieldsFragment,
} from '../../../../../../__generated__/graphql';
import { UPDATE_CENOTE_FRAGMENT } from '../../fragments/cenote-form-fragments';
import { CenoteForm } from './cenote-form';

const GET_EDITABLE_CENOTE = gql`
  ${UPDATE_CENOTE_FRAGMENT}
  query CenoteById($cenoteId: ID!) {
    cenoteById(id: $cenoteId) {
      ...UpdateCenoteFields
    }
  }
`;

export interface CenoteFormWrapperProps {
  cenoteId: CenotesTableQueryQuery['cenotes'][0]['id'];
  isOpen: boolean;
  onClose: () => void;
}

export const CenoteFormWrapper: React.FC<CenoteFormWrapperProps> = ({
  cenoteId,
  isOpen,
  onClose,
}) => {
  const { data, loading, error } = useQuery<CenoteByIdQuery>(
    GET_EDITABLE_CENOTE,
    {
      variables: {
        cenoteId,
      },
    }
  );

  if (!data || !data.cenoteById) {
    return null;
  }

  return <Heading>WRAPERER</Heading>;

  // return (
  //   <CenoteForm
  //     cenote={data.cenoteById as UpdateCenoteFieldsFragment}
  //     isOpen={isOpen}
  //     onClose={onClose}
  //   />
  // );
};
