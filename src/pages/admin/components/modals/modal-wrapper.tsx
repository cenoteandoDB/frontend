import React, { FC, useContext } from 'react';

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, Button, useDisclosure } from '@chakra-ui/react';
import { DeleteButton } from '../delete-button';
import { AdminTablesContext } from '../../context/admin-context';
import { TableTypes } from '../table/types';


interface ModalWrapperProps {
  children: JSX.Element;
  modalState: TableTypes;
  loading: boolean;
  isOpen: boolean;
  handleOnSaveCenote: () => void;
  onClose: () => void;
}

export const ModalWrapper: FC<ModalWrapperProps> = (props) => {
  const { children, modalState, loading, isOpen, handleOnSaveCenote, onClose } = props;
  const { route } = useContext(AdminTablesContext);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit {route}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {children}
        </ModalBody>

        <ModalFooter>
          <Flex alignContent='flex-start' width='100%'>
            <DeleteButton modalState={modalState} onCloseModal={onClose} />
          </Flex>
          <Flex>
            <Button
              colorScheme='blue'
              mr={3}
              isLoading={loading}
              onClick={handleOnSaveCenote}
            >
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};