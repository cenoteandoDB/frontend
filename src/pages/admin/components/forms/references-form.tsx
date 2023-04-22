import React, { FC } from 'react';
import { FormControl, FormLabel, Input, Textarea, Select } from '@chakra-ui/react';

import ReferenceModel from '../../../../models/ReferencesTypes';
import { EditModalProps } from '../modals/edit-modal-wrapper';

enum TypeValues {
  JOURNAL,
  REPORT,
  BOOK,
  BOOK_CHAPTER,
  THESIS,
  OTHER,
  WEBPAGE
}

export type ReferenceModalProps = Omit<EditModalProps, 'inputs'> & { inputs: ReferenceModel }

export const ReferencesEditModal: FC<ReferenceModalProps> = (props) => {
  const { inputs, setInputs } = props;

  if (!inputs || !setInputs) {
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
    } as ReferenceModel;

    setInputs(new ReferenceModel(newVariablesObj));
  };
  return (
    <>
      <FormControl mb={4}>
        <FormLabel>Authors</FormLabel>
        <Input
          name='authors'
          value={inputs.authors}
          onChange={(event) => handleInputChange(event)} />
      </FormControl><FormControl mb={4}>
        <FormLabel>Short Name</FormLabel>
        <Textarea
          name='shortName'
          value={inputs.shortName}
          placeholder='Escribe un nombre corto aqui'
          size='sm'
          onChange={(event) => handleInputChange(event)} />
      </FormControl><FormControl mb={4}>
        <FormLabel>Reference</FormLabel>
        <Textarea
          name='reference'
          value={inputs.reference}
          placeholder='Referencias'
          size='sm'
          onChange={(event) => handleInputChange(event)} />
      </FormControl><FormControl mb={4}>
        <FormLabel>Type</FormLabel>
        <Select
          name='type'
          value={inputs.type}
          onChange={(event) => handleInputChange(event)}
        >
          {(Object.keys(TypeValues).filter(x => isNaN(parseInt(x))) as (keyof typeof TypeValues)[]).map(
            (key, index) => (
              <option key={`${key}-${index}`} value={key}>
                {key}
              </option>
            )
          )}
        </Select>
      </FormControl><FormControl mb={4}>
        <FormLabel>Year</FormLabel>
        <Input
          name='year'
          placeholder='Año de publicacion'
          value={inputs.year}
          onChange={(event) => handleInputChange(event)} />
      </FormControl>
    </>
  );
};
