import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Avatar, Icon, ListItem} from '@rneui/themed';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useSelector, useDispatch} from 'react-redux';
// Import the Redux actions and selectors

import {useIsFocused, useNavigation} from '@react-navigation/native';

import {fetchRoute} from '../utils/Routeutils';
import Geolocation from 'react-native-geolocation-service';
import EventsCard from '../components/EventsCard';

const EventsScreen = () => {
  
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
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt odio repellat doloremque velit dolores magni eligendi rerum id. Ducimus, temporibus!',
      location: 'Astucafe',
      coordinate :[39.29008436747529, 8.565548313166687]
    },
    {
      id: '2',
      name: 'Workshop',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt odio repellat doloremque velit dolores magni eligendi rerum id. Ducimus, temporibus!',
      location: 'Astu cafe 1',
      coordinate :[39.29011990176903, 8.564742934216113]
    },
    {
      id: '3',
      name: 'Venue',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt odio repellat doloremque velit dolores magni eligendi rerum id. Ducimus, temporibus!',
      location: 'Astu stadium',
      coordinate :[39.29465521852066, 8.565422352277835]
    },
    {
      id: '4',
      name: 'meeting',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt odio repellat doloremque velit dolores magni eligendi rerum id. Ducimus, temporibus!',
      location: 'Astu cafe 2',
      coordinate :[39.29127157525488, 8.564631397835498]
    },
  ];

  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

  const [UserLocation, setUserLocation] = useState([]);

  const isFocused = useIsFocused();

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

console.log(UserLocation)
  const navigation = useNavigation();

  const handleRoutePress = async coord => {
    if (UserLocation.length === 0) {
      alert(
        'Could not fetch your location. Please turn your location on  or try again.',
      );
      return;
    }
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
              <View style={styles.SpeRouteholder}>
                {/* Display data from first data array */}
                {specificRoutesData.map(item => (
                  <View key={item.id}>
                    <ListItem>
                      <Icon
                        name="route"
                        type="font-awesome-5"
                        color="#517fa4"
                      />
                      <TouchableOpacity
                        style={styles.touchcontain}
                        onPress={() => {
                          handleRoutePress(item.coord);
                        }}>
                        <ListItem.Content>
                          <View style={{marginLeft:45}}>
                          <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>{item.name}</Text>
                          </View>
                          <View style={{marginLeft:75,}}>
                          <Text>{item.type}</Text>
                          </View>
                        </ListItem.Content>
                      </TouchableOpacity>
                    </ListItem>
                  </View>
                ))}
              </View>
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
                <View key={item.id}>
                  <EventsCard
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    place={item.location}
                    coord={item.coordinate}
                    handleRoutePress={handleRoutePress}
                  />
                </View> 
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
  SpeRouteholder: {

    padding: 5,
    marginRight: 20,
  },
  SpeContentholder: {
    marginRight: 10,
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
    width: 225,
    borderRadius: 15,
    backgroundColor: 'silver',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
