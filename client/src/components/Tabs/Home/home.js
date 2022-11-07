import "./home.css";
import React, { useRef, useState } from 'react';

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
  //For DirectionsRenderer: Displays the Route 
  const [directionsResponse, setDirectionsResponse] = useState(null);
  //For DirectionsService: Takes Start & End Locations
  const [originPlace, setOriginPlace] = useState(null)
  const [destinationPlace, setDestinationPlace] = useState(null)
  //To Display Bike Route Distance & Duration (Directions API)
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  //Autocomplete (as per documentation) - for the originPlace/destinationPlace
  //Places API
  const originAutocompleteRef = useRef(null)
  const destinationAutocompleteRef = useRef(null)

  //directionsCallback: Required as per DirectionsService documentation
  //Directions API
  //https://maps.googleapis.com/maps/api/directions/json?mode=bicycling&origin=Disneyland&destination=Universal+Studios+Hollywood&key=KEY
  //setDistance & setDuration are getting the data from Directions API and returned in a JSON format
  function directionsCallback(response) {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirectionsResponse(response)
        setDistance(response.routes[0].legs[0].distance.text)
        setDuration(response.routes[0].legs[0].duration.text)
      } else {
        setDirectionsResponse(null)
      }
    }
  }
  //Required to access Maps API and Places API/Library
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: ['places'],
  })

  //Bicycling Layer
  const onLoadBicycle = bicyclingLayer => {
    console.log('bicyclingLayer: ', bicyclingLayer)
  }

  //onClick to Submit Info & Display Route on Map
  //getPlace(): Place interface contains info to locate, identify/describe a place for DirectionsRequest/DistanceMatrixRequest
  //geometry - api library; allows us to access the latlng
  //Place means business, point of interest, or geographic location
  //origin/destinationPlace is taking in the value input in the search bars.
  // ?. - chaining operator, checks if value is null/undefined
  const calculateRoute = (e) => {
    e.preventDefault()
    setOriginPlace(originAutocompleteRef.current?.getPlace()?.geometry?.location)
    setDestinationPlace(destinationAutocompleteRef.current?.getPlace()?.geometry?.location)
  }


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
              {/********************************* BUTTONS *********************************/}
              <button className="search-bar-btn" onClick={calculateRoute} type='submit' >Map My Route</button>
              <button className="search-bar-btn" onClick={() => map.panTo(center)}>Reset</button>
            </form>
            <div className="distance-duration-finaldisplay">
              <h2>Distance: {distance}</h2>
              <h2>Duration: {duration}</h2>
            </div>
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
              onLoad={map => setMap(map)}>

              {/*DIRECTIONS SERVICE: Calculates directions, receives directions request, returns EFFICIENT path, travel time optimized.; NEEDED TO WORK WITH DIRECTIONS RENDERER*/}
              {/*Per documentation. Options & callback are required. originPlace & destinationPlace are needed to identify location for directions request. */}
              {
                (originPlace !== null && destinationPlace !== null)
                && (<DirectionsService
                  options={{
                    destination: destinationPlace,
                    origin: originPlace,
                    travelMode: 'BICYCLING',
                  }}
                  callback={directionsCallback}
                >
                </DirectionsService>)
              }

              {/*DIRECTIONS RENDERER: Renders directions obtained from DirectionsService; NEEDED TO WORK WITH DIRECTIONS SERVICE*/}
              {/*Per documentation. Options required.*/}
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
            </GoogleMap>
            <button className="map-button">Like</button>
          </div>

        </div>
      </div>
    )
  }
};
export default Home;