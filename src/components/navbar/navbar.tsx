import React, { useContext } from 'react';

import logo from '../../../public/logo.png';

import { Flex, Image, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../context/login';

export const NavBar = () => {
  const { userData, setUserData } = useContext(LoginContext);

  const handleLogout = () => {
    window.sessionStorage.clear();
    setUserData(null);
  };

  return (
    <Flex
      minWidth='max-content'
      alignItems='center'
      gap='2'
      justifyContent='space-around'
      bg='Highlight'
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
        {userData?.isLoggedIn ? (
          <Link to='/login' onClick={handleLogout}>
            Cerrar Sesión
          </Link>
        ) : null}
      </Flex>
    </Flex>
  );
};
