import {StyleSheet, TextInput, Text, View, Pressable} from 'react-native';
import React, {Component} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export class Route extends Component {
  render() {
    return (
      <View>
        <Text>Point on Map or Enter the place you want to go 🔍</Text>
        <Pressable style={styles.inputContainer}>
          <View style={styles.icon}>
            <MaterialIcons name="location-on" size={15} color="grey" />
          </View>
          <TextInput placeholder="Where from" style={styles.inputtext} />
        </Pressable>
        <Pressable style={styles.inputContainer}>
          <View style={styles.icon}>
            <FontAwesome name="flag-checkered" size={18} color="black" />
          </View>
          <TextInput placeholder="Where to" style={styles.inputtext} />
        </Pressable>
      </View>
    );
  }
}

export default Route;

const styles = StyleSheet.create({
  inputContainer: {
    padding:0,
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
    padding: 5,
    paddingRight: 10,
    gap: 10,
  },
  inputtext: {
    padding: 0,
    fontSize: 13,
  },
});
