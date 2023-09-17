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

export const MapComponentWrapper: React.FC<MapComponentWrapperI> = (props) => {
  const { data } = props;
  const [cenoteLayers, setCenotesLayers] = React.useState('');
  const [layer, setLayer] = React.useState<string | null>('');

  const onSelectedOptionCallback = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCenotesLayers(e.target.value);
  };

  return (
    <>
      <MapContext.Provider value={{
        layer: '',
        setLayer: setLayer
      }}>
        <MapLayerSelector
          options={layers}
          selector={onSelectedOptionCallback}
        />
        <MapLayers />
        <MapComponent cenotes={data} mapLayer={cenoteLayers} layer={layer} />
      </MapContext.Provider>
    </>
  );
};
