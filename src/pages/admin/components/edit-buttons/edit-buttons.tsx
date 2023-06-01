import React from 'react';

import { EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { EditModalWrapper } from '../modals/edit-modal-wrapper';
import { TableTypes } from '../table/types';
import { Link } from 'react-router-dom';

export interface EditContentProps {
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
        <Link to={`/cenote/${inputs.id}`} target="_blank">
          <IconButton aria-label='' size='sm' variant='ghost'>
            <ViewIcon />
          </IconButton>
        </Link>
      </Flex>
      {isOpen && (
        <EditModalWrapper isOpen={isOpen} inputs={inputs} onClose={onClose} />
      )}
    </>
  );
};
