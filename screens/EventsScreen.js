import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Avatar, Icon, ListItem} from '@rneui/themed';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useSelector, useDispatch} from 'react-redux';
// Import the Redux actions and selectors

import {useNavigation} from '@react-navigation/native';

import {fetchRoute} from '../utils/Routeutils';
import Geolocation from 'react-native-geolocation-service';



const EventsScreen = () => {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

  const [UserLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
    };

    const success = pos => {
      const {latitude, longitude} = pos.coords;
      setUserLocation([longitude, latitude]);
    };

    const error = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    const watchId = Geolocation.watchPosition(success, error, options);

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const specificRoutesData = [
    {
      id: '1',
      name: 'Routes for lost id',
      type: 'Routes',
      coord: [39.287087, 8.565724],
    },

    {
      id: '2',
      name: 'Routes for Cafeterias',
      type: 'Cafeterias',
      coord: [39.28717624155462, 8.55942498457398],
    },
    {
      id: '3',
      name: 'Routes for Lounges',
      type: 'Lounges',
      coord: [39.28717624155462, 8.55942498457398],
    },
    {
      id: '4',
      name: 'Routes for Lounges',
      type: 'Lounges',
      coord: [39.28653660049278, 8.564240411708141],
    },
  ];

  const eventRoutesData = [
    {
      id: '1',
      name: 'Seminar',
      type: 'Seminar',
    },
    {
      id: '2',
      name: 'Workshop',
      type: 'Workshop',
    },
  ];

  const navigation = useNavigation();


  const handleRoutePress = async coord => {
    // Call fetchRoute with the origin and destination variables
    const route = await fetchRoute(UserLocation, coord);
    navigation.navigate('Route', {route});
    console.log(UserLocation, coord);
    //console.log(route);
  };
  // Use the useDispatch hook to get the Redux dispatch function

  return (
    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/route.png')}
                style={styles.image}
              />
            </View>
            {/* Create first accordion with its own data array */}
            <ListItem.Accordion
              content={
                <ListItem.Content>
                  <ListItem.Title>Specific Routes</ListItem.Title>
                  <ListItem.Subtitle>
                    tap to see routes used in the campus
                  </ListItem.Subtitle>
                </ListItem.Content>
              }
              isExpanded={expanded1}
              onPress={() => {
                setExpanded1(!expanded1);
                setExpanded2(false);
              }}>
              {/* Display data from first data array */}
              {specificRoutesData.map(item => (
                <ListItem key={item.id}>
                  <Icon name="route" type="font-awesome-5" color="#517fa4" />
                  <TouchableOpacity
                    style={styles.touchcontain}
                    onPress={() => {
                      handleRoutePress(item.coord);
                    }}>
                    <ListItem.Content>
                      <ListItem.Title>{item.name}</ListItem.Title>
                      <ListItem.Subtitle>{item.type}</ListItem.Subtitle>
                    </ListItem.Content>
                  </TouchableOpacity>
                </ListItem>
              ))}
            </ListItem.Accordion>

            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/event.png')}
                style={styles.image}
              />
            </View>
            {/* Create second accordion with its own data array */}
            <ListItem.Accordion
              content={
                <ListItem.Content>
                  <ListItem.Title>Event based Routes</ListItem.Title>
                  <ListItem.Subtitle>
                    tap to see routes used in the campus
                  </ListItem.Subtitle>
                </ListItem.Content>
              }
              isExpanded={expanded2}
              onPress={() => {
                setExpanded2(!expanded2);
                setExpanded1(false);
              }}>
              {/* Display data from second data array */}
              {eventRoutesData.map(item => (
                <ListItem key={item.id}>
                  <Icon name="event" type="MaterialIcons" color="#517fa4" />
                  <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.type}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))}
            </ListItem.Accordion>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'white',
    //padding: 10,
  },
  image: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'white'
  },
  touchcontain: {
    padding: 5,
    width: 250,
    //backgroundColor:'white'
  },
});
