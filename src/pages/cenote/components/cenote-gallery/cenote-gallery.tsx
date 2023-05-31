import React, { useState } from 'react';

import {
  AspectRatio,
  Box,
  Flex,
  IconButton,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import image1 from '../../../../../public/Kankirixché011.jpeg';
import image2 from '../../../../../public/Kankirixché012.jpeg';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

export const CenoteGallery: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const imageArr = [image1, image2, image1, image2];
  const imagSize = imageArr.length;

  const prevSlide = () => {
    setCurrentImage((s) => (s === 0 ? imagSize - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentImage((s) => (s === imagSize - 1 ? 0 : s + 1));
  };
  return (
    <>
      <Box
        display='flex'
        w='full'
        overflow='hidden'
        pos='relative'
        alignItems='center'
      >
        <Flex
          h='400px'
          w='full'
          transition='all 0.5s'
          ml={`-${currentImage * 100}%`}
        >
          {imageArr.map((img, index) => (
            <Box key={index} boxSize='full' flex='none' cursor='pointer' onClick={onOpen}>
              <Text
                color='white'
                fontSize='xs'
                p='8px 12px'
                pos='absolute'
                top='0'
              >
                {index + 1} / {imagSize}
              </Text>
              <Image src={img} boxSize='full' backgroundSize='cover' />
            </Box>
          ))}
        </Flex>
        <IconButton
          aria-label=''
          size='lg'
          onClick={prevSlide}
          pos='absolute'
          w='auto'
          transition='0.6s ease'
          left={0}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          aria-label=''
          size='lg'
          onClick={nextSlide}
          pos='absolute'
          w='auto'
          transition='0.6s ease'
          right={0}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay>
            <ModalContent p='5px' maxW='90%'>
              <Image src={imageArr[currentImage]} />
            </ModalContent>
          </ModalOverlay>
        </Modal>
      )}
    </>
  );
};
