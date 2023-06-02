import React, {useCallback, useMemo, useRef, useState, useEffect} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MapboxGL, {
  Camera,
  PointAnnotation,
  MarkerVieW,
  Images,
} from '@rnmapbox/maps';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import RouteInput from '../components/RouteInput';
import BottomSheet from '@gorhom/bottom-sheet';
import {images, navicon} from '../components/Images';
import * as turf from '@turf/turf';
import {MAP_BOX_ACCESS_TOKEN} from '../utils/constants/constants';
import {useRoute} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import {Icon} from '@rneui/themed';
import BottomNavigation from '../components/BottomNavigation';
import MarkersCard from '../components/MarkersCard';
import {getCurrentLocation, locationPermission} from '../utils/helperFunction';

const IS_ANDROID = Platform.OS === 'android';

MapboxGL.setAccessToken(MAP_BOX_ACCESS_TOKEN);

const RouteScreen = () => {
  const mapViewRef = useRef(null);
  const cameraRef = useRef(null);

  const pointAnnotation = useRef(null);

  const [isSateliteStyle, setSateliteStyle] = useState(false);
  const defaultCamera = {
    zoomLevel: 15,
  };
  const [zoomLevel, setZoomLevel] = useState(defaultCamera.zoomLevel);
  const userTrackingMode =
    MapboxGL.UserTrackingModes.FollowWithCourseAndHeading;
  //const [route, setRoute] = useState(null);

  const bottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [snapPoints] = useState(['50%', '75%', '35%']);
  const [isAndroidPermissionGranted, setIsAndroidPermissionGranted] =
    useState(false);
  const [isFetchingAndroidPermission, setIsFetchingAndroidPermission] =
    useState(IS_ANDROID);
  const [coordinates] = useState([[39.29067144628581, 8.562990740516645]]);

  const [location, setLocation] = useState([
    39.29067144628581, 8.562990740516645,
  ]);
  const [userSelectedUserTrackingMode] = useState(
    MapboxGL.UserTrackingModes.Follow,
  );
  const [centerCoordinate, setCenterCoordinate] = useState([
    39.290794776187056, 8.562069822199803,
  ]);

  const handleSheetChanges = useCallback(index => {
    console.log(index);
  }, []);

  const handleSnapPress = useCallback(index => {
    setIsOpen(true);
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  ////////////////////////////////////////////////////////////
  useMemo(async () => {
    if (IS_ANDROID && isFetchingAndroidPermission) {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions();
      setIsAndroidPermissionGranted(isGranted);
      setIsFetchingAndroidPermission(false);
    }
  }, [isFetchingAndroidPermission]);
  ///////////////////////////////////////////////////////////////////////

  const Route = useRoute();
  useEffect(() => {
    if (Route && Route.params && Route.params.route) {
      const route = Route.params.route;
      //console.log(route);
      setrouteGeoJSON(route);
    }
  }, []);

  const [Userdestination, setUserdestination] = useState(null);
  /////////////////////////////////////////////////////

  const [UserLocation, setUserLocation] = useState(null);
  useEffect(() => {
    getLiveLocation();
  }, []);

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      console.log('get live location after 4 second', heading);
      setUserLocation([longitude, latitude]);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getLiveLocation();
      setTimeout(getLiveLocation, 8000);
    }, 8000);

    return () => clearTimeout(timeout);
  }, []);

  console.log('UserLocation:', UserLocation);
  ///////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (UserLocation) {
      setCenterCoordinate(UserLocation);
    }
  }, [UserLocation]);
  ///////////////////////////
  const [centerpinCoordinate, setCenterpinCoordinate] = useState([
    39.290794776187056, 8.562069822199803,
  ]);

  ///////////////////////////////////////////////////////////////////////
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

  ////////////////////////////////////////////////////////////////////////////

  // Use the useSelector hook to get the current state of Origin and Destination

  const [Destination, setDestination] = useState(null);

  const [currentPinCoordinate, setcurrentPinCoordinate] = useState([
    39.290794776187056, 8.562069822199803,
  ]);
  const [routeGeoJSON, setrouteGeoJSON] = useState(null);
  const [centerOfLineString, setcenterOfLineString] = useState();

  const onDragEnd = async payload => {
    const centerCoordinate = payload?.geometry?.coordinates;
    setcurrentPinCoordinate(centerCoordinate);
    console.log(centerCoordinate);

    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${UserLocation[0]},${UserLocation[1]};${centerCoordinate[0]},${centerCoordinate[1]}?` +
          new URLSearchParams({
            geometries: 'geojson',
            access_token:
              'pk.eyJ1IjoieW9uYXMxMyIsImEiOiJjbGZzZzZqd2YwNXRvM2VxcmdyMTc4MWg4In0.svu9-rLT7GOuHkrLA5Aejw',
          }),
      );
      const data = await response.json();
      const lineStringGeoJSON = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: data?.routes[0]?.geometry,
          },
        ],
      };
      setrouteGeoJSON(lineStringGeoJSON);

      const allCoordinates =
        lineStringGeoJSON?.features[0]?.geometry?.coordinates;
      const featuresCenter = turf.points(allCoordinates);
      const center = turf.center(featuresCenter);
      setcenterOfLineString(center?.geometry?.coordinates);
    } catch (error) {
      console.error(error);
    }
  };

  // When `onSelectPoiFunc` is called with a selected POI, update the route based on the current pin and the selected POI
  const onSelectPoi = async () => {
    const coord = Destination;
    if (coord == null) {
      console.log('Destination not set');
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${UserLocation[0]},${UserLocation[1]};${coord[0]},${coord[1]}?` +
          new URLSearchParams({
            geometries: 'geojson',
            access_token:
              'pk.eyJ1IjoieW9uYXMxMyIsImEiOiJjbGZzZzZqd2YwNXRvM2VxcmdyMTc4MWg4In0.svu9-rLT7GOuHkrLA5Aejw',
          }),
      );
      const data = await response.json();
      const lineStringGeoJSON = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: data?.routes[0]?.geometry,
          },
        ],
      };
      //console.log(lineStringGeoJSON);
      setrouteGeoJSON(lineStringGeoJSON);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Set centerCoordinate to UserLocation if it's defined, otherwise set it to default coordinate
    if (UserLocation) {
      setCenterCoordinate(UserLocation);
    } else {
      setCenterpinCoordinate([39.290794776187056, 8.562069822199803]);
    }
  }, [UserLocation]);
  ///////////////////////////////
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.mapbox}
          styleURL={
            !isSateliteStyle
              ? MapboxGL.StyleURL.Street
              : MapboxGL.StyleURL.Satellite
          }
          centerCoordinate={centerpinCoordinate}
          showUserLocation={true}
          //onUserLocationUpdate={handleUserLocationUpdate}
          userTrackingMode={userTrackingMode}
          attributionEnabled={false}
          rotateEnabled={false}>
          <MapboxGL.UserLocation visible={true} animated={true} />
          <PointAnnotation
            key={1}
            id={'1'}
            title="StartingPoint"
            coordinate={currentPinCoordinate}
            draggable
            onDragEnd={onDragEnd}
            ref={pointAnnotation}>
            <View style={styles.annotationContainer}>
              <Image
                source={images.icons[1]}
                style={styles.imgStyle}
                resizeMode="cover"
                onLoad={() => pointAnnotation.current?.refresh()}
              />
            </View>
          </PointAnnotation>
          <MapboxGL.Camera
            ref={cameraRef}
            zoomLevel={zoomLevel}
            animationMode={'flyTo'}
            animationDuration={1100}
            defaultSettings={defaultCamera}
            maxZoomLevel={22}
            minZoomLevel={10}
            centerCoordinate={currentPinCoordinate}
            //followUserMode={'normal'}
            //followUserLocation
          />
          {routeGeoJSON && (
            <MapboxGL.ShapeSource id="routeSource" shape={routeGeoJSON}>
              <MapboxGL.LineLayer
                id="routeFill"
                style={{lineColor: 'purple', lineWidth: 4}}
              />
            </MapboxGL.ShapeSource>
          )}
        </MapboxGL.MapView>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => handleSnapPress(0)}>
          <Image source={navicon} style={styles.floatingButton} />
        </TouchableOpacity>
        <View style={styles.touchableZoom}>
          <TouchableOpacity onPress={increaseZoom}>
            <Entypo name="plus" color="black" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={decreaseZoom}>
            <Entypo name="minus" color="black" size={20} />
          </TouchableOpacity>
        </View>
        {/*<BottomNavigation />                                    */}
        <TouchableOpacity style={styles.layerIcon} onPress={changeStyle}>
          <Entypo name="layers" size={24} color="white" />
        </TouchableOpacity>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          onStateChange={handleSheetChanges}
          index={-1}
          enablePanDownToClose={true}
          onClose={() => setIsOpen(false)}
          style={styles.bottomSheet}>
          {isOpen && (
            <View style={styles.contentContainer}>
              <Text>Point on Map or Enter the place you want to go 🔍</Text>
              <RouteInput
                placeholderText="user location"
                iconType="map-pin"
                autoCorrect={true}
              />
              <RouteInput
                placeholderText="where to [39.287132492278175, 8.565264636212788]"
                iconType="flag-checkered"
                autoCorrect={true}
                labelValue={Userdestination}
                onChangeText={inputText => setUserdestination(inputText)}
              />

              <Text>Destination:{Destination}</Text>
              <Text>Destination:{Userdestination}</Text>

              <Button
                title="Fetch route"
                onPress={() => {
                  setDestination([39.287132492278175, 8.565264636212788]);
                  onSelectPoi();
                }}
              />
            </View>
          )}
        </BottomSheet>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapbox: {
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
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
    transform: [{scale: 0.6}],
  },
  touchable: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: '10%',
    backgroundColor: 'white',
    borderRadius: 25,
    //padding: 10,
  },
  floatingButton: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
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
  imgStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    //backgroundColor:"purple",
  },
  contentContainer: {
    flex: 1,
  },
});

export default RouteScreen;
