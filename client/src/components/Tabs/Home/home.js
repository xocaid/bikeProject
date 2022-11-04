import "./home.css";
import React, { useCallback, useState } from 'react';

import { GoogleMap, useJsApiLoader, MarkerF, BicyclingLayer } from '@react-google-maps/api';

//Map Containter Size
const containerStyle = {
  width: '100%',
  height: '550px'
};

//Default Location for Map: Los Angeles, CA
const center = {
  lat: 34.052235,
  lng: -118.243683
};

const Home = () => {
  const [map, setMap] = useState(/* @type google.maps.Map */(null));

  const { isLoaded } = useJsApiLoader({
    // id: 'google-map-script',
    googleMapsApiKey: '',
  })

  //Bicycling Layer
  const onLoad = bicyclingLayer => {
    console.log('bicyclingLayer: ', bicyclingLayer)
  }

  const onUnmount = useCallback((map) => {
    setMap(null)
  }, []);

  //CATCH
  if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="home-component">
        <h1>This is the Home page.</h1>
        <div className="map-container">
          <div className='home-map'>


            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
              onUnmount={onUnmount}

            >
              <BicyclingLayer
                onLoad={onLoad} />

              <MarkerF
                position={center}
              />
            </GoogleMap>

            <button className="map-button">Like</button>
          </div>
        </div>
      </div>
    )
  }
};
export default Home;