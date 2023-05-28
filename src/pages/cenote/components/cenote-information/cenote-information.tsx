import React from 'react';

import { Box, Heading } from '@chakra-ui/react';
import { MapComponent } from '../../../../components/map-component/map-component';
import { CenoteModel } from '../../../../models/CenotesTypes';

interface CenoteInformationProps {
  cenote: CenoteModel[];
}

export const CenoteInformation: React.FC<CenoteInformationProps> = (props) => {
  const { cenote } = props;
  return (
    <Box p='8'>
      <Box display='flex' flexDirection='column' gap='6px'>
        <Heading as='h4'>Ubicación</Heading>
        <Box maxH='sm'>
          <MapComponent cenotes={cenote} />
        </Box>
      </Box>
    </Box>
  );
};
