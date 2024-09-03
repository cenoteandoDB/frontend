
import React, { useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { CoordinatesPropsInterface } from '../../Types/UtilsTypes';
import { ClipLoader } from 'react-spinners';

const MapSelector: React.FC<CoordinatesPropsInterface> = ({ lat, lng, cenote }) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const center = {
    lat: parseFloat(lat as unknown as string),
    lng: parseFloat(lng as unknown as string)
  };

  const handleMarkerClick = () => {
    setShowInfoWindow(true);
  };

  const handleInfoWindowCloseClick = () => {
    setShowInfoWindow(false);
  };
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <>
    { lat && lng && googleMapsApiKey? (
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '400px'
          }}
          center={center}
          zoom={10}
        >
        <Marker position={center} onClick={handleMarkerClick} />
        {showInfoWindow && (
          <InfoWindow position={center} onCloseClick={handleInfoWindowCloseClick}>
            <div>
              <h2>{cenote}</h2>
            </div>
          </InfoWindow>
        )}
        </GoogleMap>
      </LoadScript>
    ): ( 
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
        <ClipLoader loading={true} size={50} />
      </div>)}
    </>
  );
};

export default MapSelector;
