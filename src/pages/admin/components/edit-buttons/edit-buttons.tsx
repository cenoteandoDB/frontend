import React from 'react';

import { EditIcon } from '@chakra-ui/icons';
import { Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { CenotesTableQueryQuery } from '../../../../__generated__/graphql';
import { EditModalWrapper } from '../modals/edit-modal-wrapper';
import { TableTypes } from '../table/types';
// import {
//   CenoteFormWrapper,
//   CenoteFormWrapperProps,
// } from '../forms/cenotes/cenote-update/cenote-form-wrapper';
import { Link } from 'react-router-dom';

export interface EditContentProps {
  inputs?: TableTypes | CenotesTableQueryQuery['cenotes'][0];
  url?: string;
}

// const FORM_DICTIONARY: Record<string, React.FC<CenoteFormWrapperProps>> = {
//   Cenote: CenoteFormWrapper,
// };

export const EditContent: React.FC<EditContentProps> = (props) => {
  const { inputs, url } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  //TODO improve this code once all tables are using graphql
  if (inputs && inputs.__typename === 'Cenote') {
    // const CenoteandoFormWrapper = FORM_DICTIONARY[inputs.__typename];
    return (
      <>
        {url && (
          <Flex gap={2} justifyContent='center'>
            <Link to={url} target='_blank'>
              <IconButton
                aria-label=''
                onClick={onOpen}
                size='sm'
                variant='ghost'
              >
                <EditIcon />
              </IconButton>
            </Link>
          </Flex>
        )}
      </>
    );
  }

  return (
    <>
      <Flex gap={2} justifyContent='center'>
        <IconButton aria-label='' onClick={onOpen} size='sm' variant='ghost'>
          <EditIcon />
        </IconButton>
      </Flex>
      {isOpen && (
        <EditModalWrapper isOpen={isOpen} inputs={inputs} onClose={onClose} />
      )}
    </>
  );
};
