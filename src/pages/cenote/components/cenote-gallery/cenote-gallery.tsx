import React from 'react';

import { AspectRatio, Box, IconButton, Image } from '@chakra-ui/react';
import image1 from '../../../../../public/Kankirixché011.jpeg';
import image2 from '../../../../../public/Kankirixché012.jpeg';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

export const CenoteGallery: React.FC = () => {
  const imageArr = [image1, image2, image1, image2];
  return (
    <Box display='flex' gap='15px' alignItems='center' overflow='hidden'>
      <IconButton aria-label='' size='lg'>
        <ChevronLeftIcon />
      </IconButton>
      <Box display='flex' minW='md' gap='15px'>
        {imageArr.map((img, index) => (
          <AspectRatio key={`${img}-${index}`} ratio={4 / 3} minWidth='md' overflow='hidden'>
            <Image src={img} objectFit='cover' />
          </AspectRatio>
        ))}
      </Box>
      <IconButton aria-label='' size='lg'>
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};
