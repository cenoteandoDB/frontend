import React from 'react';

import { useQuery } from '@apollo/client';
import { SettingsIcon } from '@chakra-ui/icons';
import {
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { LoadingSpinner } from '../../../../components/loading-spinner';
import { gql } from '../../../../__generated__';

const GET_LAYERS_JSON = gql(/* GraphQL */ `
  query LayersJson {
    layers {
      id
      name
    }
  }
`);

interface MapLayersProps {
  selectedLayerIds: string[] | null;
  setSelectedLayerIds: React.Dispatch<React.SetStateAction<string[] | null>>;
}

//TODO investigate memory leak
// why every time i open the drawer it takes more time everytime, also why is the ram too high?
export const MapLayers: React.FC<MapLayersProps> = ({
  selectedLayerIds,
  setSelectedLayerIds,
}) => {
  const { data, loading, error } = useQuery(GET_LAYERS_JSON);
  const layers = data?.layers;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  const handleCheckBoxClick = (event: string[]) => {
    setSelectedLayerIds([...event]);
    console.log('layer set ', event);
  };

  return (
    <>
      <div className='sidebar flex-center right'>
        <IconButton
          aria-label=''
          ref={btnRef}
          colorScheme='teal'
          onClick={onOpen}
          icon={<SettingsIcon />}
        >
          Open
        </IconButton>
      </div>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Capas disponibles</DrawerHeader>

          <DrawerBody>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <CheckboxGroup
                onChange={(e: string[]) => handleCheckBoxClick(e)}
                defaultValue={selectedLayerIds ?? []}
              >
                <Stack direction='column'>
                  {layers?.map((layer, index) => {
                    return (
                      <Checkbox key={`${index}`} value={layer?.id ?? ''}>
                        {layer?.name}
                      </Checkbox>
                    );
                  })}
                </Stack>
              </CheckboxGroup>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
