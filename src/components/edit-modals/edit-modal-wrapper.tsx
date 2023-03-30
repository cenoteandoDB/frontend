import React, { FC } from 'react';

import { CenoteModel } from '../../models/CenotesTypes';
import ReferenceModel from '../../models/ReferencesTypes';
import { VariableModel } from '../../models/VariablesTypes';
import { CenotesEditModal, CenotesEditModalProps } from './cenotes-edit-modal';

const editModalDictionary = {
  cenotes: CenotesEditModal,
};

interface EditModalProps {
  isOpen: boolean;
  inputs: CenoteModel;
  id: string;
  route: string;
  onClose: () => void;
}

export const EditModalWrapper: React.FC<EditModalProps> = (props) => {
  const { id, isOpen, inputs, onClose, route } = props;

  const EditModalComponent: FC<CenotesEditModalProps> =
    editModalDictionary[route as keyof typeof editModalDictionary];

  return (
    <EditModalComponent
      isOpen={isOpen}
      inputs={inputs}
      route={route}
      onClose={onClose}
    />
  );
};
