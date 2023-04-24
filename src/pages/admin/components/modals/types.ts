import { FC } from 'react';
import { CenotesFormProps, CenotesForm } from '../forms/cenotes-form';
import { ReferenceModalProps, ReferencesForm } from '../forms/references-form';
import { VariableFormProps, VariablesForm } from '../forms/variables-form';
import { ModalWrapperProps } from './edit-modal-wrapper';

export type FormTypes =
  | FC<ModalWrapperProps>
  | FC<ReferenceModalProps>
  | FC<CenotesFormProps>
  | FC<VariableFormProps>;

export const FormsDictionary = {
  cenotes: CenotesForm,
  variables: VariablesForm,
  references: ReferencesForm,
};