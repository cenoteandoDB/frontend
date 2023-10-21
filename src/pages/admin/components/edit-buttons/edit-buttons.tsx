import React from 'react';

import { EditIcon } from '@chakra-ui/icons';
import { Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { CenotesTableQueryQuery } from '../../../../__generated__/graphql';
import { EditModalWrapper } from '../modals/edit-modal-wrapper';
import { TableTypes } from '../table/types';

export interface EditContentProps {
  inputs?: TableTypes;
  newInput: CenotesTableQueryQuery['cenotes'][0];
}

export const EditContent: React.FC<EditContentProps> = (props) => {
  const { inputs } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex gap={2} justifyContent='center'>
        <IconButton aria-label='' onClick={onOpen} size='sm' variant='ghost'>
          <EditIcon />
        </IconButton>
      </Flex>
      {isOpen && (
        <EditModalWrapper isOpen={isOpen} inputs={inputs} onClose={onClose} />
      )}
    </>
  );
};
