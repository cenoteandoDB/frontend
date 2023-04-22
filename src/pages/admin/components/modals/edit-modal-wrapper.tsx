import React, { FC, useContext, useEffect, useState } from 'react';
import { classMap } from '../../../../adapters/api-data/api-data-adapter';

import { AdminTablesContext } from '../../context/admin-context';
import { TableTypes } from '../table/types';

import { CenotesEditModal, CenotesFormProps } from '../forms/cenotes-form';
import {
  ReferenceModalProps,
  ReferencesEditModal,
} from '../forms/references-form';
import { VariableFormProps, VariablesEditModal } from '../forms/variables-form';
import { useApi } from '../../../../hooks/useApi';
import ReferenceModel from '../../../../models/ReferencesTypes';
import { ModalWrapper } from './modal-wrapper';

type FormTypes =
  | FC<EditModalProps>
  | FC<ReferenceModalProps>
  | FC<CenotesFormProps>
  | FC<VariableFormProps>;

const editModalDictionary = {
  cenotes: CenotesEditModal,
  variables: VariablesEditModal,
  references: ReferencesEditModal,
};

export interface EditModalProps {
  isOpen?: boolean;
  inputs?: TableTypes;
  setInputs: React.Dispatch<React.SetStateAction<TableTypes>>;
  onClose?: () => void;
}

//TODO check why the insert is not working
//TODO change name to something more generic
//TODO make the modals reutilizable and improve code

export const EditModalWrapper: React.FC<EditModalProps> = (props) => {
  const { route } = useContext(AdminTablesContext);
  const { isOpen, inputs, onClose } = props;
  const [modalState, setModalState] = useState<TableTypes>(
    inputs as TableTypes
  );
  const { tableData, setTableData } = useContext(AdminTablesContext);
  const { data, status, loading, fetch } = useApi(
    `api/${route}/${inputs?.id}`,
    'put',
    {},
    {}
  );

  const handleOnSaveCenote = () => {
    fetch(modalState);
  };

  const EditModalComponent: FormTypes =
    editModalDictionary[route as keyof typeof editModalDictionary];

  if (!isOpen || !onClose) {
    return null;
  }

  useEffect(() => {
    if (data && status === 200) {
      onClose();
      const newArr = (tableData as ReferenceModel[])
        .filter((data) => data.id !== modalState.id)
        .map((cenote) => new ReferenceModel(cenote));
      setTableData([modalState, ...newArr]);
    }
  }, [data]);

  return (
    <ModalWrapper
      modalState={modalState}
      loading={loading}
      isOpen={isOpen}
      onClose={onClose}
      handleOnSaveCenote={handleOnSaveCenote}
    >
      <EditModalComponent
        isOpen={isOpen}
        inputs={modalState as typeof EditModalComponent.prototype}
        setInputs={setModalState}
        onClose={onClose}
      />
    </ModalWrapper>
  );
};
