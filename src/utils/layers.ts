import {
  CircleLayerSpecification, LayerSpecification,
  SymbolLayerSpecification
} from 'maplibre-gl';

export const clusterLayers: CircleLayerSpecification = {
  id: 'clusters',
  type: 'circle',
  source: 'cenotes',
  paint: {
    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
    // with three steps to implement three types of circles:
    //   * Blue, 20px circles when point count is less than 100
    //   * Yellow, 30px circles when point count is between 100 and 750
    //   * Pink, 40px circles when point count is greater than or equal to 750
    'circle-color': [
      'step',
      ['get', 'point_count'],
      '#51bbd6',
      100,
      '#f1f075',
      750,
      '#f28cb1',
    ],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
  },
};

export const symbolLayer: SymbolLayerSpecification = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'cenotes',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': ['get', 'point_count_abbreviated'],
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
};

export const unclusterLayer: CircleLayerSpecification = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'cenotes',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#94bf92',
    'circle-radius': 10,
    'circle-stroke-width': 5,
    'circle-stroke-color': '#fff',
  },
};

const pointLayers = (idAndSource: string, color: string) =>
  ({
    id: idAndSource,
    type: 'circle',
    source: idAndSource,
    paint: {
      // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 750
      //   * Pink, 40px circles when point count is greater than or equal to 750
      'circle-color': color,
      'circle-radius': 5,
    },
  } as LayerSpecification);

const lineLayers = (idAndSource: string, color: string) =>
  ({
    id: idAndSource,
    type: 'line',
    source: idAndSource,
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': color,
      'line-width': 2,
    },
  } as LayerSpecification);

const fillLayers = (idAndSource: string, color: string) =>
  ({
    id: idAndSource,
    type: 'fill',
    source: idAndSource,
    layout: {
      visibility: 'visible',
    },
    paint: {
      'fill-color': color,
      'fill-outline-color': '#000000',
      'fill-antialias': false,
    },
  } as LayerSpecification);

export const layersMap: Record<
  string,
  (idAndSource: string, color: string) => LayerSpecification
> = {
  MultiLineString: lineLayers,
  Polygon: fillLayers,
  Point: pointLayers,
  MultiPolygon: fillLayers
};
