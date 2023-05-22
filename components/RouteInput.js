import React, {useState, useEffect} from 'react';
import {
  TextInput,
  Text,
  View,
  Pressable,
  Button,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// name="map-pin" "flag-checkered"
const RouteInput = ({labelValue, placeholderText,iconType, ...rest}) => {
  return (
    <View>
      <Pressable style={styles.inputContainer}>
        <View style={styles.iconStyle}>
          <FontAwesome name={iconType} size={15} color="black" />
        </View>
        <TextInput
          value={labelValue}
          numberoflines={1}
          placeholder={placeholderText}
          placeholderTextColor="#666"
          style={styles.inputtext}
          {...rest}
        />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    padding: 0,
    marginTop: 5,
    height: 35,
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
  },
  icon: {
    padding: 10,
    borderRightWidth:1,
    paddingRight: 10,
    gap: 10,
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width:40,
    paddingVertical:0,
  },
  inputtext: {
    padding: 0,
    fontSize: 13,
    padding: 10,
    flex: 1,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:0,
  },
});

export default RouteInput;
