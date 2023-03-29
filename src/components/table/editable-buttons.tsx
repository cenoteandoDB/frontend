import React, { useState } from 'react';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { Method } from 'axios';
import { useLocation } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { EditModal } from './edit-modal';

interface EditContentProps {
  id: string;
  route: string;
  inputs: any;
}

export const EditContent: React.FC<EditContentProps> = (props) => {
  const { id, route, inputs } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  //TODO make a hook to extract the route isteand of passing as a prop
  const location = useLocation();
  const [httpMethod, setHttpMethod] = useState<Method>('get');

  const { data, loading, error, fetch } = useApi(
    `api/${route}/${id}`,
    httpMethod,
    {},
    { size: 1 }
  );

  return (
    <>
      <Flex gap={2}>
        <IconButton aria-label='' onClick={onOpen}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label=''>
          <DeleteIcon />
        </IconButton>
      </Flex>
      <EditModal
        isOpen={isOpen}
        inputs={inputs}
        onClose={onClose}
        fetch={fetch}
      />
    </>
  );
};
