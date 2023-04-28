import React, { FC, useState } from 'react';

import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { VariableModel } from '../../../../models/VariablesTypes';

import { ModalWrapperProps } from '../modals/edit-modal-wrapper';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { InputRightIcon } from '../input';
import { CenoteTag } from '../../../../components/tags';

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

export type VariableFormProps = Omit<ModalWrapperProps, 'inputs'> & {
  inputs: VariableModel;
};

export const VariablesForm: FC<VariableFormProps> = (props) => {
  const { inputs, setInputs } = props;
  const [enumValue, setEnumValue] = useState('');

  if (!setInputs) {
    return null;
  }

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    const newVariablesObj = {
      ...inputs,
      [targetName]: targetValue,
    } as VariableModel;

    newVariablesObj.enumValues = ['test'];

    setInputs(new VariableModel(newVariablesObj));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetName = event.target.name;
    const targetValue = event.target.checked;

    const newVariableObj = {
      ...inputs,
      [targetName]: targetValue,
    } as VariableModel;
    setInputs(new VariableModel(newVariableObj));
  };

  const handleEnumChange = () => {
    let newEnumValue = inputs.enumValues;
    if (!newEnumValue) {
      newEnumValue = [];
    }
    const newEnumValues = [enumValue, ...newEnumValue];

    const newVariablesObj = {
      ...inputs,
      enumValues: newEnumValues,
    } as VariableModel;
    setInputs(new VariableModel(newVariablesObj));
    setEnumValue('');
  };

  console.log(inputs.enumValues);

  //TODO change unit to a Select with an enum
  return (
    <>
      <FormControl mb={4}>
        <FormLabel>Nombre</FormLabel>
        <Input
          name='name'
          value={inputs.name}
          onChange={(event) => handleInputChange(event)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          name='description'
          value={inputs.description}
          placeholder='Escribe la descripción de la variable'
          size='sm'
          onChange={(event) => handleInputChange(event)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Theme</FormLabel>
        <Select
          name='theme'
          value={inputs.theme}
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
        <FormLabel>Nivel de accesso</FormLabel>
        <Input
          name='accessLevel'
          value={inputs.accessLevel}
          onChange={(event) => handleInputChange(event)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Tipo de dato</FormLabel>
        <Input
          name='type'
          value={inputs.type}
          onChange={(event) => handleInputChange(event)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Origen</FormLabel>
        <Input
          name='origin'
          value={inputs.origin}
          onChange={(event) => handleInputChange(event)}
        />
      </FormControl>

      <FormControl mb={4}>
        <Flex justifyContent='space-evenly'>
          <Checkbox
            name='timeseries'
            isChecked={inputs.timeseries}
            onChange={(event) => handleCheckboxChange(event)}
          >
            Time series
          </Checkbox>
          <Checkbox
            name='multiple'
            isChecked={inputs.multiple}
            onChange={(event) => handleCheckboxChange(event)}
          >
            Multiple
          </Checkbox>
        </Flex>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Enum Values</FormLabel>
        <VStack alignItems='self-start' mb={2}>
          <HStack wrap='wrap' gap={2}>
            {inputs.enumValues &&
              inputs.enumValues.length > 0 &&
              inputs.enumValues.map((issue, index) => (
                <CenoteTag
                  key={`${issue}-${index}`}
                  iconSide='right'
                  label={issue}
                  tagIcon={CloseIcon}
                  tagSize='md'
                  colorScheme='red'
                  onHandleIconClick={() => undefined}
                />
              ))}
          </HStack>
        </VStack>
        <InputRightIcon
          inputValue={enumValue}
          inputName='enumValues'
          onChangeCallback={(event) => setEnumValue(event.target.value)}
          onClickCallback={handleEnumChange}
          iconComponent={<CheckIcon />}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Unidad</FormLabel>
        <Input
          name='units'
          placeholder='Unidades'
          value={inputs.units ?? ''}
          onChange={(event) => handleInputChange(event)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Metodología</FormLabel>
        <Textarea
          name='methodology'
          value={inputs.methodology ?? ''}
          placeholder='Escribe la metodología'
          size='sm'
          onChange={(event) => handleInputChange(event)}
        />
      </FormControl>
    </>
  );
};
