import React from 'react';

import { Box, Card, Divider, Heading, Icon, Text } from '@chakra-ui/react';
import { MapComponent } from '../../../../components/map-component/map-component';
import { CenoteModel } from '../../../../models/CenotesTypes';
import { MdLocationOn, MdPhone } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import { IconType } from 'react-icons';
import { RiAccountCircleFill } from 'react-icons/ri';
import { CenoteInformationByIdQuery } from '../../../../__generated__/graphql';

interface CenoteInformationProps {
  cenote: CenoteInformationByIdQuery['cenoteById'];
}

interface IconTextProps {
  icon: IconType;
  text: string;
}

const IconText: React.FC<IconTextProps> = ({ icon, text }) => (
  <Box display='flex' maxW='sm' gap='15px'>
    <Icon as={icon} />
    <Text>{text}</Text>
  </Box>
);

export const CenoteInformation: React.FC<CenoteInformationProps> = (props) => {
  const { cenote } = props;
  
  if (!cenote) {
    return null;
  }

  const { location: {county, state} } = cenote;

  return (
    <Card p='8' bg='white' variant='outline'>
      <Box display='flex' flexDirection='column' gap='16px'>
        <Heading as='h4'>Ubicación</Heading>
        <Box maxH='sm'>
          {/* <MapComponent cenotes={cenote} selectedLayerIds={[]} /> */}
        </Box>
      </Box>
      <Box display='flex' flexDirection='column' gap='22px' mt='22px'>
        <IconText icon={MdLocationOn} text={`${county}, ${state}`} />
        <Divider />
        <IconText
          icon={MdPhone}
          text={'Este cenote aún no cuenta con número de telefono'}
        />
        <Divider />
        <IconText icon={TbWorld} text={'Este cenote aún no cuenta con sitio web'}/>
        <Divider />
        <IconText icon={RiAccountCircleFill} text={'Este cenote no pertenece a ninguna organización'} />
      </Box>
    </Card>
  );
};
