import React, {useRef, useState, useEffect} from 'react';
import MapboxGL from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';
import {
  Button,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoieW9uYXMxMyIsImEiOiJjbGZzZzZqd2YwNXRvM2VxcmdyMTc4MWg4In0.svu9-rLT7GOuHkrLA5Aejw',
);

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const Mapscreen = () => {
  const mapViewRef = useRef(null);
  const cameraRef = useRef(null);
  const [isSateliteStyle, setSateliteStyle] = useState(false);
  const defaultCamera = {
    centerCoordinate: [39.29067144628581, 8.562990740516645],
    zoomLevel: 15,
  };
  const [zoomLevel, setZoomLevel] = useState(defaultCamera.zoomLevel);
  const [location, setLocation] = useState(false);
  const [route, setRoute] = useState(null);

  // function to check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
            mapViewRef.current.getCamera().setCamera({
              centerCoordinate: [
                position.coords.longitude,
                position.coords.latitude,
              ],
              zoom: 13,
            });
          },
          error => {
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  const changeStyle = () => {
    setSateliteStyle(!isSateliteStyle);
  };
  const increaseZoom = () => {
    setZoomLevel(zoomLevel + 1);
  };

  const decreaseZoom = () => {
    setZoomLevel(zoomLevel - 1);
  };

  const handleRegionChange = region => {
    console.log('Region changed: ', region);
  };

  useEffect(() => {
    // Only set camera once
    if (mapViewRef.current && cameraRef.current) {
      mapViewRef.current.setCamera({
        ...defaultCamera,
        zoomLevel: zoomLevel,
      });
    }
  }, [zoomLevel]);

  return (
    <View style={styles.page}>
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Get Location" onPress={getLocation} />
      </View>
      <View style={styles.container}>
        <MapboxGL.MapView
          ref={mapViewRef}
          onRegionChangeComplete={handleRegionChange}
          pitchEnabled={true}
          rotateEnabled={true}
          style={styles.map}
          styleURL={
            !isSateliteStyle
              ? MapboxGL.StyleURL.Satellite
              : MapboxGL.StyleURL.Street
          }
          localizeLabels={true}
          compassEnabled={true}
          zoomEnabled={true}>
          <MapboxGL.Camera
            ref={cameraRef}
            zoomLevel={zoomLevel}
            animationMode={'flyTo'}
            animationDuration={1100}
            //centerCoordinate={centerCoordinate}
            defaultSettings={defaultCamera}
            maxZoomLevel={22}
            minZoomLevel={4}
            centerCoordinate={[39.29, 8.56]}
          />
          {/* The following annotation will be displayed in the specified coordinate */}
          <MapboxGL.PointAnnotation
            id="annotationExample"
            coordinate={[39.2906, 8.5623]}
            title="Title Example"
            snippet="Snippet Example">
            <View style={styles.annotationContainer}>
              <View style={styles.annotationFill} />
            </View>
            <MapboxGL.Callout
              title={'Welcome to Adama Science and Technology University'}
            />
          </MapboxGL.PointAnnotation>
          {route && (
            <MapboxDirections
              origin={[39.29067144628581, 8.562990740516645]}
              destination={route.geometry.coordinates[route.geometry.coordinates.length - 1]}
              apiBaseUrl="https://api.mapbox.com"
              accessToken={MapboxGL.getAccessToken()}
              mode="walking"
              strokeWidth={4}
              strokeColor="red"
              onRouteIndexChange={routeIndex => console.log('routeIndex', routeIndex)}
            />
          )}
        </MapboxGL.MapView>
        <View style={styles.touchableZoom}>
          <TouchableOpacity onPress={increaseZoom}>
            <Entypo name="plus" color="black" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={decreaseZoom}>
            <Entypo name="minus" color="black" size={20} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.layerIcon} onPress={changeStyle}>
          <Entypo name="layers" size={24} color="white" />
        </TouchableOpacity>
        <View style={{position: 'absolute', bottom: 20}}>
          <Button
            title="Get Directions"
            onPress={() => {
              if (location) {
                fetch(
                  `https://api.mapbox.com/directions/v5/mapbox/walking/${location.coords.longitude},${location.coords.latitude};39.2906,8.5623?access_token=${MapboxGL.getAccessToken()}&geometries=geojson`,
                )
                  .then(response => response.json())
                  .then(data => {
                    console.log(data);
                    setRoute(data.routes[0]);
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Mapscreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  map: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'blue',
    transform: [{scale: 0.6}],
  },
  touchableZoom: {
    position: 'absolute',
    width: 35,
    gap: 10,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: '45%',
    backgroundColor: 'white',
    borderBottomEndRadius: 20,
    borderTopStartRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  layerIcon: {
    position: 'absolute',
    left: 10,
    bottom: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
});
