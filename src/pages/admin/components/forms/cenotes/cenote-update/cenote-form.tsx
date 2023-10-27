import React, { FC, useState } from 'react';

import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
} from '@chakra-ui/react';
import { CenoteTag } from '../../../../../../components/tags';
import {
  CenoteByIdQuery,
  CenoteIssue,
  UpdateCenoteFieldsFragment,
} from '../../../../../../__generated__/graphql';
import { InputRightIcon } from '../../../input';
import { ModalWrapperProps } from '../../../modals/edit-modal-wrapper';
import { CenoteUpdateButton } from './cenote-update-button';

export type CenoteFormProps = Omit<ModalWrapperProps, 'modalState'> & {
  cenote: UpdateCenoteFieldsFragment;
  isOpen: boolean;
  onClose: () => void;
};

// TODO finish template and implement other forms
export const CenoteForm: FC<CenoteFormProps> = ({
  cenote,
  isOpen,
  onClose,
}) => {
  const [modalState, setModalState] = useState(cenote);
  const [issues, setIssues] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [alternativeNames, setAlternativeNames] = useState('');
  const [helperText, setHelperText] = useState({
    alternativeNames: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    const newCenoteObj = {
      ...modalState,
      [targetName]: targetValue,
    };

    if (!newCenoteObj) return;

    setModalState(newCenoteObj);
  };

  const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const targetName = event.target.name;
    const targetValue = event.target.value as CenoteIssue;

    if (targetName === 'issues') {
      if (modalState.issues?.includes(targetValue)) {
        return;
      }

      console.log({ modalState });

      if (!modalState.issues) {
        setIssues(targetValue);
        const newIssuesObj = {
          ...modalState,
          issues: [targetValue],
        };
        setModalState(newIssuesObj);
        return;
      }

      const issues = [targetValue, ...modalState.issues];
      setIssues(targetValue);
      const newIssuesObj = {
        ...modalState,
        issues,
      };

      if (!newIssuesObj) return;

      setModalState(newIssuesObj);
      return;
    }
    const newCenoteObj = {
      ...modalState,
      [targetName]: targetValue,
    };

    setModalState(newCenoteObj);
  };

  const handleOnClickAlternativeNames = () => {
    console.log({ modalState });

    if (!modalState.alternativeNames) {
      const newCenoteObj = {
        ...modalState,
        alternativeNames: [alternativeNames],
      };
      setModalState(newCenoteObj);
      setAlternativeNames('');
      setHelperText({
        alternativeNames: '',
      });
      return;
    }

    const newAlternativeNamesArr = [
      alternativeNames,
      ...modalState.alternativeNames,
    ];
    const newCenoteObj = {
      ...modalState,
      alternativeNames: newAlternativeNamesArr,
    };

    setModalState(newCenoteObj);
    setAlternativeNames('');
    setHelperText({
      alternativeNames: '',
    });
  };

  const handleOnDeleteAlternativeName = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const alternativeNamesArr = modalState.alternativeNames ?? [];
    const target = event.target as HTMLButtonElement;

    const newAlternativeArr = alternativeNamesArr.filter(
      (name) => name !== target.name
    );
    const newCenoteObj = {
      ...modalState,
      alternativeNames: newAlternativeArr,
    };
    setModalState(newCenoteObj);
  };

  const handleEditAlternativeNames = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentValue: string
  ) => {
    const targetValue = event.target.value;
    const elementIndex =
      modalState.alternativeNames?.indexOf(currentValue) ?? -1;
    if (elementIndex === -1) return;

    const newAlternativeNamesArr = modalState.alternativeNames ?? [];
    newAlternativeNamesArr[elementIndex] = targetValue;
    const newCenoteObj = {
      ...modalState,
      alternativeNames: newAlternativeNamesArr,
    };
    setModalState(newCenoteObj);
    setAlternativeNames('');
    setHelperText({
      alternativeNames: 'Valores actualizados correctamente',
    });
  };

  const handleCenoteIssue = (label: string) => {
    const newIssues = modalState.issues?.filter((element) => element !== label);
    const newCenoteObj = {
      ...modalState,
      issues: newIssues,
    };
    setModalState(newCenoteObj);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isAdd ? 'Agregar' : 'Editar'} cenote {}
        </ModalHeader>
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
                  setModalState({
                    ...modalState,
                    touristic: event.target.checked,
                  })
                }
              />
            </Flex>
          </FormControl>

          {/* <FormControl mb={4}>
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
              </Flex>
            </Flex>
          </FormControl> */}

          <FormControl mb={4}>
            <FormLabel>Problemas</FormLabel>
            <VStack alignItems='self-start'>
              <HStack wrap='wrap' gap={2}>
                {modalState.issues &&
                  modalState.issues?.length > 0 &&
                  modalState.issues.map((issue, index) => (
                    <CenoteTag
                      key={`${issue}-${index}`}
                      iconSide='right'
                      label={issue ?? ''}
                      tagIcon={CloseIcon}
                      tagSize='md'
                      colorScheme='red'
                      onHandleIconClick={handleCenoteIssue}
                    />
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
              </Select>
            </VStack>
          </FormControl>

          <FormControl>
            <FormLabel>Nombres Alternativos</FormLabel>
            <Flex gap={2} direction='column'>
              {modalState.alternativeNames?.map((name, index) => (
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
          <CenoteUpdateButton cenoteToUpdate={modalState} onClose={onClose} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
