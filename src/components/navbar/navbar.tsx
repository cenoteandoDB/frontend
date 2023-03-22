import React from 'react';

import logo from '../../../public/logo.png';

import {
  Flex,
  Spacer,
  ButtonGroup,
  Button,
  Box,
  Image,
  Text,
  Heading,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <Flex
      minWidth='max-content'
      alignItems='center'
      gap='2'
      justifyContent='space-around'
      bg='Highlight'
      mb='20px'
    >
      <Link to='/'>
        <Flex
          p='2'
          flexDirection='row'
          alignSelf='center'
          alignItems='center'
          ml='10px'
        >
          <Image
            boxSize='50px'
            objectFit='cover'
            alt='Cenoteando-logo'
            src={logo}
          />
          <Heading size='sm' ml='12px'>
            Cenoteando
          </Heading>
        </Flex>
      </Link>
      <Flex gap='2' alignItems='center'>
        <Link to='admin'>Admin</Link>
        <Link to='map'>Map</Link>
      </Flex>
    </Flex>
  );
};
