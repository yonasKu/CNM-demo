
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Homescreen from '../screens/Homescreen';
import Mapscreen from '../screens/Mapscreen';
import Loginscreen from '../screens/Loginscreen';
import SignupScreen from '../screens/SignupScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
        <Stack.Navigator
        >
          <Stack.Screen 
          name="Login"
          component={Loginscreen}
          options={{header: () => null}}
          />
          <Stack.Screen 
          name="Signup"
          component={SignupScreen}
          options={({navigation}) => ({
            title: '',
            headerStyle: {
              backgroundColor: '#f9fafd',
              shadowColor: '#f9fafd',
              elevation: 0,
              
            },
            
            headerLeft: () => (
              <View style={{marginLeft: 10}}>
                <FontAwesome.Button 
                  name="long-arrow-left"
                  size={25}
                  backgroundColor="#f9fafd"
                  color="#333"
                  onPress={() => navigation.navigate('Login')}
                />
              </View>
            ),
          })}
          />
        </Stack.Navigator>
  )
}

export default AuthStack

