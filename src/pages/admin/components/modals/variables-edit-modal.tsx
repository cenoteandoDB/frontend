import React, { FC, useContext, useState, useEffect } from 'react';

import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { useApi } from '../../../../hooks/useApi';
import { VariableModel } from '../../../../models/VariablesTypes';
import { AdminTablesContext } from '../../context/admin-context';
import { DeleteButton } from '../delete-button';

import { EditModalProps } from './edit-modal-wrapper';

enum ThemeValues {
  ORGANIZATION = 'ORGANIZATION',
  LOCATION = 'LOCATION',
  TOURISM = 'TOURISM',
  WATER = 'WATER',
  BIODIVERSITY = 'BIODIVERSITY',
  CULTURAL = 'CULTURAL',
  DISTURBANCE = 'DISTURBANCE',
  DIVING = 'DIVING',
  GEOMORPHOLOGY = 'GEOMORPHOLOGY',
  REGULATION = 'REGULATION',
  GEOREFERENCE = 'GEOREFERENCE',
}

export const VariablesEditModal: FC<EditModalProps> = (props) => {
  const { isOpen, inputs, onClose } = props;
  const { tableData, setTableData } = useContext(AdminTablesContext);
  const [modalState, setModalState] = useState<VariableModel>(
    inputs as VariableModel
  );
  const { data, status, loading, fetch } = useApi(
    `api/variables/${modalState.id}`,
    'put',
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
    } as VariableModel;

    setModalState(new VariableModel(newVariablesObj));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetName = event.target.name;
    const targetValue = event.target.checked;

    const newVariableObj = {
      ...modalState,
      [targetName]: targetValue,
    } as VariableModel;
    setModalState(new VariableModel(newVariableObj));
  };

  const handleOnSaveCenote = () => {
    fetch(modalState);
  };

  useEffect(() => {
    if (data && status === 200) {
      onClose();
      const newArr = (tableData as VariableModel[])
        .filter((data) => data.id !== modalState.id)
        .map((cenote) => new VariableModel(cenote));
      setTableData([modalState, ...newArr]);
    }
  }, [data]);

  //TODO change unit to a Select with an enum
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Variable</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mb={4}>
            <FormLabel>Nombre</FormLabel>
            <Input
              name='name'
              value={modalState.name}
              onChange={(event) => handleInputChange(event)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              name='description'
              value={modalState.description}
              placeholder='Escribe la descripción de la variable'
              size='sm'
              onChange={(event) => handleInputChange(event)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Theme</FormLabel>
            <Select
              name='theme'
              value={modalState.theme}
              onChange={(event) => handleInputChange(event)}
            >
              {(Object.keys(ThemeValues) as (keyof typeof ThemeValues)[]).map(
                (key, index) => (
                  <option key={`${key}-${index}`} value={key}>
                    {ThemeValues[key]}
                  </option>
                )
              )}
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <Flex justifyContent='space-evenly'>
              <Checkbox
                name='timeseries'
                isChecked={modalState.timeseries}
                onChange={(event) => handleCheckboxChange(event)}
              >
                Time series
              </Checkbox>
              <Checkbox
                name='multiple'
                isChecked={modalState.multiple}
                onChange={(event) => handleCheckboxChange(event)}
              >
                Multiple
              </Checkbox>
            </Flex>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Unidad</FormLabel>
            <Input
              name='units'
              placeholder='Unidades'
              value={modalState.units ?? ''}
              onChange={(event) => handleInputChange(event)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Metodología</FormLabel>
            <Textarea
              name='methodology'
              value={modalState.methodology ?? ''}
              placeholder='Escribe la metodología'
              size='sm'
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
