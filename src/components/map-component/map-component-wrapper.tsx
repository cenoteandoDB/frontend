import React from 'react';

import { CenoteModel } from '../../models/CenotesTypes';
import { MapLayerSelector } from '../../pages/map/components/map-layer-selector';
import { layers } from '../../utils';
import { MapComponent } from './map-component';

interface MapComponentWrapperI {
  data: CenoteModel[];
}

export const MapComponentWrapper: React.FC<MapComponentWrapperI> = (props) => {
  const { data } = props;
  const [cenoteLayers, setCenotesLayers] = React.useState('');

  const onSelectedOptionCallback = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCenotesLayers(e.target.value);
  };

  return (
    <>
      <MapLayerSelector options={layers} selector={onSelectedOptionCallback} />
      <MapComponent cenotes={data} mapLayer={cenoteLayers} />
    </>
  );
};
