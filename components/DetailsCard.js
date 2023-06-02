import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import React ,{ useEffect,useState }  from 'react';
import {Icon} from '@rneui/themed';
import {windowHeight, windowWidth} from '../utils/dimensions';
import {useNavigation} from '@react-navigation/native';
import {fetchRoute} from '../utils/Routeutils';
import Geolocation from 'react-native-geolocation-service';


//<Icon name="event" type="MaterialIcons" color="#517fa4" />

const DetailsCard = ({name, description, place,coordinate,userLocation}) => {
  const navigation = useNavigation();



  const handleRoutePress = async coord => {
    if (userLocation.length === 0) {
      alert(
        'Could not fetch your location. Please turn your location on  or try again.',
      );
      return;
    }
    // Call fetchRoute with the origin and destination variables
    const route = await fetchRoute(userLocation, coord);
    navigation.navigate('Route', {route});
    console.log(userLocation, coord);
    //console.log(route);
  };

  //const [userLocation, setUserLocation] = useState([]);
  
  console.log(userLocation);
//console.log(coordinate);

  return (
    <View>
      <View>
        <View style={styles.CardContainer}>
          <View style={styles.cardTextContainer}></View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/ASTU.png')}
                style={styles.image}
              />
            </View>

            <View style={styles.ContentContainer}>
              <View>
                <View style={styles.nameContainer}>
                  <Text style={{fontWeight: '600', color: 'black'}}>
                    {name}
                  </Text>
                </View>

                <View style={styles.desriptionsContainer}>
                  <View
                    style={{
                      gap: 15,
                      flexDirection: 'row',
                    }}>
                    <Icon
                      name="location"
                      type="entypo"
                      color="black"
                      size={18}
                    />
                    <Text style={{color: 'black', fontWeight: 400}}>place</Text>
                  </View>
                  <View
                    style={{
                      gap: 15,
                      flexDirection: 'row',
                      padding: 5,
                    }}>
                    <Icon
                      name="description"
                      type="MaterialIcons"
                      color="black"
                      size={18}
                    />
                    <Text style={{padding: 5}}>{description}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      //justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 15,
                        padding: 4,
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                      }}
                      >
                      <Text style={styles.ButtonsText}>Details to</Text>
                      <View style={{transform: [{rotate: '180deg'}]}}>
                        <Icon
                          name="double-arrow"
                          type="MaterialIcons"
                          color="silver"
                          size={20}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 15,
                        padding: 4,
                        flexDirection: 'row',
                      }}
                      onPress={()=>{handleRoutePress(coordinate)}}
                      >
                      <Text style={styles.ButtonsText}>Travel to</Text>
                      <Icon
                        name="double-arrow"
                        type="MaterialIcons"
                        color="silver"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      
    </View>
    /*<View key={item.id}>
                    <Icon name="event" type="MaterialIcons" color="#2089DC"" />
                    <View>
                      <View><Text>{item.name}</Text></View>
                      <View><Text>{item.type}</Text></View>
                      <DetailsCard/>
                    </View>
                  </View>*/
  );
};

export default DetailsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
  },
  CardContainer: {
    alignItems: 'center',
    marginLeft: 1,
    marginRight: 1,
    marginTop: 3,
    marginBottom: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    //borderBottomWidth: 1,
  },
  image: {
    width: windowWidth - 250,
    height: windowHeight / 5,
    resizeMode: 'contain',
    //borderBottomLeftRadius: 10,
    //borderBottomRightRadius: 10,
  },
  imageContainer: {
    backgroundColor: 'white',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  ButtonsText: {
    backgroundColor: 'silver',
    borderRadius: 15,
    padding: 3,
    fontWeight: 400,
    fontSize: 12,
    color: 'black',
  },
});
