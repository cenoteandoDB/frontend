import React, { FC, useContext } from 'react';
import { classMap } from '../../../../adapters/api-data/api-data-adapter';

import { AdminTablesContext } from '../../context/admin-context';
import { TableTypes } from '../table/types';

import { CenotesEditModal } from './cenotes-edit-modal';
import { ReferencesEditModal } from './references-edit-modal';
import { VariablesEditModal } from './variables-edit-modal';

const editModalDictionary = {
  cenotes: CenotesEditModal,
  variables: VariablesEditModal,
  references: ReferencesEditModal
};

export interface EditModalProps {
  isOpen: boolean;
  inputs?: TableTypes;
  method: string;
  onClose: () => void;
}

//TODO check why the insert is not working
//TODO change name to something more generic
//TODO make the modals reutilizable and improve code

export const EditModalWrapper: React.FC<EditModalProps> = (props) => {
  const { route } = useContext(AdminTablesContext);
  const { isOpen, inputs, method, onClose } = props;

  const EditModalComponent: FC<EditModalProps> =
    editModalDictionary[route as keyof typeof editModalDictionary];

  if (!inputs) {
    const clazz = classMap[route as keyof typeof classMap];
    const newInput = clazz();

    return (
      <EditModalComponent
        isOpen={isOpen}
        inputs={newInput as typeof EditModalComponent.prototype}
        method={method}
        onClose={onClose}
      />
    );
  }

  return (
    <EditModalComponent
      isOpen={isOpen}
      inputs={inputs as typeof EditModalComponent.prototype}
      method='put'
      onClose={onClose}
    />
  );
};
