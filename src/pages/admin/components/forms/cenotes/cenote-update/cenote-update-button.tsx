import { useMutation, gql } from '@apollo/client';
import { Button, Flex, useToast } from '@chakra-ui/react';
import React from 'react';

import {
  UpdateCenoteFieldsFragment,
  UpdateCenoteMutation,
} from '../../../../../../__generated__/graphql';
import { UPDATE_CENOTE_FRAGMENT } from '../../fragments/cenote-form-fragments';

const UPDATE_CENOTE_BY_ID = gql`
  ${UPDATE_CENOTE_FRAGMENT}
  mutation UpdateCenote($updatedCenote: UpdatedCenoteInput!) {
    updateCenote(updated_cenote: $updatedCenote) {
      ...UpdateCenoteFields
    }
  }
`;

interface CenoteUpdateButtonProps {
  cenoteToUpdate: UpdateCenoteMutation['updateCenote'];
  onClose: () => void;
}

export const CenoteUpdateButton: React.FC<CenoteUpdateButtonProps> = ({
  cenoteToUpdate,
  onClose,
}) => {
  const [updateCenote, { data, loading, error }] =
    useMutation<UpdateCenoteFieldsFragment>(UPDATE_CENOTE_BY_ID);
  const toast = useToast();

  if (!cenoteToUpdate) return null;
  delete cenoteToUpdate.__typename;

  if (!loading && data && !error) {
    console.log('showing toast');

    toast({
      title: `Cenote ${data?.id} actualizado`,
      status: 'success',
      description: 5000,
      isClosable: true,
      position: 'bottom',
    });
    onClose();
  }

  return (
    <>
      <Flex gap={3}>
        <Button>Cancelar</Button>
        <Button
          isLoading={loading}
          onClick={() => {
            updateCenote({
              variables: {
                updatedCenote: cenoteToUpdate,
              },
            });
          }}
        >
          Guardar
        </Button>
      </Flex>
    </>
  );
};
