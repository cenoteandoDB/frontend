import React from 'react';
import { CenoteModel } from '../../../../models/CenotesTypes';
import { MapLayerSelector } from '../map-layer-selector';
import { layers, mapLayers } from '../utilities';
import { MapComponent } from './map-component';

interface MapComponentWrapperI {
  data: CenoteModel[];
}

export const MapComponentWrapper: React.FC<MapComponentWrapperI> = (props) => {
  const { data } = props;
  const [, setCenotesLayers] = React.useState('');

  const onSelectedOptionCallback = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCenotesLayers(e.target.value);
    //map.current?.setStyle(mapLayers(e.target.value));
  };

  return (
    <>
      <MapComponent cenotes={data} />
    </>
  );
};
