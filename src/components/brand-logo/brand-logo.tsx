import React from 'react';
import { Stack, Heading, Image } from '@chakra-ui/react';


import logo from '../../assets/logo/cenoteando-logo-title-dark.png';

export const BrandLogo = () => {
  return (
    <Stack mr='2rem'>
      <Image
        alignSelf='center'
        boxSize='200px'
        objectFit='contain'
        alt='cenoteando-logo'
        src={logo}
        margin='5px'
      />

      <Heading textAlign='center' as='h2' width='500px' fontWeight='normal'>
        Repositorio institucional de cenotes de la facultad de ciencias de la
        UNAM
      </Heading>
    </Stack>
  );
};
