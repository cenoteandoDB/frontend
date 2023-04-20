import React, { FC, useContext, useEffect, useState } from 'react';
import { classMap } from '../../../../adapters/api-data/api-data-adapter';

import { AdminTablesContext } from '../../context/admin-context';
import { TableTypes } from '../table/types';

import { CenotesEditModal } from './cenotes-edit-modal';
import { ReferenceModalProps, ReferencesEditModal } from './references-edit-modal';
import { VariablesEditModal } from './variables-edit-modal';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, Button } from '@chakra-ui/react';
import { DeleteButton } from '../delete-button';
import { useApi } from '../../../../hooks/useApi';
import ReferenceModel from '../../../../models/ReferencesTypes';


const editModalDictionary = {
  cenotes: CenotesEditModal,
  variables: VariablesEditModal,
  references: ReferencesEditModal
};

export interface EditModalProps {
  isOpen?: boolean;
  inputs?: TableTypes;
  setInputs?: React.Dispatch<React.SetStateAction<TableTypes>>
  onClose?: () => void;
}

//TODO check why the insert is not working
//TODO change name to something more generic
//TODO make the modals reutilizable and improve code

export const EditModalWrapper: React.FC<EditModalProps> = (props) => {
  const { route } = useContext(AdminTablesContext);
  const { isOpen, inputs, onClose } = props;
  const [modalState, setModalState] = useState<TableTypes>(
    inputs as TableTypes
  );
  const { tableData, setTableData } = useContext(AdminTablesContext);
  const { data, status, loading, fetch } = useApi(
    `api/${route}/${inputs?.id}`,
    'put',
    {},
    {}
  );

  const handleOnSaveCenote = () => {
    fetch(modalState);
  };

  const EditModalComponent: FC<EditModalProps> | FC<ReferenceModalProps> =
    editModalDictionary[route as keyof typeof editModalDictionary];

  if (!isOpen || !onClose) {
    return null;
  }

  if (!inputs) {
    const clazz = classMap[route as keyof typeof classMap];
    const newInput = clazz();

    return (
      <EditModalComponent
        isOpen={isOpen}
        inputs={newInput as typeof EditModalComponent.prototype}
        setInputs={setModalState}
        onClose={onClose}
      />
    );
  }

  useEffect(() => {
    if (data && status === 200) {
      onClose();
      const newArr = (tableData as ReferenceModel[])
        .filter((data) => data.id !== modalState.id)
        .map((cenote) => new ReferenceModel(cenote));
      setTableData([modalState, ...newArr]);
    }
  }, [data]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Variable</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <EditModalComponent
            isOpen={isOpen}
            inputs={modalState as typeof EditModalComponent.prototype}
            setInputs={setModalState}
            onClose={onClose}
          />
        </ModalBody>

        <ModalFooter>
          <Flex alignContent='flex-start' width='100%'>
            <DeleteButton modalState={inputs} onCloseModal={onClose} />
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
