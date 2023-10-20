import React from 'react';
import { Stack, Image } from '@chakra-ui/react';


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
    </Stack>
  );
};
