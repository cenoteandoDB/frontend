import React, { useEffect, useState } from 'react';

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
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useApi } from '../../../../hooks/useApi';
import { useParams } from 'react-router-dom';

export const CenoteGallery: React.FC = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, loading, fetch } = useApi(
    `api/cenotes/${id}/photos`,
    'get'
  );
  const imagSize = data?.length || 0;

  const prevSlide = () => {
    setCurrentImage((s) => (s === 0 ? imagSize - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentImage((s) => (s === imagSize - 1 ? 0 : s + 1));
  };

  useEffect(() => {
    fetch();
  }, []);

  if (loading || !data || !data.length) {
    return null;
  }

  return (
    <>
      <Box
        display='flex'
        w='85%'
        overflow='hidden'
        pos='relative'
        alignItems='center'
        alignSelf='center'
      >
        <Flex
          h='400px'
          w='full'
          transition='all 0.5s'
          ml={`-${currentImage * 100}%`}
        >
          {data?.map((img: string | undefined, index: number) => (
            <Box
              key={index}
              boxSize='full'
              flex='none'
              cursor='pointer'
              onClick={onOpen}
            >
              <Text
                color='white'
                fontSize='xs'
                p='8px 12px'
                pos='absolute'
                top='0'
              >
                {index + 1} / {imagSize}
              </Text>
              <Image src={img} boxSize='full' backgroundSize='fit' loading='lazy' />
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
              <Image src={data[currentImage]} />
            </ModalContent>
          </ModalOverlay>
        </Modal>
      )}
    </>
  );
};
