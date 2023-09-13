import React from 'react';

import { Card } from '@chakra-ui/react';

interface CardProps {
  children: React.ReactNode;
}

export const CenotesCard: React.FC<CardProps> = ({ children }) => {
  return (
    <Card p='8' bg='white' variant='outline' mb={10}>
      {children}
    </Card>
  );
};
