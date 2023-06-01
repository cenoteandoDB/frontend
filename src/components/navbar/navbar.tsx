import React, { useContext } from 'react';

import logo from '../../assets/logo/cenoteando-logo-white.png';

import { Flex, Image, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../context/login';

export const NavBar = () => {
  const { userData, setUserData } = useContext(LoginContext);

  const handleLogout = () => {
    window.localStorage.clear();
    setUserData(null);
  };

  return (
    <Flex
      minWidth='max-content'
      alignItems='center'
      gap='2'
      justifyContent='space-around'
      bg='light.principal'
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
          <Heading color='light.text' size='sm' ml='12px'>
            Cenoteando
          </Heading>
        </Flex>
      </Link>
      <Flex gap='2' alignItems='center'>
        <Link to='admin'>
          <Text color='light.text'>Admin</Text>
        </Link>
        <Link to='map'>
          <Text color='light.text'>Map</Text>
        </Link>
        {userData?.isLoggedIn ? (
          <Link to='/login' onClick={handleLogout}>
            <Text color='light.text'>Cerrar Sesión</Text>
          </Link>
        ) : null}
      </Flex>
    </Flex>
  );
};
