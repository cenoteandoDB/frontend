import React, { FC, useContext, useEffect, useState } from 'react';

import { AdminTablesContext } from '../../context/admin-context';
import { TableTypes } from '../table/types';

import { useApi } from '../../../../hooks/useApi';
import ReferenceModel from '../../../../models/ReferencesTypes';
import { ModalWrapper } from './modal-wrapper';
import { FormTypes, FormsDictionary } from './types';

export interface ModalWrapperProps {
  isOpen?: boolean;
  inputs?: TableTypes;
  setInputs?: React.Dispatch<React.SetStateAction<TableTypes>>;
  onClose?: () => void;
}

export const EditModalWrapper: FC<ModalWrapperProps> = (props) => {
  const { isOpen, inputs, onClose } = props;
  const [modalState, setModalState] = useState<TableTypes>(
    inputs as TableTypes
  );
  const { tableData, setTableData, route } = useContext(AdminTablesContext);
  const { data, status, loading, fetch } = useApi(
    `api/${route}/${inputs?.id}`,
    'put',
    {},
    {}
  );

  const FormComponent: FormTypes =
    FormsDictionary[route as keyof typeof FormsDictionary];

  if (!isOpen || !onClose) {
    return null;
  }

  useEffect(() => {
    if (data && status === 200) {
      const newArr = (tableData as ReferenceModel[])
        .filter((data) => data.id !== modalState.id)
        .map((cenote) => new ReferenceModel(cenote));
      setTableData([modalState, ...newArr]);
      onClose();
    }
  }, [data]);

  return (
    <ModalWrapper
      modalState={modalState}
      loading={loading}
      fetch={fetch}
      isOpen={isOpen}
      onClose={onClose}
    >
      <FormComponent
        inputs={modalState as typeof FormComponent.prototype}
        setInputs={setModalState}
      />
    </ModalWrapper>
  );
};
