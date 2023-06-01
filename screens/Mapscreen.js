import React, {useRef, useState, useEffect, useCallback} from 'react';
import MapboxGL, {
  Camera,
  PointAnnotation,
  MarkerVieW,
  Images,
} from '@rnmapbox/maps';
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
import {DataMarkers} from '../components/data';
import BottomSheet from '@gorhom/bottom-sheet';
import DetailsCard from '../components/DetailsCard';

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
    //pitch: 0,
    //heading: 0,
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
    if (cameraRef.current) {
      cameraRef.current.setCamera({
        ...defaultCamera,
        zoomLevel: zoomLevel,
      });
    }
  }, [zoomLevel]);
  /////////////////////////////////////////////////////////////////////////////////////

  const [Marker, setMarker] = useState(DataMarkers);

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showIcons, setShowIcons] = useState(false);
  //types = ['Where to eat', 'Dormitories', 'Wifi','Libraries']

  const [selectedType, setSelectedType] = useState('null');

  const filteredMarkers = Marker.filter(marker => marker.type === selectedType);

  const featureCollection = {
    type: 'FeatureCollection',
    features: filteredMarkers.map(marker => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: marker.coordinates,
      },
      properties: {
        title: marker.title,
        description: marker.description,
        id: marker.id,
        coordinate: marker.coordinates,
      },
    })),
  };
  
  const symbolLayerStyle = {
    iconAllowOverlap: true,
    //iconAnchor: 'bottom',
    iconSize: 0.75,
    iconImage: 'foo',
    textSize: 12, // adjust the offset of the text to show the callout properly
    textAllowOverlap: true,
  };

  const handlepoints = types => {
    setSelectedType(types), setShowIcons(true);
  };
  const handleMarkerPress = event => {
    const {properties} = event.features[0];
    setSelectedMarker(properties);
  };
  //////////////////////////////////////////////////////////////////////////

  const bottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [snapPoints] = useState(['35%', '50%']);

  const handleSheetChanges = useCallback(index => {
    console.log(index);
  }, []);

  const handleSnapPress = useCallback(index => {
    setIsOpen(true);
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  //,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,  ......

  const [selectedPin, setSelectedPin] = useState(null);

  const handlePinPress = event => {
    const feature = event.features[0];
    setSelectedPin(feature.properties);
    handleSnapPress(1);
  };
  //console.log(selectedPin);
  //,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <SafeAreaProvider>
      <View style={styles.page}>
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
              defaultSettings={defaultCamera}
              maxZoomLevel={22}
              minZoomLevel={4}
            />

            <Images images={{foo: require('../assets/icons/pin.png')}} />
            {showIcons && (
              <MapboxGL.ShapeSource
                id="mapPinsSource"
                shape={featureCollection}
                onPress={handlePinPress}>
                <MapboxGL.SymbolLayer
                  id="mapPinsLayer"
                  style={symbolLayerStyle}></MapboxGL.SymbolLayer>
              </MapboxGL.ShapeSource>
            )}

            {/*
            {filteredMarkers.map(marker => (
              <MapboxGL.PointAnnotation
                key={marker.id}
                id={marker.id}
                coordinate={marker.coordinates}
                onSelected={() => setSelectedMarker(marker)}>
                <MapboxGL.Callout style={styles.calloutContainer}>
                  <View style={{backgroundColor: 'white'}}>
                    <Text style={styles.calloutTitle}>{marker.title}</Text>
                    <Text style={styles.calloutDescription}>
                      {marker.description}
                    </Text>
                    <TouchableOpacity
                      style={styles.calloutButton}
                      >
                      <Text style={styles.calloutButtonText}>Press me</Text>
                    </TouchableOpacity>
                  </View>
                </MapboxGL.Callout>
              </MapboxGL.PointAnnotation>
            ))}

            */}
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
          <BottomNavigation handlepoints={handlepoints} />
          {/* .............,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*/}
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            onStateChange={handleSheetChanges}
            index={-1}
            enablePanDownToClose={true}
            onClose={() => setIsOpen(false)}
            style={styles.bottomSheet}>
            {isOpen && (
              <View>
                <ScrollView

                  style={{
                    backgroundColor: 'gray',
                  }}>
                    <DetailsCard
                    key={selectedPin.id}
                    name={selectedPin.title}
                    description={selectedPin.description}
                    //place={selectedPin.title}
                    coordinate={selectedPin.coordinate}
                    />
                  </ScrollView>
              </View>
            )}
          </BottomSheet>
          
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
    marginTop:15,
    paddingTop:5,
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

  calloutContainer: {
    width: 200,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  calloutDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  calloutButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 8,
  },
  calloutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ContentContainer: {
    flex: 1,
    //alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 15,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  desriptionsContainer: {
    padding: 5,
  },
  nameContainer: {
    padding: 5,
    borderBottomWidth: 0.5,
    //borderTopLeftRadius: 10,
  },
  cardTextContainer: {
    //backgroundColor: '#D9CECA',
    backgroundColor: 'silver',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
