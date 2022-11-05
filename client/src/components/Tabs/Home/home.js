import "./home.css";
import React, { useCallback, useRef, useState } from 'react';

import { GoogleMap, useJsApiLoader, MarkerF, BicyclingLayer, Autocomplete, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

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

  const [map, setMap] = useState( /** @type google.maps.Map */(null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [originPlace, setOriginPlace] = useState(null)
  const [destinationPlace, setDestinationPlace] = useState(null)
  // const [distance, setDistance] = useState('');
  // const [duration, setDuration] = useState('');

  const originAutocompleteRef = useRef(null)
  const destinationAutocompleteRef = useRef(null)

  function directionsCallback(response) {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirectionsResponse(response)
      } else {
        setDirectionsResponse(null)
      }
    }
  }

  const { isLoaded } = useJsApiLoader({
    // id: 'google-map-script',
    googleMapsApiKey: '',
    libraries: ['places'],
  })

  //Bicycling Layer
  const onLoadBicycle = bicyclingLayer => {
    console.log('bicyclingLayer: ', bicyclingLayer)
  }

  const calculateDistance = (e) => {
    e.preventDefault()
    setOriginPlace(originAutocompleteRef.current?.getPlace()?.geometry?.location)
    setDestinationPlace(destinationAutocompleteRef.current?.getPlace()?.geometry?.location)
  }

  // const onUnmount = useCallback((map) => {
  //   setMap(null)
  // }, []);

  //CATCH
  if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="home">
        <h1>This is the Home page.</h1>
        <div className="map-container">

          <div className="search-bar-map">

            <form>
              <Autocomplete
                onLoad={(autocomplete) => { originAutocompleteRef.current = autocomplete }}
              >
                <input
                  className='autocomplete-input'
                  placeholder='Start Location'
                  type='text'
                />
              </Autocomplete>

              <Autocomplete
                onLoad={(autocomplete) => { destinationAutocompleteRef.current = autocomplete }}
              >
                <input
                  className='autocomplete-input'
                  placeholder='End Location'
                  type='text'
                />
              </Autocomplete>

              <button className="map-distance-btn" type='submit' onClick={calculateDistance}>Calculate Route</button>
              <button onClick={() => map.panTo(center)}>Return to Original Marker</button>
              <button >Clear</button>
            </form>

          </div>

          <div className='home-map'>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
              options={{
                backgroundColor: '#ffc400',
                streetViewControl: false,
                fullscreenControl: false,
                mapTypeControl: false,
                mapTypeId: 'terrain'
              }}
              onLoad={map => setMap(map)}
            // onUnmount={onUnmount}
            >
              {
                (originPlace !== null && destinationPlace !== null)
                && (<DirectionsService
                  options={{
                    destination: destinationPlace,
                    origin: originPlace,
                    travelMode: 'BICYCLING'
                  }}
                  callback={directionsCallback}
                >
                </DirectionsService>)
              }

              {
                (directionsResponse !== null && (
                  <DirectionsRenderer
                    options={{
                      directions: directionsResponse
                    }}
                  />
                ))
              }

              <BicyclingLayer
                onLoad={onLoadBicycle}
              />
              <MarkerF
                position={center}
              />
              {/* {directionsResponse && (<DirectionsRenderer 
              direction={directionsResponse}/>)} */}
            </GoogleMap>
            <button className="map-button">Like</button>
          </div>

        </div>
      </div>
    )
  }
};
export default Home;