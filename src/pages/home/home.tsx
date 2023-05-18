import React from 'react';

import { Center, Flex, Heading } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { BrandLogo } from '../../components/brand-logo';

export const Home = () => {
  return (
    <Center>
      <Outlet />
      <Flex
        width={'100vw'}
        height={'80vh'}
        alignContent={'center'}
        justifyContent={'center'}
      >
        <Center>
          <BrandLogo />
        </Center>
      </Flex>
    </Center>
  );
};
