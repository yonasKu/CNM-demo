import { View, Text } from 'react-native'
import React from 'react'
import { MAP_BOX_ACCESS_TOKEN } from './constants/constants';
import { useSelector, useDispatch } from "react-redux";
import {
    setOrigin,
    setDestination,
    selectOrigin,
    selectDestination,
  } from '../slices/navSlices';


//const [routeGeoJSON, setrouteGeoJSON] = useState();

const fetchRoute = async (origin, destination) => {

    //const origin = useSelector(selectOrigin);
    //const destination = useSelector(selectDestination);

    // Check if origin and destination are not null
    if (!origin || !destination) {
      ///console.log("Origin or destination not set");
      return;
    }
  
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?` +
        new URLSearchParams({
          geometries: "geojson",
          access_token: MAP_BOX_ACCESS_TOKEN,
        })
    );
    let data = await response.json();
    let lineStringGeoJSON = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: data?.routes[0]?.geometry,
        },
      ],     
    };
    return lineStringGeoJSON
  };
  export {fetchRoute};