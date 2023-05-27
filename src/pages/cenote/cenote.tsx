import React from 'react';

import { Box } from '@chakra-ui/react';
import { CenoteDescription } from './components/cenote-description';

export const Cenote: React.FC = () => {
  return (
    <Box
      maxW='md'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      bg='white'
    >
      <CenoteDescription />
    </Box>
  );
};
