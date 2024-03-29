import React from 'react';

import { Point } from 'geojson';
import maplibreGl, {
  GeoJSONSource,
  LngLatLike,
  Map as MapLibre
} from 'maplibre-gl';
import { createRoot } from 'react-dom/client';
import {
  clusterLayers, symbolLayer,
  unclusterLayer
} from '../../utils';
import { CenotesGeoJsonQuery } from '../../__generated__/graphql';
import { Popup } from '../popup';
import { MapLayersFetch } from './map-layers-fetch';
import './map.css';

interface MapComponentI {
  cenotes: CenotesGeoJsonQuery['cenotes'];
  selectedLayerIds: string[] | null;
}

//TODO clean code and refactor

export const MapComponent: React.FC<MapComponentI> = (props) => {
  const { cenotes, selectedLayerIds } = props;
  const [selectedLayerIdsCopy, setSelectedLayerIdsCopy] = React.useState<
    string[] | null
  >(null);

  const mapContainer = React.useRef(null);
  const map = React.useRef<MapLibre | null>(null);
  const [API_KEY] = React.useState('2ovqIDOtsFG069J69Ap2');
  const isSingleCenote = cenotes?.length === 1;
  const geoJson = cenotes?.map((cenote) => ({
    id: cenote.id,
    geometry: cenote.location.geojson.geometry,
    properties: cenote.location.geojson.properties,
    type: cenote.location.geojson.type,
  }));
  const defaultCenter = [-88.79325, 20.882081];
  const centerPoint = isSingleCenote
    ? geoJson?.[0].geometry.coordinates
    : defaultCenter;
  const popup = React.useMemo(() => {
    return new maplibreGl.Popup({
      closeButton: true,
      closeOnClick: true,
    });
  }, []);

  const renderPopup = (
    cenoteData: CenotesGeoJsonQuery['cenotes'],
    coordinates: number[]
  ) => {
    if (map !== null && map.current) {
      const popupNode = document.createElement('div');
      const mapRoot = createRoot(popupNode);
      mapRoot.render(<Popup data={cenoteData} />);
      popup
        .setLngLat({ lat: coordinates[1], lng: coordinates[0] })
        .setDOMContent(popupNode)
        .addTo(map.current);
    }
  };

  const removeLayers = () => {
    if (selectedLayerIdsCopy && selectedLayerIdsCopy?.length > 0) {
      const layersToRemove = selectedLayerIdsCopy?.filter(
        (x) => !selectedLayerIds?.includes(x)
      );

      if (layersToRemove && layersToRemove.length > 0) {
        layersToRemove?.forEach((x) => {
          map.current?.removeLayer(x);
        });
        setSelectedLayerIdsCopy(selectedLayerIds);
      }
    }
  };

  //TODO refactor code to include layers dinamically
  const setClusters = () => {
    if (geoJson !== null) {
      const sourceData = map.current?.getSource('cenotes');
      if (!sourceData) {
        map.current?.addSource('cenotes', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: geoJson,
          },
          cluster: !isSingleCenote,
          clusterMaxZoom: 14,
          clusterRadius: !isSingleCenote ? 0 : 50,
        });

        map.current?.addLayer(clusterLayers);

        map.current?.addLayer(symbolLayer);

        map.current?.addLayer(unclusterLayer);
      }
    }
  };

  React.useEffect(() => {
    if (map.current) {
      setSelectedLayerIdsCopy(selectedLayerIds);
      map.current.on('load', () => {
        // setClusters();
        if (isSingleCenote && map.current) {
          renderPopup(cenotes, geoJson?.[0].geometry.coordinates);
        }
      });

      map.current.on('click', 'clusters', (e) => {
        const features = map.current?.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
        })[0];
        if (features !== undefined) {
          const clusterId = features.properties['cluster_id'];

          if (!clusterId) return;

          (
            map.current?.getSource('cenotes') as GeoJSONSource
          ).getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            if (map.current) {
              map.current.easeTo({
                center: (features.geometry as Point).coordinates as LngLatLike,
                zoom: zoom ? zoom : undefined,
              });
            }
          });
        }
      });

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      map.current.on('click', 'unclustered-point', (e) => {
        if (e.features !== undefined) {
          const coordinates = (
            e.features[0].geometry as Point
          ).coordinates.slice();
          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
        }
      });

      map.current.on('mouseenter', 'clusters', (e) => {
        if (map.current) {
          map.current.getCanvas().style.cursor = 'pointer';
          if (!e.features?.[0].properties?.['cluster']) {
            const coordinates = (
              e.features?.[0].geometry as Point
            )?.coordinates?.slice();
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            if (map !== null) {
              const cenoteData = cenotes?.filter(
                (cenote) => e.features?.[0].id?.toString() === cenote.id
              );
              renderPopup(cenoteData, coordinates);
            }
          }
        }
      });

      map.current.on('mouseleave', 'clusters', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = '';
          //popup.remove();
        }
      });

      map.current.on('data', () => {
        setClusters();
      });

      removeLayers();
      return; //stops map from intializing more than once
    }
    // Instantiation of the map
    map.current = new maplibreGl.Map({
      container: mapContainer.current ?? '',
      style: `https://api.maptiler.com/maps/hybrid/style.json?key=${API_KEY}`,
      center: centerPoint as LngLatLike,
      zoom: isSingleCenote ? 8 : 7,
    });
    const nav = new maplibreGl.NavigationControl({});
    map.current.addControl(nav, 'top-left');
  }, [API_KEY, cenotes, geoJson, popup, selectedLayerIds]);

  return (
    <div className={cenotes?.length === 1 ? 'map-chakra-box' : 'map-wrap'}>
      <div ref={mapContainer} className='map'></div>
      {selectedLayerIds &&
        map &&
        selectedLayerIds?.length > 0 &&
        selectedLayerIds?.map((layer, index) => (
          <MapLayersFetch key={`layer-${index}`} layerId={layer} map={map} />
        ))}
    </div>
  );
};
