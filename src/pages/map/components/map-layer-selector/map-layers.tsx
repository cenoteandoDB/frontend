import React, { MutableRefObject } from 'react';

import { useQuery } from '@apollo/client';
import {
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
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
  isOpen: boolean;
  onClose: () => void;
  buttonRef: MutableRefObject<null>;
  layerIds: string[] | null;
  setSelectedLayerIds: React.Dispatch<React.SetStateAction<string[] | null>>;
}

export const MapLayers: React.FC<MapLayersProps> = ({
  isOpen,
  onClose,
  buttonRef,
  layerIds,
  setSelectedLayerIds,
}) => {
  const { data, loading, error } = useQuery(GET_LAYERS_JSON);
  const layers = data?.layers;

  const handleCheckBoxClick = (event: string[]) => {
    setSelectedLayerIds([...event]);
    console.log('layer set ', event);
  };

  if (loading) {
    <LoadingSpinner />;
  }

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={buttonRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Layers</DrawerHeader>

          <DrawerBody>
            <CheckboxGroup
              onChange={(e: string[]) => handleCheckBoxClick(e)}
              defaultValue={layerIds ?? []}
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
