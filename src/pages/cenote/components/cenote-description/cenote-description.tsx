import React from 'react';

import { Box, Card, Heading, Text } from '@chakra-ui/react';
import { CenotesCard } from '../shared/card';

interface CenoteDescriptionProps {
  name: string;
  rating: string;
}

export const CenoteDescription: React.FC<CenoteDescriptionProps> = (props) => {
  const { name, rating } = props;

  return (
    <CenotesCard>
      <Box display='flex' alignItems='baseline' justifyContent='space-between'>
        <Heading as='h2'>{name}</Heading>
        <Box display='flex' flexDirection='column'>
          <Text>Rating {rating} de 5</Text>
        </Box>
      </Box>
      <Box>
        <Text as='b'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>
      </Box>
      <Box mt='6'>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
          harum repudiandae fuga distinctio excepturi quibusdam animi unde,
          temporibus non ea libero nemo minus. Ratione quo quam dolore provident
          culpa voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Consequuntur animi, magni suscipit delectus iure dolores,
          praesentium dignissimos modi nesciunt vitae facilis itaque mollitia
          perspiciatis quisquam! At nulla esse veniam itaque?
        </Text>
      </Box>
    </CenotesCard>
  );
};
