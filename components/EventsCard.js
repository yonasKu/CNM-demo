import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {windowHeight, windowWidth} from '../utils/dimensions';

//<Icon name="event" type="MaterialIcons" color="#517fa4" />

const EventsCard = ({name, description, place,coord,handleRoutePress}) => {
  
  return (
    <View>
      <View>
        <View style={styles.CardContainer}>
          <View style={styles.cardTextContainer}>
            <View
              style={{
                gap: 10,
                flexDirection: 'row',
              }}>
              <Icon name="event" type="MaterialIcons" color="white" />
              <Text style={{color: 'white', fontWeight: 700}}>Events</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/event.png')}
                style={styles.image}
              />
            </View>

            <View style={styles.ContentContainer}>
              <TouchableOpacity 
              onPress={()=>{handleRoutePress(coord)}}
              >
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
                    <Text style={{color: 'black', fontWeight: 400}}>
                      {place}
                    </Text>
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
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        backgroundColor: 'silver',
                        borderRadius: 15,
                        padding: 4,
                        marginTop: 3,
                        fontWeight: 400,
                        fontSize: 10,
                        color: 'black',
                      }}>
                      Travel to
                    </Text>
                    <Icon
                      name="double-arrow"
                      type="MaterialIcons"
                      color="silver"
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>
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
                    <EventsCard/>
                  </View>
                </View>*/
  );
};

export default EventsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
  },
  CardContainer: {
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 10,
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
});
