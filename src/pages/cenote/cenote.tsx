import React from 'react';

import { Box, SimpleGrid } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../../components/loading-spinner';
import { CenoteDescription } from './components/cenote-description';
import { CenoteGallery } from './components/cenote-gallery';
import { CenoteInformation } from './components/cenote-information';
import { CenoteServices } from './components/cenote-services';
import { gql, useQuery } from '@apollo/client';
import { CenoteInformationByIdQuery } from '../../__generated__/graphql';

const GET_CENOTE_INFORMATION_BY_ID = gql`
  query CenoteInformationById($cenoteByIdId: ID!) {
    cenoteById(id: $cenoteByIdId) {
      alternativeNames
      createdAt
      creator {
        name
        email
        role
      }
      distances {
        time
        location
        distance
      }
      id
      issues
      location {
        state
        municipality
        country
        coordinates {
          latitude
          longitude
        }
      }
      name
      photos
      social {
        comments {
          review
          commenter
          comment
        }
      }
      type
      touristic
      updatedAt
      geojson
    }
  }
`;

export const Cenote: React.FC = () => {
  const { id } = useParams();
  // const { data, loading, error, fetch } = useApi(`api/cenotes/${id}`, 'get');
  const { data, loading, error } = useQuery<CenoteInformationByIdQuery>(GET_CENOTE_INFORMATION_BY_ID, {
    variables: { 
      cenoteByIdId: id
    }
  });

  const cenote = data?.cenoteById;

  if (error || !cenote) {
    return null;
  }

  if (loading || !data) {
    return <LoadingSpinner />;
  }

  return (
    <Box display='flex' flexDirection='column' p='50px' gap='50px'>
      <CenoteGallery />

      <SimpleGrid columns={2} spacing={10} gridTemplateColumns='2fr 1fr'>
        <Box alignItems='start'>
          <CenoteDescription name={cenote.name} />
          <CenoteServices />
        </Box>
        <Box borderRadius='sm'>
          <CenoteInformation cenote={cenote} />
        </Box>
      </SimpleGrid>
    </Box>
  );
};
