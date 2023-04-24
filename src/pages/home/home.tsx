import React from 'react';

import { Center } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export const Home = () => {
  return (
    <Center>
      <Outlet />
    </Center>
  );
};
