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
  ModalFooter,
  Button,
  Flex,
  Select,
  InputLeftAddon,
  InputGroup,
  Tag,
  VStack,
  Checkbox,
  HStack,
  FormHelperText,
} from '@chakra-ui/react';
import { CenoteIssue, CenoteModel } from '../../../../models/CenotesTypes';
import { AdminTablesContext } from '../../context/admin-context';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { InputRightIcon } from '../input';
import { useApi } from '../../../../hooks/useApi';

export interface CenotesEditModalProps {
  isOpen: boolean;
  inputs: CenoteModel;
  onClose: () => void;
}

// TODO finish template and implement other forms
export const CenotesEditModal: FC<CenotesEditModalProps> = (props) => {
  const { tableData, setTableData } = useContext(AdminTablesContext);
  const { isOpen, inputs, onClose } = props;
  const [modalState, setModalState] = useState<CenoteModel>(inputs);
  const [alternativeNames, setAlternativeNames] = useState('');
  const [issues, setIssues] = useState('');
  const [helperText, setHelperText] = useState({
    alternativeNames: '',
  });
  const { data, status, loading, fetch } = useApi(
    `api/cenotes/${modalState.id}`,
    'put',
    {},
    {}
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    if (
      targetName === 'geojson-longitude' ||
      targetName === 'geojson-latitud'
    ) {
      const coordinates = [];

      if (targetName === 'geojson-longitude') {
        coordinates[0] = Number(targetValue);
        coordinates[1] = modalState.geojson.geometry.coordinates[1];
      }
      if (targetName === 'geojson-latitud') {
        coordinates[0] = modalState.geojson.geometry.coordinates[0];
        coordinates[1] = Number(targetValue);
      }

      const geojson = {
        ...modalState.geojson,
        geometry: {
          type: modalState.geojson.geometry.type,
          coordinates,
        },
      };

      const newCenotesObj = {
        ...modalState,
        geojson,
      } as CenoteModel;
      setModalState(new CenoteModel(newCenotesObj));
      return;
    }
    const newCenoteObj = {
      ...modalState,
      [targetName]: targetValue,
    } as CenoteModel;

    setModalState(new CenoteModel(newCenoteObj));
  };

  const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    if (targetName === 'issues') {
      if (modalState.issues.includes(targetValue as CenoteIssue)) {
        return;
      }
      const issues = [targetValue, ...modalState.issues];
      setIssues(targetValue);
      const newIssuesObj = {
        ...modalState,
        issues,
      } as CenoteModel;
      setModalState(new CenoteModel(newIssuesObj));
      return;
    }
    const newCenoteObj = {
      ...modalState,
      [event.target.name]: event.target.value,
    } as CenoteModel;

    setModalState(new CenoteModel(newCenoteObj));
  };

  const handleOnClickAlternativeNames = () => {
    if (!alternativeNames) return;
    const newAlternativeNamesArr = [
      alternativeNames,
      ...modalState.alternativeNames,
    ];
    const newCenoteObj = {
      ...modalState,
      alternativeNames: newAlternativeNamesArr,
    } as CenoteModel;
    setModalState(new CenoteModel(newCenoteObj));
    setAlternativeNames('');
    setHelperText({
      alternativeNames: '',
    });
  };

  const handleOnDeleteAlternativeName = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const alternativeNamesArr = modalState.alternativeNames;
    const target = event.target as HTMLButtonElement;
    console.log(target.name);

    const newAlternativeArr = alternativeNamesArr.filter(
      (name) => name !== target.name
    );
    const newCenoteObj = {
      ...modalState,
      alternativeNames: newAlternativeArr,
    } as CenoteModel;
    setModalState(new CenoteModel(newCenoteObj));
  };

  const handleEditAlternativeNames = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentValue: string
  ) => {
    const targetValue = event.target.value;
    const elementIndex = modalState.alternativeNames.indexOf(currentValue);
    if (elementIndex === -1) return;

    const newAlternativeNamesArr = modalState.alternativeNames;
    newAlternativeNamesArr[elementIndex] = targetValue;
    const newCenoteObj = {
      ...modalState,
      alternativeNames: newAlternativeNamesArr,
    } as CenoteModel;
    setModalState(new CenoteModel(newCenoteObj));
    setAlternativeNames('');
    setHelperText({
      alternativeNames: 'Valores actualizados correctamente',
    });
  };

  const handleOnSaveCenote = () => {
    fetch(modalState);
  };

  //Effect to keep client data in sync with server data
  useEffect(() => {
    if (data && status === 200) {
      onClose();
      const newArr = (tableData as CenoteModel[])
        .filter((data) => data.id !== modalState.id)
        .map((cenote) => new CenoteModel(cenote));
      setTableData([modalState, ...newArr]);
    }
  }, [data]);

  console.log(modalState, tableData);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar cenote</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mb={4}>
            <FormLabel>Nombre</FormLabel>
            <Input
              name='name'
              value={modalState.name}
              onChange={(event) => handleChange(event)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Tipo</FormLabel>
            <Select
              name='type'
              value={modalState.type}
              onChange={(event) => handleSelection(event)}
            >
              <option value='NO_TYPE'>Sin Tipo</option>
              <option value='CENOTE'>Cenote</option>
              <option value='DRY_CAVE'>Cueva Seca</option>
              <option value='WATER_WELL'>Pozo</option>
              <option value='WATERY'>Acuoso</option>
            </Select>
          </FormControl>

          <FormControl>
            <Flex>
              <FormLabel>Es Turistico?</FormLabel>
              <Checkbox
                name='touristic'
                isChecked={modalState.touristic}
                onChange={(event) =>
                  setModalState(
                    new CenoteModel({
                      ...modalState,
                      touristic: event.target.checked,
                    } as CenoteModel)
                  )
                }
              />
            </Flex>
          </FormControl>

          <FormControl mb={4}>
            <Flex direction='column'>
              <FormLabel>Coordenadas</FormLabel>
              <Flex gap={6} mb={4}>
                <InputGroup flex={3}>
                  <InputLeftAddon>Latitud</InputLeftAddon>
                  <Input
                    name='geojson-latitud'
                    type='number'
                    value={modalState.geojson.geometry.coordinates[1]}
                    onChange={(event) => handleChange(event)}
                  />
                </InputGroup>
                <Select flex={1}>
                  <option value='NORT'>N</option>
                  <option value='SOUTH'>S</option>
                </Select>
              </Flex>
              <Flex gap={6}>
                <InputGroup flex={3}>
                  <InputLeftAddon>Longitude</InputLeftAddon>
                  <Input
                    name='geojson-longitude'
                    type='number'
                    value={modalState.geojson.geometry.coordinates[0]}
                    onChange={(event) => handleChange(event)}
                  />
                </InputGroup>
                <Select flex={1}>
                  <option value='WEST'>W</option>
                  <option value='EAST'>E</option>
                </Select>
              </Flex>
            </Flex>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Problemas</FormLabel>
            <VStack alignItems='self-start'>
              <HStack wrap='wrap' gap={2}>
                {modalState.issues.length > 0 &&
                  modalState.issues.map((issue, index) => (
                    <Tag key={`${issue}-${index}`} colorScheme='red'>
                      {issue}
                    </Tag>
                  ))}
              </HStack>
              <Select
                name='issues'
                value={issues}
                onChange={(event) => handleSelection(event)}
              >
                <option value='DEFAULT'></option>
                <option value='GEOTAG_NOT_VERIFIED'>
                  Geotag no verificado
                </option>
                <option value='ANOTHER_PROBLEM'>Otro Problema</option>
                <option value='ANOTHER_PROBLEM_1'>Otro Problema</option>
              </Select>
            </VStack>
          </FormControl>

          <FormControl>
            <FormLabel>Nombres Alternativos</FormLabel>
            <Flex gap={2} direction='column'>
              {modalState.alternativeNames.map((name, index) => (
                <InputRightIcon
                  key={`${index}`}
                  inputValue={name}
                  inputName={name}
                  onChangeCallback={(event) =>
                    handleEditAlternativeNames(event, name)
                  }
                  onClickCallback={(event) =>
                    handleOnDeleteAlternativeName(event)
                  }
                  iconComponent={<CloseIcon />}
                />
              ))}

              <InputRightIcon
                inputValue={alternativeNames}
                onChangeCallback={(event) =>
                  setAlternativeNames(event.target.value)
                }
                onClickCallback={handleOnClickAlternativeNames}
                iconComponent={<CheckIcon />}
              />
              <FormHelperText color='green'>
                {helperText.alternativeNames}
              </FormHelperText>
            </Flex>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='blue'
            mr={3}
            isLoading={loading}
            onClick={handleOnSaveCenote}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
