import React, { useEffect } from 'react';

import { Box } from '@chakra-ui/react';
import { CenoteDescription } from './components/cenote-description';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../../components/loading-spinner';
import { useApi } from '../../hooks/useApi';
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
    <Box display='flex' p='10' gap='22px' justifyContent='space-evenly'>
      <Box
        borderWidth='1px'
        flexGrow={2}
        borderRadius='sm'
        overflow='hidden'
        bg='white'
      >
        <CenoteDescription name={name} rating={rating} />
      </Box>
      <Box borderWidth='1px' borderRadius='sm' flexGrow={1} bg='white'>
        <CenoteInformation municipality={name_2} />
      </Box>
    </Box>
  );
};
