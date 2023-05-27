import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../../../../components/loading-spinner';
import { useApi } from '../../../../hooks/useApi';

export const CenoteDescription: React.FC = () => {
  const { id } = useParams();
  const { data, loading, error, fetch } = useApi(`api/cenotes/${id}`, 'get');

  useEffect(() => {
    fetch();
  }, [id]);

  if (error) {
    return null;
  }

  if (loading || !data) {
    return <LoadingSpinner />;
  }

  console.log(data, loading, error);
  const {
    name,
    social: { rating },
  } = data;

  return (
    <Box p='6'>
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
    </Box>
  );
};
