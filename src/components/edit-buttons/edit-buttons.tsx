import React, { useState } from 'react';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { TableTypes } from '../table/types';
import { EditModalWrapper } from '../edit-modals/edit-modal-wrapper';

interface EditContentProps {
  id: string;
  route: string;
  inputs: TableTypes;
}

export const EditContent: React.FC<EditContentProps> = (props) => {
  const { id, route, inputs } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  //TODO make a hook to extract the route isteand of passing as a prop
  const location = useLocation();

  return (
    <>
      <Flex gap={2}>
        <IconButton aria-label='' onClick={onOpen}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label=''>
          <DeleteIcon />
        </IconButton>
      </Flex>
      <EditModalWrapper
        id={id}
        isOpen={isOpen}
        route={route}
        inputs={inputs}
        onClose={onClose}
      />
    </>
  );
};
