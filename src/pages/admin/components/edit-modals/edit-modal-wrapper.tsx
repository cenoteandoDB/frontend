import React, { FC, useContext } from 'react';

import { AdminTablesContext } from '../../context/admin-context';
import { TableTypes } from '../table/types';

import { CenotesEditModal, CenotesEditModalProps } from './cenotes-edit-modal';

const editModalDictionary = {
  cenotes: CenotesEditModal,
};

interface EditModalProps {
  isOpen: boolean;
  inputs: TableTypes;
  onClose: () => void;
}

export const EditModalWrapper: React.FC<EditModalProps> = (props) => {
  const { route } = useContext(AdminTablesContext);
  const { isOpen, inputs, onClose } = props;
  
  const EditModalComponent: FC<CenotesEditModalProps> =
    editModalDictionary[route as keyof typeof editModalDictionary];

  return (
    <EditModalComponent
      isOpen={isOpen}
      inputs={inputs as typeof EditModalComponent.prototype}
      onClose={onClose}
    />
  );
};
