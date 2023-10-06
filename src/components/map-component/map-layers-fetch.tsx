import React from 'react';

import { useQuery } from '@apollo/client';
import { Map as MapLibre } from 'maplibre-gl';
import { getRandomHexColor } from '../../utils/generate-colors';
import { layersMap } from '../../utils/layers';
import { gql } from '../../__generated__';

interface GeoJsonFeatures {
  type: string;
  properties: {
    Base_Datos: string;
    OBJECTID: number;
    Shape_leng: number;
    Subtipo: string;
    tipo: string;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
}

interface geoJsonType {
  type: string;
  name: string;
  features: GeoJsonFeatures[];
}

const GET_GEOJSON_LAYER = gql(/* GraphQL */ `
  query Layer($layerId: ID!) {
    layer(id: $layerId) {
      json
    }
  }
`);

interface MapLayersFetchProps {
  map: React.MutableRefObject<MapLibre | null>;
  layerId: string;
}

export const MapLayersFetch: React.FC<MapLayersFetchProps> = ({
  map,
  layerId,
}) => {
  let parsedGeoJson: any | undefined = undefined;
  let geoJsonType = '';
  const { data } = useQuery(GET_GEOJSON_LAYER, {
    variables: {
      layerId: layerId,
    },
  });

  const geoJsonFromQuery = data?.layer?.json;

  if (geoJsonFromQuery) {
    parsedGeoJson = JSON.parse(geoJsonFromQuery);
    geoJsonType = parsedGeoJson?.features[0].geometry.type as string;
    console.log({ geoJsonType });
  }

  const sourceData = map.current?.getSource(layerId);
  if (!sourceData) {
    if (parsedGeoJson) {
      map.current?.addSource(layerId, {
        type: 'geojson',
        data: {
          ...parsedGeoJson,
        },
      });
      const layerFunc = layersMap[`${geoJsonType}`];
      map.current?.addLayer(layerFunc(layerId, getRandomHexColor()));
    }
  }

  return null;
};
