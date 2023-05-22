import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//import Homescreen from '../screens/Homescreen';
import Mapscreen from '../screens/Mapscreen';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/SearchScreen';
import RouteScreen from '../screens/RouteScreen';
import BottomSheet from '../screens/BottomSheet';
import EventsScreen from '../screens/EventsScreen';
import QRScreen from '../screens/QRScreen';


const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      >
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Map"
        component={Mapscreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Route"
        component={RouteScreen}
        options={{header: () => null}}
      />
       <Stack.Screen
        name="Events"
        component={EventsScreen}
        //options={{header: () => null}}
      />
       <Stack.Screen
        name="QR"
        component={QRScreen}
        //options={{header: () => null}}
      />

    </Stack.Navigator>
  );
};

export default AppStack;
