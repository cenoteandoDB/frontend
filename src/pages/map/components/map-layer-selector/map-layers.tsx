import { useLazyQuery, useQuery } from '@apollo/client';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import React, { MutableRefObject } from 'react';
import { LoadingSpinner } from '../../../../components/loading-spinner';
import { gql } from '../../../../__generated__';
import { MapContext } from '../../context/map-context';

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
  layer: string | null;
  setLayer: React.Dispatch<React.SetStateAction<string | null>>;
}

export const MapLayers: React.FC<MapLayersProps> = ({
  isOpen,
  onClose,
  buttonRef,
  layer,
  setLayer,
}) => {
  const { data, loading, error } = useQuery(GET_LAYERS_JSON);
  const layers = data?.layers;

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
            <RadioGroup onChange={setLayer} value={layer ?? undefined}>
              <Stack direction='column'>
                {layers?.map((layer, index) => {
                  return (
                    <Radio key={`${index}`} value={layer?.id ?? ''}>
                      {layer?.name}
                    </Radio>
                  );
                })}
              </Stack>
            </RadioGroup>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
