import React from 'react';

import { Box, Card, Divider, Heading, Icon, Text } from '@chakra-ui/react';
import { MapComponent } from '../../../../components/map-component/map-component';
import { CenoteModel } from '../../../../models/CenotesTypes';
import { MdLocationOn, MdPhone } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import { IconType } from 'react-icons';
import { RiAccountCircleFill } from 'react-icons/ri';

interface CenoteInformationProps {
  cenote: CenoteModel[];
}

const adaptCenoteLocation = (cenote: CenoteModel[]) => {
  const { gadm } = cenote[0];

  return {
    state: gadm?.name_1,
    municipality: gadm?.name_2,
  };
};

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
  const { state, municipality } = adaptCenoteLocation(cenote);

  return (
    <Card p='8' bg='white' variant='outline'>
      <Box display='flex' flexDirection='column' gap='16px'>
        <Heading as='h4'>Ubicación</Heading>
        <Box maxH='sm'>
          <MapComponent cenotes={cenote} />
        </Box>
      </Box>
      <Box display='flex' flexDirection='column' gap='22px' mt='22px'>
        <IconText icon={MdLocationOn} text={`${municipality}, ${state}`} />
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
