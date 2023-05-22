import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';

const QRScreen = () => {
  return (
    <View style={styles.container}>
      <Text>QRScreen</Text>
      <View style={{position: 'absolute', bottom: '11%'}}>
        <ScrollView 
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
          <View style={styles.tabContainer}>
            <View style={styles.tabViews}>
              <View style={[styles.tabIcon, {backgroundColor: 'orange'}]}>
                <Icon
                  name="restaurant"
                  type="material"
                  color="white"
                  size={13}
                />
              </View>
              <Text style={styles.containertext}>Where to eat</Text>
            </View>
            <View style={styles.tabViews}>
              <View style={[styles.tabIcon, {backgroundColor: 'purple'}]}>
                <Icon
                  name="bunk-bed"
                  type="material-community"
                  color="white"
                  size={13}
                />
              </View>
              <Text style={styles.containertext}> Dormitories</Text>
            </View>
            <View style={styles.tabViews}>
              <View style={[styles.tabIcon, {backgroundColor: 'gray'}]}>
                <Icon
                  name="wifi-marker"
                  type="material-community"
                  color="white"
                  size={13}
                />
              </View>
              <Text style={styles.containertext}>Wifi</Text>
            </View>
            <View style={styles.tabViews}>
              <View style={[styles.tabIcon, {backgroundColor: 'turquoise'}]}>
                <Icon name="shop" type="entypo" color="white"size={13} />
              </View>
              <Text style={styles.containertext}>Shops/groceries</Text>
            </View>
            <View style={styles.tabViews}>
              <View style={[styles.tabIcon, {backgroundColor: 'navy'}]}>
                <Icon
                  name="office-building-marker"
                  type="material-community"
                  color="white"
                  size={13}
                />
              </View>
              <Text style={styles.containertext}>Department and schools</Text>
            </View>
            <View style={styles.tabViews}>
              <View style={[styles.tabIcon, {backgroundColor: 'maroon'}]}>
                <Icon
                  name="bookshelf"
                  type="material-community"
                  color="white"
                  size={13}
                />
              </View>
              <Text style={styles.containertext}>Libraries</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default QRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  tabContainer: {
    width: '100%',
    height: 50,
    padding: 5,
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
    paddingBottom:2,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderRadius: 50,
    backgroundColor: 'silver',
    padding: 3,
  },
});
