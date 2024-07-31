import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CoordinatesPropsInterface } from '../../Types/UtilsTypes';

const MapSelector: React.FC<CoordinatesPropsInterface> = ({lat, lng, cenote}) => {
  const [position, setPosition] = useState({ lat: lat, lng: lng, cenote: cenote});

  const handleClick = (e: any) => {
    setPosition({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      cenote: cenote
    });
    console.log(position)
  };

  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={10}
      style={{ height: '70vh', width: '100%' }}
      onClick={handleClick}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy;CenoteandoData'
      />
      <Marker position={[position.lat, position.lng]}>
        <Popup>
            {position.cenote}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapSelector;
