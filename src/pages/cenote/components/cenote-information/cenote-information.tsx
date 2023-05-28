import React from 'react';

import { Box, Heading } from '@chakra-ui/react';

interface CenoteInformationProps { 
  municipality: string;

}

export const CenoteInformation: React.FC<CenoteInformationProps> = (props) => {
  return (
    <Box p='8'>
      <Box display='flex' flexDirection='column' gap='6px'>
        <Heading as='h4'>Ubicación</Heading>
        <Heading>Area del mapa</Heading>
      </Box>
    </Box>
  );
};
