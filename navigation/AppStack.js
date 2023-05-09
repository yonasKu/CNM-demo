import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//import Homescreen from '../screens/Homescreen';
import Mapscreen from '../screens/Mapscreen';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/SearchScreen';
import RouteScreen from '../screens/RouteScreen';
import BottomSheet from '../screens/BottomSheet';


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
        name="Bottom"
        component={BottomSheet}
        //options={{header: () => null}}
      />

    </Stack.Navigator>
  );
};

export default AppStack;
