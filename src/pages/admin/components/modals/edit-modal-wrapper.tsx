import React, { FC, useContext, useEffect, useState } from 'react';

import { AdminTablesContext } from '../../context/admin-context';
import { TableTypes } from '../table/types';

import { useApi } from '../../../../hooks/useApi';
import { classMap } from '../../../../adapters/api-data/api-data-adapter';
import { ModalWrapper } from './modal-wrapper';
import { FormTypes, FormsDictionary } from './types';
import { CenoteModel } from '../../../../models/CenotesTypes';
import ReferenceModel from '../../../../models/ReferencesTypes';
import { VariableModel } from '../../../../models/VariablesTypes';
import { CenotesTableQueryQuery } from '../../../../__generated__/graphql';

export interface ModalWrapperProps {
  isOpen?: boolean;
  inputs?: TableTypes | CenotesTableQueryQuery['cenotes'][0];
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

  if (route === 'cenotes') {
    return null;
  }

  const FormComponent: FormTypes =
    FormsDictionary[route as keyof typeof FormsDictionary];

  if (!FormComponent) {
    return null;
  }

  if (!isOpen || !onClose) {
    return null;
  }

  useEffect(() => {
    if (data && status === 200) {
      const dataType = classMap[route as keyof typeof classMap];
      const newArr = (tableData as TableTypes[])
        .filter((data) => data.id !== modalState.id)
        .map((cenote) =>
          dataType(cenote as CenoteModel & VariableModel & ReferenceModel)
        );
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
