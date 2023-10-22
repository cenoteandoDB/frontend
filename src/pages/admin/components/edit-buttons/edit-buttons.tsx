import React from 'react';

import { EditIcon } from '@chakra-ui/icons';
import { Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { CenotesTableQueryQuery } from '../../../../__generated__/graphql';
import { EditModalWrapper } from '../modals/edit-modal-wrapper';
import { TableTypes } from '../table/types';
import {
  CenoteFormWrapper,
  CenoteFormWrapperProps,
} from '../forms/cenotes/cenote-form-wrapper';

export interface EditContentProps {
  inputs?: TableTypes | CenotesTableQueryQuery['cenotes'][0];
}

const FORM_DICTIONARY: Record<string, React.FC<CenoteFormWrapperProps>> = {
  Cenote: CenoteFormWrapper,
};

export const EditContent: React.FC<EditContentProps> = (props) => {
  const { inputs } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  //TODO improve this code once all tables are using graphql
  if (inputs && inputs.__typename === 'Cenote') {
    const CenoteandoFormWrapper = FORM_DICTIONARY[inputs.__typename];
    return (
      <>
        <Flex gap={2} justifyContent='center'>
          <IconButton aria-label='' onClick={onOpen} size='sm' variant='ghost'>
            <EditIcon />
          </IconButton>
        </Flex>
        {isOpen && (
          <CenoteandoFormWrapper
            isOpen={isOpen}
            cenoteId={inputs.id}
            onClose={onClose}
          />
        )}
      </>
    );
  }

  return (
    <>
      {/* <Flex gap={2} justifyContent='center'>
        <IconButton aria-label='' onClick={onOpen} size='sm' variant='ghost'>
          <EditIcon />
        </IconButton>
      </Flex>
      {isOpen && (
        <EditModalWrapper isOpen={isOpen} inputs={inputs} onClose={onClose} />
      )} */}
    </>
  );
};
