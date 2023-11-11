import React from 'react';

import {
  MapLayers
} from '../../pages/map/components/map-layer-selector';
import { CenotesGeoJsonQuery } from '../../__generated__/graphql';
import { MapComponent } from './map-component';

interface MapComponentWrapperI {
  data: CenotesGeoJsonQuery['cenotes'];
}

//TODO refactor component to make the query calls here, based on the selection in MapLayers
export const MapComponentWrapper: React.FC<MapComponentWrapperI> = (props) => {
  const { data } = props;
  const [selectedLayerIds, setSelectedLayerIds] = React.useState<
    string[] | null
  >(null);

  return (
    <>
      <MapLayers
        selectedLayerIds={selectedLayerIds}
        setSelectedLayerIds={setSelectedLayerIds}
      />
      <MapComponent
        cenotes={data}
        selectedLayerIds={selectedLayerIds}
      />
    </>
  );
};
