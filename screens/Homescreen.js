import {StyleSheet, View, ScrollView,Image} from 'react-native';

import React, {useContext, useRef, useState} from 'react';
import {AuthContext} from '../navigation/AuthProvider';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {images} from '../components/Images';

import {
  Button,
  Card,
  Icon,
  Text,
  Tile,
  Header as HeaderRNE,
  HeaderProps,
  Avatar,
} from '@rneui/themed';
import Navoptions from '../components/NavOptions';

const Homescreen = ({navigation}) => {
  //const navigation =useNavigation();

  const {user, Logout} = useContext(AuthContext);

  const bottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SafeAreaProvider>
      <HeaderRNE
        leftComponent={
          <TouchableOpacity>
            <Avatar
              size={32}
              rounded
              icon={{ name: 'user', type: 'font-awesome' ,color:'black' }}
              containerStyle={{ backgroundColor: '#ffffff' }}
            />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity style={{marginLeft: 10}}>
              <Icon
                type="simple-line-icon"
                name="logout"
                color="white"
                onPress={() => Logout()}
              />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{text: 'CNM', style: styles.heading}}
      />

      <View style={styles.container}>
        <ScrollView style={{paddingVertical: 10}}>
          <Navoptions />
          <Text style={styles.subHeader}>Indoor Nav</Text>
          <View style={{paddingTop: 20, paddingBottom: 10}}>
            <Tile
              imageSrc={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg/320px-Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg'
              }}
              title="This is Full Campus Navigation using images "
              titleStyle={{fontSize: 20, textAlign: 'center', paddingBottom: 5}}
              featured
              activeOpacity={1}
              width={310}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: 'green'}}>Visit</Text>
                <Text style={{color: '#397af8'}}>Find out More</Text>
              </View>
            </Tile>
          </View>
          <View>
            <Card>
              <Card.Title>🔭 EXPLORE ASTU 🗺️ </Card.Title>
              <Card.Divider />
              <Card.Image style={{padding: 0}} source={images.profile[1]} />
              <Text style={{marginBottom: 10}}>
                This is the webview of Indoor and Outdoor Navigation of Adama
                Science And Technology University using virtual images
              </Text>
              <Button
                icon={
                  <Icon
                    name="code"
                    color="#ffffff"
                    iconStyle={{marginRight: 10}}
                  />
                }
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="Explore NOW"
              />
            </Card>
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',

    shadowOffset: {width: -1, height: -3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    //elevation :5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  ImFlatlist: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  touchableFlat: {
    flex: 1,
    padding: 2,
    paddingBottom: 8,
    paddingTop: 4,
    paddingLeft: 6,
    backgroundColor: '#eaeaea',
    margin: 10,
    width: 140,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableText: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: 'semibold',
    color: 'black',
  },
  FlIcon: {
    padding: 2,
    backgroundColor: 'black',
    borderRadius: 50,
  },
  subHeader: {
    backgroundColor: '#2089dc',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    marginTop: 10,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
