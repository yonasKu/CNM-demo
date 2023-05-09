import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useContext, useState } from 'react'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AntDesign from "react-native-vector-icons/AntDesign"
import { AuthContext } from '../navigation/AuthProvider';

const Loginscreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {Login} = useContext(AuthContext) 
  
  return (
    <View style={styles.container}>
       <Image
        source={require('../assets/CNM.png')}
        style={styles.logo}
      />
    <Text style={styles.text}>CNM App</Text>

      <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType= 'user'
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <FormButton
        buttonTitle="Sign In"
        onPress={() => Login(email, password)}
      />
      <TouchableOpacity
      style={styles.forgotButton}
      onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Loginscreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
    
    //color:#ffff
  },
  logo: {
    height: 150,
    width: 150,
    borderRadius: 150/2,
    resizeMode: 'contain',
    backgroundColor:'#fff'
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
})