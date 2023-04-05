import React from 'react';
import { Point } from 'geojson';
import maplibreGl, {
  GeoJSONSource,
  LngLatLike,
  Map as MapLibre,
} from 'maplibre-gl';
import { CenoteModel } from '../../../../models/CenotesTypes';
import {
  clusterLayers,
  symbolLayer,
  unclusterLayer,
} from '../utilities';
import './map.css';
import { Flex } from '@chakra-ui/react';

interface MapComponentI {
  lng?: number;
  lat?: number;
  zoom?: number;
  cenotes: CenoteModel[] | null;
}

export const MapComponent: React.FC<MapComponentI> = (props) => {
  const { cenotes } = props;

  const mapContainer = React.useRef(null);
  const map = React.useRef<MapLibre | null>(null);
  const [API_KEY] = React.useState('2ovqIDOtsFG069J69Ap2');
  const geoJson = cenotes?.map((cenote) => cenote.getGeoJson());

  //TODO investigate how we can use a custom react component instead of mapGl popup
  const popup = React.useMemo(() => {
    return new maplibreGl.Popup({
      closeButton: true,
      closeOnClick: true,
    });
  }, []);

  const setClusters = () => {
    if (geoJson && geoJson.length > 0) {
      const sourceData = map.current?.getSource('cenotes');
      if (!sourceData) {
        map.current?.addSource('cenotes', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: geoJson,
          },
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

        map.current?.addLayer(clusterLayers);

        map.current?.addLayer(symbolLayer);

        map.current?.addLayer(unclusterLayer);
      }
    }
  };

  React.useEffect(() => {
    if (map.current) {
      map.current.on('load', () => {
        setClusters();
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
          console.log(e.features[0]);
        }
      });

      map.current.on('mouseenter', 'clusters', (e) => {
        if (map.current) {
          map.current.getCanvas().style.cursor = 'pointer';

          if (!e.features?.[0].properties?.['cluster']) {
            const coordinates = (
              e.features?.[0].geometry as Point
            )?.coordinates?.slice();
            const description = cenotes?.filter(
              (cenote) => e.features?.[0].id?.toString() === cenote.id
            );

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            if (map !== null) {
              popup
                .setLngLat({ lat: coordinates[1], lng: coordinates[0] })
                .setHTML(description?.[0].name ? description?.[0].name : '')
                .addTo(map.current);
            }
          }
        }
      });

      map.current.on('mouseleave', 'clusters', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = '';
          popup.remove();
        }
      });

      map.current.on('data', () => {
        setClusters();
      });
      return; //stops map from intializing more than once
    }
    // Instantiation of the map
    map.current = new maplibreGl.Map({
      container: mapContainer.current ?? '',
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [-88.79325, 20.882081],
      zoom: 7,
    });
    const nav = new maplibreGl.NavigationControl({});
    map.current.addControl(nav, 'bottom-right');
  }, [API_KEY, cenotes, geoJson, popup]);

  return (
    <Flex direction='column' className='map-wrap'>
      <div ref={mapContainer} className='map' />
    </Flex>
  );
};
