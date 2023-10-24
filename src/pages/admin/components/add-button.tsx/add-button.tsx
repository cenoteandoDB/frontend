import React from 'react';

import { AddIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure } from '@chakra-ui/react';

import { TableTypes } from '../table/types';
import { AddModalWrapper } from '../modals/add-modal-wrapper';
import { useLocation } from 'react-router-dom';
import { CenoteAddForm } from '../forms/cenotes/cenote-add/cenote-add-form';

interface AddButtonProps {
  inputs?: TableTypes;
}

export const AddButton: React.FC<AddButtonProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  if (location.pathname === '/admin/cenotes') {
    return (
      <>
        <IconButton
          colorScheme='blue'
          aria-label='Agregar nuevo elemento'
          icon={<AddIcon />}
          size='xs'
          onClick={onOpen}
        />
        <CenoteAddForm isOpen={isOpen} onClose={onClose} />
      </>
    );
  }

  return (
    <>
      <IconButton
        colorScheme='blue'
        aria-label='Agregar nuevo elemento'
        icon={<AddIcon />}
        size='xs'
        onClick={onOpen}
      />
      {isOpen && <AddModalWrapper isOpen={isOpen} onClose={onClose} />}
    </>
  );
};
