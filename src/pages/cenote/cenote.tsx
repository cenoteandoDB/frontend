import React, { useEffect } from 'react';

import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../../components/loading-spinner';
import { useApi } from '../../hooks/useApi';
import { CenoteModel } from '../../models/CenotesTypes';
import { CenoteDescription } from './components/cenote-description';
import { CenoteInformation } from './components/cenote-information';

export const Cenote: React.FC = () => {

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
    gadm: {
      name_2
    }
  } = data;


  return (
    <SimpleGrid p='50px' columns={2} spacing={10} gridTemplateColumns='2fr 1fr' >
      <Box
        alignItems='start'
      >
        <CenoteDescription name={name} rating={rating} />
      </Box>
      <Box borderRadius='sm'>
        <CenoteInformation cenote={[new CenoteModel(data)]}/>
      </Box>
    </SimpleGrid>
  );
};
