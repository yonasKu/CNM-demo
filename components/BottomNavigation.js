import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {Icon} from '@rneui/themed';



const BottomNavigation = ({handlepoints}) => {

  Dtypes = ['Where to eat', 'Dormitories', 'Wifi','Shops','Departments','Library']
  
  return (
    <View style={{position: 'absolute', bottom: '1%'}}>
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.tabContainer}>
                <TouchableOpacity 
                onPress={()=>handlepoints(Dtypes[0])}
                style={styles.tabViews}>
                  <View style={[styles.tabIcon, {backgroundColor: 'orange'}]}>
                    <Icon
                      name="restaurant"
                      type="material"
                      color="white"
                      size={13}
                    />
                  </View>
                  <Text style={styles.containertext}>Where to eat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>handlepoints(Dtypes[1])}
                  style={styles.tabViews}>
                  <View style={[styles.tabIcon, {backgroundColor: 'purple'}]}>
                    <Icon
                      name="bunk-bed"
                      type="material-community"
                      color="white"
                      size={13}
                    />
                  </View>
                  <Text style={styles.containertext}> Dormitories</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>handlepoints(Dtypes[2])}
                style={styles.tabViews}>
                  <View style={[styles.tabIcon, {backgroundColor: 'gray'}]}>
                    <Icon
                      name="wifi-marker"
                      type="material-community"
                      color="white"
                      size={13}
                    />
                  </View>
                  <Text style={styles.containertext}>Wifi</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>handlepoints(Dtypes[3])}
                style={styles.tabViews}>
                  <View
                    style={[styles.tabIcon, {backgroundColor: 'turquoise'}]}>
                    <Icon name="shop" type="entypo" color="white" size={13} />
                  </View>
                  <Text style={styles.containertext}>Shops/groceries</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>handlepoints(Dtypes[4])}
                style={styles.tabViews}>
                  <View style={[styles.tabIcon, {backgroundColor: 'navy'}]}>
                    <Icon
                      name="office-building-marker"
                      type="material-community"
                      color="white"
                      size={13}
                    />
                  </View>
                  <Text style={styles.containertext}>
                    Department and schools
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>handlepoints(Dtypes[5])}
                style={styles.tabViews}>
                  <View style={[styles.tabIcon, {backgroundColor: 'maroon'}]}>
                    <Icon
                      name="bookshelf"
                      type="material-community"
                      color="white"
                      size={13}
                    />
                  </View>
                  <Text style={styles.containertext}>Libraries</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  BottomContainer: {
    position: 'absolute',
    bottom: '1%',
  },
  tabContainer: {
    width: '100%',
    height: 50,
    padding: 5,
    //position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabViews: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 6,
    marginRight: 6,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containertext: {
    color: 'black',
    fontWeight: 700,
    fontFamily: 'Futura',
    fontSize: 12,
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderRadius: 50,
    backgroundColor: 'silver',
    padding: 3,
  },
});
