import { useQuery } from '@apollo/client';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react';
import React, { MutableRefObject } from 'react';
import { gql } from '../../../../__generated__';
import { MapContext } from '../../context/map-context';

const GET_LAYERS_JSON = gql(/* GraphQL */ `
  query LayersJson {
    layers {
      name
      json
    }
  }
`);

interface MapLayersProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: MutableRefObject<null>;
}

export const MapLayers: React.FC<MapLayersProps> = ({
  isOpen,
  onClose,
  buttonRef,
}) => {
  const { data } = useQuery(GET_LAYERS_JSON);
  const { setLayer } = React.useContext(MapContext);

  const [currentLayer, setCurrentLayer] = React.useState<string>('');

  const layers = data?.layers;

  React.useEffect(() => {
    if (data) {
      setLayer(currentLayer);
    }
  }, [currentLayer]);

  console.log(layers);

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
            <RadioGroup onChange={setCurrentLayer} value={currentLayer}>
              <Stack direction='column'>
                {layers?.map((layer, index) => {
                  return (
                    <Radio key={`${index}`} value={layer?.json ?? ''}>
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
