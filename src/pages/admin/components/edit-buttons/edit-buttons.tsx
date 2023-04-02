import React from 'react';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { EditModalWrapper } from '../edit-modals/edit-modal-wrapper';
import { TableTypes } from '../table/types';

interface EditContentProps {
  inputs: TableTypes;
}

export const EditContent: React.FC<EditContentProps> = (props) => {
  const { inputs } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex gap={2}>
        <IconButton aria-label='' onClick={onOpen} size='sm' variant='ghost'>
          <EditIcon />
        </IconButton>
        <IconButton aria-label='' size='sm' variant='ghost'>
          <DeleteIcon />
        </IconButton>
      </Flex>
      {isOpen && (
        <EditModalWrapper
          isOpen={isOpen}
          inputs={inputs}
          onClose={onClose}
        />
      )}
    </>
  );
};