import { FC } from 'react';
import {
  CenotesForm,
  VariablesForm,
  ReferencesForm,
  CenotesFormProps,
  ReferenceModalProps,
  VariableFormProps,
} from '../forms';
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
