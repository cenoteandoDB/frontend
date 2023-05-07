import React from 'react';
import { Container, Image, Stack } from '@chakra-ui/react';

import unam from '../../assets/logo/unam-white.png';
import ciencias from '../../assets/logo/ciencias-white.png';
import cenoteando from '../../assets/logo/cenoteando-logo-white.png';

interface ImgProps {
  image: string;
}

const Img: React.FC<ImgProps> = (props) => {
  const { image } = props;
  return (
    <Image
      boxSize='75px'
      objectFit='cover'
      alt='Cenoteando-logo'
      src={image}
      alignSelf='center'
    />
  );
};

export const Footer = () => {
  return (
    <Container
      as='footer'
      height='120px'
      width='100%'
      maxW='unset'
      bg='light.principal'
      margin='unset'
    >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        height='100%'
        gap='22px'
        justifyContent='center'
      >
        <Img image={unam} />
        <Img image={ciencias} />
        <Img image={cenoteando} />
      </Stack>
    </Container>
  );
};
