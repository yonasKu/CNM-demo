import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useCallback, useMemo, useRef, useState} from 'react';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import {TouchableOpacity, Image} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BottomSheet from '@gorhom/bottom-sheet';
import Route from '../components/Route';
import { useIsFocused } from '@react-navigation/native';

const Homescreen = ({navigation}) => {
  const {user, Logout} = useContext(AuthContext);

  const bottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const snapPoints = useMemo(() => ['30', '50%', '75%'], []);

  const handleSheetChanges = useCallback(index => {
    console.log(index);
  }, []);
  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);


  const isFocused = useIsFocused()

  return (
    <View style={styles.container}>
      <FormButton
        buttonTitle="bottomsheet"
        onPress={() => navigation.navigate('Bottom')}
      />
      <TouchableOpacity
        style={styles.touchableopacity}
        onPress={() => handleSnapPress(0)}>
        <Image
          style={styles.floatingButton}
          source={require('../assets/Navicon.png')}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{user.uid}</Text>
      <FormButton buttonTitle="Logout" onPress={() => Logout()} />
      <View style={styles.touchableZoom}>
        <TouchableOpacity>
          <AntDesign name="plus" color="black" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="minus" color="black" size={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.layerIcon}>
  {isFocused ? (
    <Entypo name="layers" size={24} color="#fff" />
  ) : (
    <Ionicons name="layers" size={24} color="#1565C0" />
  )}
</TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setIsOpen(false)}
        onChange={handleSheetChanges}
        style={styles.bottomSheet}
        >  
        <View style={styles.contentContainer}>
          <Route/>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
  touchableopacity: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 20,
  },
  floatingButton: {
    resizeMode: 'contain',
  },
  touchableZoom: {
    position: 'absolute',
    width: 40,
    gap: 10,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    bottom: '50%',
    backgroundColor: 'black',
    borderBottomEndRadius: 25,
    borderTopStartRadius: 25,
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
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  layerIcon:{
    position: 'absolute',
    left: 10,
    bottom: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  }
});
