import React, { FC, useContext, useEffect, useState } from 'react';
import { classMap } from '../../../../adapters/api-data/api-data-adapter';
import { useApi } from '../../../../hooks/useApi';
import ReferenceModel from '../../../../models/ReferencesTypes';
import { AdminTablesContext } from '../../context/admin-context';
import { TableTypes } from '../table/types';
import { ModalWrapperProps } from './edit-modal-wrapper';
import { ModalWrapper } from './modal-wrapper';
import { FormTypes, FormsDictionary } from './types';

export const AddModalWrapper: FC<ModalWrapperProps> = (props) => {
  const { isOpen, onClose } = props;
  const { tableData, setTableData, route } = useContext(AdminTablesContext);
  const clazz = classMap[route as keyof typeof classMap];
  const newInput = clazz();
  const [modalState, setModalState] = useState<TableTypes>(
    newInput as TableTypes
  );
  const { data, status, loading, fetch } = useApi(
    `api/${route}`,
    'post',
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
    }
  }, [data]);

  return (
    <ModalWrapper
      modalState={modalState}
      loading={loading}
      isOpen={isOpen}
      onClose={onClose}
      fetch={fetch}
      isAdd
    >
      <FormComponent
        inputs={modalState as typeof FormComponent.prototype}
        setInputs={setModalState}
      />
    </ModalWrapper>
  );
};
