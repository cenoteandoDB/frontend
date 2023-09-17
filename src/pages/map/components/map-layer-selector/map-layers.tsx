import { gql } from '../../../../__generated__';
import { useQuery } from '@apollo/client';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { MapContext } from '../../context/map-context';

const GET_LAYERS_JSON = gql(/* GraphQL */ `
  query LayersJson {
    layers {
      name
      json
    }
  }
`);

export const MapLayers = () => {
  const { data } = useQuery(GET_LAYERS_JSON);
  const { setLayer } = React.useContext(MapContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentLayer, setCurrentLayer] = React.useState<string>('');
  const btnRef = React.useRef(null);
  const layers = data?.layers;

  React.useEffect(() => {
    if (data) {
      setLayer(currentLayer);
    }
  }, [currentLayer]);

  return (
    <>
      <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
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
