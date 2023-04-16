import React, { FC, useContext, useEffect, useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Flex,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { useApi } from '../../../../hooks/useApi';
import ReferenceModel from '../../../../models/ReferencesTypes';
import { AdminTablesContext } from '../../context/admin-context';
import { DeleteButton } from '../delete-button';
import { EditModalProps } from './edit-modal-wrapper';

enum TypeValues {
  JOURNAL,
  REPORT,
  BOOK,
  THESIS,
}

export const ReferencesEditModal: FC<EditModalProps> = (props) => {
  const { isOpen, inputs, method, onClose } = props;
  const { tableData, setTableData } = useContext(AdminTablesContext);
  const [modalState, setModalState] = useState<ReferenceModel>(
    inputs as ReferenceModel
  );
  const { data, status, loading, fetch } = useApi(
    `api/references${method === 'put' ? '/' + modalState.id : ''}`,
    method,
    {},
    {}
  );

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    const newVariablesObj = {
      ...modalState,
      [targetName]: targetValue,
    } as ReferenceModel;

    setModalState(new ReferenceModel(newVariablesObj));
  };

  const handleOnSaveCenote = () => {
    fetch(modalState);
  };

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
          <FormControl mb={4}>
            <FormLabel>Authors</FormLabel>
            <Input
              name='authors'
              value={modalState.authors}
              onChange={(event) => handleInputChange(event)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Short Name</FormLabel>
            <Textarea
              name='shortName'
              value={modalState.shortName}
              placeholder='Escribe un nombre corto aqui'
              size='sm'
              onChange={(event) => handleInputChange(event)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Type</FormLabel>
            <Select
              name='type'
              value={modalState.type}
              onChange={(event) => handleInputChange(event)}
            >
              {(Object.keys(TypeValues) as (keyof typeof TypeValues)[]).map(
                (key, index) => (
                  <option key={`${key}-${index}`} value={key}>
                    {TypeValues[key]}
                  </option>
                )
              )}
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Year</FormLabel>
            <Input
              name='year'
              placeholder='Año de publicacion'
              value={modalState.year}
              onChange={(event) => handleInputChange(event)}
            />
          </FormControl>
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
