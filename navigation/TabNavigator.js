import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Homescreen from '../screens/Homescreen';
import Mapscreen from '../screens/Mapscreen';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchScreen from '../screens/SearchScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RouteScreen from '../screens/RouteScreen';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle:{backgroundColor:"#1565C0"},
        tabBarInactiveTintColor:'#fff',
        tabBarActiveTintColor:'yellow',
      }}
      >
      <Tab.Screen
        name="Home2"
        component={Homescreen}
        options={{
          tabBarLabel: 'Home1',
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Entypo name="home" size={24} color="#fff" />
            ) : (
              <Ionicons name="home-outline" size={24} color="#fff" />
            ),
        
        }}
      />
      <Tab.Screen name="Map1" component={Mapscreen}
      options={{
        tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="map" size={24} color="#fff" />
            ) : (
            <Ionicons name="map-outline" color='#fff' size={24} />
            ),
      }}
      />
        <Tab.Screen name="Search1" component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <FontAwesome name="search" size={24} color="#fff" />
            ) : (
            <Ionicons name="search-circle-outline" color='#fff' size={24} />
            ),
      }}
      />
      
      <Tab.Screen name="Route1" component={RouteScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <FontAwesome5 name="route" size={24} color="#fff" />
            ) : (
              <FontAwesome5 name="route" size={24} color="#fff" />
            ),
      }}
      />

    </Tab.Navigator>
  );
};

export default TabNavigator;
