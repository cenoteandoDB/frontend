import { useDisclosure } from '@chakra-ui/react';
import React from 'react';

import { CenoteModel } from '../../models/CenotesTypes';
import {
  MapLayers,
  MapLayerSelector,
} from '../../pages/map/components/map-layer-selector';
import { MapContext } from '../../pages/map/context/map-context';
import { layers } from '../../utils';
import { MapComponent } from './map-component';

interface MapComponentWrapperI {
  data: CenoteModel[];
}

//TODO refactor component to make the query calls here, based on the selection in MapLayers
export const MapComponentWrapper: React.FC<MapComponentWrapperI> = (props) => {
  const { data } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const [cenoteLayers, setCenotesLayers] = React.useState('');
  const [layerId, setLayer] = React.useState<string | null>('');

  const onSelectedOptionCallback = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCenotesLayers(e.target.value);
  };

  console.log(`Current layer id ${layerId}`);

  return (
    <>
      <MapContext.Provider
        value={{
          layer: '',
          setLayer: setLayer,
        }}
      >
        <MapLayerSelector
          options={layers}
          selector={onSelectedOptionCallback}
        />
        <MapLayers
          isOpen={isOpen}
          onClose={onClose}
          buttonRef={btnRef}
          layer={layerId}
          setLayer={setLayer}
        />
        <MapComponent
          cenotes={data}
          mapLayer={cenoteLayers}
          layerId={layerId}
          onOpen={onOpen}
          buttonRef={btnRef}
        />
      </MapContext.Provider>
    </>
  );
};
