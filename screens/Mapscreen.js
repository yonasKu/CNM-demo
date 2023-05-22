import React, {useRef, useState, useEffect} from 'react';
import MapboxGL, {Camera, PointAnnotation, MarkerView} from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';
import {
  Button,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {MAP_BOX_ACCESS_TOKEN} from '../utils/constants/constants';
import BottomNavigation from '../components/BottomNavigation';
import {Icon} from '@rneui/themed';
MapboxGL.setAccessToken(MAP_BOX_ACCESS_TOKEN);

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
  const pointAnnotation = useRef(null);

  const [isSateliteStyle, setSateliteStyle] = useState(false);
  const defaultCamera = {
    centerCoordinate: [39.29067144628581, 8.562990740516645],
    zoomLevel: 15,
  };
  const [zoomLevel, setZoomLevel] = useState(defaultCamera.zoomLevel);
  const [location, setLocation] = useState(false);

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
            mapViewRef.current.setCamera({
              centerCoordinate: [
                position.coords.longitude,
                position.coords.latitude,
              ],
              zoom: 15,
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
  console.log();
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
    <SafeAreaProvider>
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
            <MapboxGL.UserLocation />
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
          {/* .............,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*/}
          <View style={{position: 'absolute', bottom: '1%'}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal>
              <View style={styles.tabContainer}>
                <View style={styles.tabViews}>
                  <View style={[styles.tabIcon, {backgroundColor: 'orange'}]}>
                    <Icon
                      name="restaurant"
                      type="material"
                      color="white"
                      size={13}
                    />
                  </View>
                  <Text style={styles.containertext}>Where to eat</Text>
                </View>
                <View style={styles.tabViews}>
                  <View style={[styles.tabIcon, {backgroundColor: 'purple'}]}>
                    <Icon
                      name="bunk-bed"
                      type="material-community"
                      color="white"
                      size={13}
                    />
                  </View>
                  <Text style={styles.containertext}> Dormitories</Text>
                </View>
                <View style={styles.tabViews}>
                  <View style={[styles.tabIcon, {backgroundColor: 'gray'}]}>
                    <Icon
                      name="wifi-marker"
                      type="material-community"
                      color="white"
                      size={13}
                    />
                  </View>
                  <Text style={styles.containertext}>Wifi</Text>
                </View>
                <View style={styles.tabViews}>
                  <View
                    style={[styles.tabIcon, {backgroundColor: 'turquoise'}]}>
                    <Icon name="shop" type="entypo" color="white" size={13} />
                  </View>
                  <Text style={styles.containertext}>Shops/groceries</Text>
                </View>
                <View style={styles.tabViews}>
                  <View style={[styles.tabIcon, {backgroundColor: 'navy'}]}>
                    <Icon
                      name="office-building-marker"
                      type="material-community"
                      color="white"
                      size={13}
                    />
                  </View>
                  <Text style={styles.containertext}>
                    Department and schools
                  </Text>
                </View>
                <View style={styles.tabViews}>
                  <View style={[styles.tabIcon, {backgroundColor: 'maroon'}]}>
                    <Icon
                      name="bookshelf"
                      type="material-community"
                      color="white"
                      size={13}
                    />
                  </View>
                  <Text style={styles.containertext}>Libraries</Text>
                </View>
              </View>
            </ScrollView>
          </View>
          {/* .............,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*/}
        </View>
      </View>
    </SafeAreaProvider>
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
  ///////////////////////////////////////////////////////////////////////// ////////////////
  tabContainer: {
    width: '100%',
    height: 50,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabViews: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 6,
    marginRight: 6,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containertext: {
    color: 'black',
    fontWeight: 700,
    fontFamily: 'Futura',
    fontSize: 12,
  },
  tabIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderRadius: 50,
    backgroundColor: 'silver',
    padding: 3,
  },
  /////////////////////////////////////////////////////////////////////////////////////
});
