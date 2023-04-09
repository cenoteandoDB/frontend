import React from 'react';
import { Center, Flex, Spinner } from '@chakra-ui/react';

export const LoadingSpinner = () => (
  <Flex width={'100vw'} height={'100vh'} alignContent={'center'} justifyContent={'center'}>
    <Center>
      <Spinner size='xl' />
    </Center>
  </Flex>
);