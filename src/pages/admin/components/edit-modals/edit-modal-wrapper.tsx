import React, { FC, useContext } from 'react';

import { AdminTablesContext } from '../../context/admin-context';
import { TableTypes } from '../table/types';

import { CenotesEditModal } from './cenotes-edit-modal';
import { VariablesEditModal } from './variables-edit-modal';

const editModalDictionary = {
  cenotes: CenotesEditModal,
  variables: VariablesEditModal
};

export interface EditModalProps {
  isOpen: boolean;
  inputs: TableTypes;
  onClose: () => void;
}

export const EditModalWrapper: React.FC<EditModalProps> = (props) => {
  const { route } = useContext(AdminTablesContext);
  const { isOpen, inputs, onClose } = props;
  
  const EditModalComponent: FC<EditModalProps> =
    editModalDictionary[route as keyof typeof editModalDictionary];

  return (
    <EditModalComponent
      isOpen={isOpen}
      inputs={inputs as typeof EditModalComponent.prototype}
      onClose={onClose}
    />
  );
};
