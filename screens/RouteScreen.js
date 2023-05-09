/*import {StyleSheet,Pressable, TextInput,View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { windowHeight} from '../utils/dimensions';

const RouteScreen = () => {
  return (
    <View >
    <Pressable style={styles.inputContainer}>
    <MaterialIcons name="location-on" size={24} color="black" />
    <TextInput placeholder="Enter your destination" style={styles.icon}
    />
    </Pressable>
    </View>
  );
};

export default RouteScreen;

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        height: windowHeight / 15,
        borderColor: '#ccc',
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
      },

      icon:{
        justifyContent:"flex-end"
      }
});
*/
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import React, {useCallback, useMemo, useRef, useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapboxGL from '@rnmapbox/maps';

import Route from '../components/Route';
import BottomSheet from '@gorhom/bottom-sheet';


const IS_ANDROID = Platform.OS === 'android';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoieW9uYXMxMyIsImEiOiJjbGZzZzZqd2YwNXRvM2VxcmdyMTc4MWg4In0.svu9-rLT7GOuHkrLA5Aejw',
);

const ShowMap = () => {

  const mapViewRef = useRef(null);
  const cameraRef = useRef(null);
  const [isSateliteStyle, setSateliteStyle] = useState(false);
  const defaultCamera = {
    //centerCoordinate: [39.29067144628581, 8.562990740516645],
    zoomLevel: 15,
  };
  const [zoomLevel, setZoomLevel] = useState(defaultCamera.zoomLevel);


  const bottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [snapPoints] = useState(['30', '50%', '75%']);
  const [isAndroidPermissionGranted, setIsAndroidPermissionGranted] =
    useState(false);
  const [isFetchingAndroidPermission, setIsFetchingAndroidPermission] =
    useState(IS_ANDROID);
  const [coordinates] = useState([[39.29067144628581, 8.562990740516645]]);
  const [showUserLocation] = useState(true);
  const [location, setLocation] = useState([
    39.29067144628581, 8.562990740516645,
  ]);
  const [userSelectedUserTrackingMode] = useState(
    MapboxGL.UserTrackingModes.Follow,
  );

  const handleSheetChanges = useCallback(index => {
    console.log(index);
  }, []);

  const handleSnapPress = useCallback(index => {
    setIsOpen(true);
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  useMemo(async () => {
    if (IS_ANDROID && isFetchingAndroidPermission) {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions();
      setIsAndroidPermissionGranted(isGranted);
      setIsFetchingAndroidPermission(false);
    }
  }, [isFetchingAndroidPermission]);

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
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.mapbox}
        styleURL={MapboxGL.StyleURL.Street}
        centerCoordinate={coordinates[0]}
        showUserLocation={true}
        userTrackingMode={userSelectedUserTrackingMode}>
        <MapboxGL.UserLocation
          visible={true}
          /*onUpdate={loc => {
                        setLocation([loc.coords.longitude, loc.coords.latitude]);
                    }}
                    */
        />
        <MapboxGL.Camera
            ref={cameraRef}
            zoomLevel={zoomLevel}
            animationMode={'flyTo'}
            animationDuration={1100}
            defaultSettings={defaultCamera}
            maxZoomLevel={22}
            minZoomLevel={4}
          centerCoordinate={location}>
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
        </MapboxGL.Camera>
      </MapboxGL.MapView>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => handleSnapPress(0)}>
        <Image
          source={require('../assets/Navicon.png')}
          style={styles.floatingButton}
        />
      </TouchableOpacity>
      <View style={styles.touchableZoom}>
          <TouchableOpacity onPress={increaseZoom}>
            <Entypo name="plus" color="black" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={decreaseZoom}>
            <Entypo name="minus" color="black" size={20} />
          </TouchableOpacity>
        </View>
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
            <Route />
          </View>
        )}
      </BottomSheet>
      <TouchableOpacity style={styles.layerIcon} onPress={changeStyle}>
        <Entypo name="layers" size={24} color="white" />
      </TouchableOpacity>
    </View>
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
    bottom: 30,
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
});
export default ShowMap;
