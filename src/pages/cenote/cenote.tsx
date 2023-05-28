import React, { useEffect } from 'react';

import { Box, SimpleGrid } from '@chakra-ui/react';
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
    <SimpleGrid p='8' columns={2} spacing={10} >
      <Box
        borderWidth='1px'
        borderRadius='sm'
        bg='white'
      >
        <CenoteDescription name={name} rating={rating} />
      </Box>
      <Box borderWidth='1px' borderRadius='sm' bg='white'>
        <CenoteInformation cenote={[new CenoteModel(data)]}/>
      </Box>
    </SimpleGrid>
  );
};
