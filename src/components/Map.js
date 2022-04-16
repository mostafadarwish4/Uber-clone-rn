import MapView, { Marker, Polyline } from "react-native-maps";
import React, { useEffect, useRef } from "react";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInfo,
} from "../app/slices/navigationSlice";
import { useDispatch, useSelector } from "react-redux";
import { getDistanceFromLatLonInKm } from "../data/calculation";
import MapViewDirections from "react-native-maps-directions";
import tw from "twrnc";
const Map = () => {
  const GOOGLE_MAPS_API_KEY ='google api key'
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  console.log(destination,origin,'map')
  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    // const getTravelTime = async () => {
    //   const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`;
    //   const response = await fetch(url);
    //   const data = await response.json();
    //   console.log('data map',data)
    //   dispatch(setTravelTimeInfo(data.rows[0].elements[0]));
    // };
    const {location:{lng,lat}}=origin
    const {location}=destination
    const getTravelTime=()=>{
     const data= getDistanceFromLatLonInKm(lat,location.lat,lng,location.lng);
     dispatch(setTravelTimeInfo(data))
    }
    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_API_KEY]);

  return (
    <MapView
      ref={mapRef}
      initialRegion={{
        latitude: origin?.location?.lat || 37.78825,
        longitude: origin?.location?.lng || -122.4324,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      mapType="mutedStandard"
      style={tw`flex-1`}
    >
{/*       
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="blue"
          lineDashPattern={[0]}
        />
      )} */}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
          
        />
      )}
      {
        destination?.location&&origin?.location&&(
          <Polyline 
          strokeColor={'#000'}
          fillColor="rgba(255,0,0,0.5)"
          strokeWidth={3}
          lineDashPattern={[1]}
          coordinates={[destination.location,origin.location].map(x=>({longitude:x.lng,latitude:x.lat}))}/>
        )
      }
    </MapView>
  );
};

export default Map;
