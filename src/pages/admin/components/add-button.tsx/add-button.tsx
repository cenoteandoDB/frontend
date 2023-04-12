import React from 'react';

import { AddIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure } from '@chakra-ui/react';

import { TableTypes } from '../table/types';
import { EditModalWrapper } from '../edit-modals';

interface AddButtonProps {
  inputs?: TableTypes;
}

export const AddButton: React.FC<AddButtonProps> = (props) => {
  const { inputs } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        colorScheme='blue'
        aria-label='Agregar nuevo elemento'
        icon={<AddIcon />}
        size='xs'
        onClick={onOpen}
      />
      {isOpen && (
        <EditModalWrapper isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
};
