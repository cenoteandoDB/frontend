import React, { FC } from 'react';

import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { VariableModel } from '../../../../models/VariablesTypes';

import { EditModalProps } from '../modals/edit-modal-wrapper';

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

export type VariableFormProps = Omit<EditModalProps, 'inputs'> & { inputs: VariableModel };

export const VariablesEditModal: FC<VariableFormProps> = (props) => {
  const { inputs, setInputs } = props;
  
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
