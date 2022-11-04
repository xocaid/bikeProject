import React, { useState} from 'react';

import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

//Map Containter Size
const containerStyle = {
  width: '500px',
  height: '500px'
};

//Default Location for Map: Los Angeles, CA
const center = {
  lat: 34.052235,
  lng: -118.243683
};

const Home = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: '',
  });

// if(!isLoaded) return <div>Loading...</div>

  const [map, setMap] = useState(/* @type google.maps.Map */null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
    <div className="home-component">
      <div className='home-map'>
        <h1>This is the Home page.</h1>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
        <MarkerF 
        position={center}
        />
        </GoogleMap>
      </div>
      <button>Like</button>
    </div>
  )
};
export default Home;