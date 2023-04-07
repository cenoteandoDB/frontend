import React from 'react';

import { Flex, Heading, Text } from '@chakra-ui/react';
import { CenoteModel } from '../../../../models/CenotesTypes';

interface PopupI {
  data: CenoteModel[] | undefined;
}

export const Popup: React.FC<PopupI> = (props) => {
  const { data } = props;

  if (!data) {
    return null;
  }

  const cenoteData = data[0];
  return (
    <Flex direction='column' gap={2}>
      <Heading as='h2' fontSize='16px'>
        {cenoteData.name} - {cenoteData.type}
      </Heading>
      {cenoteData.touristic ? <Text fontSize='md'>Turistico</Text> : null}
    </Flex>
  );
};
