import {
  CircleLayerSpecification,
  FillLayerSpecification,
  SymbolLayerSpecification,
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

export const clusterLayer: FillLayerSpecification = {
  id: 'layer-prueba',
  type: 'fill',
  source: 'layer1',
  paint: {
    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
    // with three steps to implement three types of circles:
    //   * Blue, 20px circles when point count is less than 100
    //   * Yellow, 30px circles when point count is between 100 and 750
    //   * Pink, 40px circles when point count is greater than or equal to 750

    'fill-color': 'red',
    'fill-opacity': 0.5,
  },
};
