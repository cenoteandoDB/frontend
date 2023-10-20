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
  InputGroup,
  InputLeftAddon,
  Select,
  VStack,
} from '@chakra-ui/react';
import { CenoteTag } from '../../../../components/tags';
import { CenoteIssue, CenoteModel } from '../../../../models/CenotesTypes';
import { InputRightIcon } from '../input';
import { ModalWrapperProps } from '../modals/edit-modal-wrapper';

export type CenotesFormProps = Omit<ModalWrapperProps, 'inputs'> & {
  inputs: CenoteModel;
};

// TODO finish template and implement other forms
export const CenotesForm: FC<CenotesFormProps> = (props) => {
  const { inputs, setInputs } = props;
  const [issues, setIssues] = useState('');
  const [alternativeNames, setAlternativeNames] = useState('');
  const [helperText, setHelperText] = useState({
    alternativeNames: '',
  });

  if (!setInputs) {
    return null;
  }

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
        coordinates[1] = inputs.geojson.geometry.coordinates[1];
      }
      if (targetName === 'geojson-latitud') {
        coordinates[0] = inputs.geojson.geometry.coordinates[0];
        coordinates[1] = Number(targetValue);
      }

      const geojson = {
        ...inputs.geojson,
        geometry: {
          type: inputs.geojson.geometry.type,
          coordinates,
        },
      };

      
      
      const newCenotesObj = {
        ...inputs,
        geojson,
      } as CenoteModel;
      setInputs(new CenoteModel(newCenotesObj));
      return;
    }
    console.log({inputs});
    const newCenoteObj = {
      ...inputs,
      [targetName]: targetValue,
    } as CenoteModel;

    setInputs(new CenoteModel(newCenoteObj));
  };

  const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    if (targetName === 'issues') {
      if (inputs.issues.includes(targetValue as CenoteIssue)) {
        return;
      }
      const issues = [targetValue, ...inputs.issues];
      setIssues(targetValue);
      const newIssuesObj = {
        ...inputs,
        issues,
      } as CenoteModel;
      setInputs(new CenoteModel(newIssuesObj));
      return;
    }
    const newCenoteObj = {
      ...inputs,
      [targetName]: targetValue,
    } as CenoteModel;

    setInputs(new CenoteModel(newCenoteObj));
  };

  const handleOnClickAlternativeNames = () => {
    if (!alternativeNames) return;
    const newAlternativeNamesArr = [
      alternativeNames,
      ...inputs.alternativeNames,
    ];
    const newCenoteObj = {
      ...inputs,
      alternativeNames: newAlternativeNamesArr,
    } as CenoteModel;
    setInputs(new CenoteModel(newCenoteObj));
    setAlternativeNames('');
    setHelperText({
      alternativeNames: '',
    });
  };

  const handleOnDeleteAlternativeName = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const alternativeNamesArr = inputs.alternativeNames;
    const target = event.target as HTMLButtonElement;

    const newAlternativeArr = alternativeNamesArr.filter(
      (name) => name !== target.name
    );
    const newCenoteObj = {
      ...inputs,
      alternativeNames: newAlternativeArr,
    } as CenoteModel;
    setInputs(new CenoteModel(newCenoteObj));
  };

  const handleEditAlternativeNames = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentValue: string
  ) => {
    const targetValue = event.target.value;
    const elementIndex = inputs.alternativeNames.indexOf(currentValue);
    if (elementIndex === -1) return;

    const newAlternativeNamesArr = inputs.alternativeNames;
    newAlternativeNamesArr[elementIndex] = targetValue;
    const newCenoteObj = {
      ...inputs,
      alternativeNames: newAlternativeNamesArr,
    } as CenoteModel;
    setInputs(new CenoteModel(newCenoteObj));
    setAlternativeNames('');
    setHelperText({
      alternativeNames: 'Valores actualizados correctamente',
    });
  };

  const handleCenoteIssue = (label: string) => {
    const newIssues = inputs.issues.filter((element) => element !== label);
    const newCenoteObj = {
      ...inputs,
      issues: newIssues,
    } as CenoteModel;
    setInputs(new CenoteModel(newCenoteObj));
  };

  return (
    <>
      <FormControl mb={4}>
        <FormLabel>Nombre</FormLabel>
        <Input
          name='name'
          value={inputs.name}
          onChange={(event) => handleChange(event)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Tipo</FormLabel>
        <Select
          name='type'
          value={inputs.type}
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
            isChecked={inputs.touristic}
            onChange={(event) =>
              setInputs(
                new CenoteModel({
                  ...inputs,
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
                value={inputs.geojson.geometry.coordinates[1]}
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
                value={inputs.geojson.geometry.coordinates[0]}
                onChange={(event) => handleChange(event)}
              />
            </InputGroup>
          </Flex>
        </Flex>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Problemas</FormLabel>
        <VStack alignItems='self-start'>
          <HStack wrap='wrap' gap={2}>
            {inputs.issues.length > 0 &&
              inputs.issues.map((issue, index) => (
                <CenoteTag
                  key={`${issue}-${index}`}
                  iconSide='right'
                  label={issue}
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
            <option value='GEOTAG_NOT_VERIFIED'>Geotag no verificado</option>
            <option value='ANOTHER_PROBLEM'>Otro Problema</option>
            <option value='ANOTHER_PROBLEM_1'>Otro Problema</option>
          </Select>
        </VStack>
      </FormControl>

      <FormControl>
        <FormLabel>Nombres Alternativos</FormLabel>
        <Flex gap={2} direction='column'>
          {inputs.alternativeNames.map((name, index) => (
            <InputRightIcon
              key={`${index}`}
              inputValue={name}
              inputName={name}
              onChangeCallback={(event) =>
                handleEditAlternativeNames(event, name)
              }
              onClickCallback={(event) => handleOnDeleteAlternativeName(event)}
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
    </>
  );
};
