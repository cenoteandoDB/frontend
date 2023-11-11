import React from 'react';

import { Flex, Heading, Text } from '@chakra-ui/react';
import { CenotesGeoJsonQuery } from '../../__generated__/graphql';
import { adaptCenoteType } from '../../pages/admin/components/table/types';

interface PopupI {
  data: CenotesGeoJsonQuery['cenotes'] | undefined;
}

export const Popup: React.FC<PopupI> = (props) => {
  const { data } = props;

  if (!data) {
    return null;
  }

  const [cenoteData] = data;

  //TODO add link to cenote card
  //TODO Ask to want else to add to this popup card
  return (
    <Flex direction='column' gap={2}>
      <Heading as='h2' fontSize='16px'>
        {cenoteData.name} - {adaptCenoteType[cenoteData.type]}
      </Heading>
      {cenoteData.touristic ? <Text fontSize='md'>Turistico</Text> : null}
      <Text>
        Coordinates {cenoteData.geojson.geometry.coordinates[0]},{' '}
        {cenoteData.geojson.geometry.coordinates[1]}
      </Text>
    </Flex>
  );
};
