import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { UserLocation } from '@rnmapbox/maps';

const tokenmapbox="sk.eyJ1IjoieW9uYXMxMyIsImEiOiJjbGdjYWp4dmkwdnB0M3BxbHJlaXFybW1zIn0.FyqjnRdeBs8BQmbYPByfrg"

MapboxGL.setAccessToken('s8LY0nbQjTiYja46pctM');


const Map = () => {

  //const coordinateexample=[39.290131985980345,8.564437299047215];

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView 
        style={styles.map} 
        styleURL={"https://api.maptiler.com/maps/outdoor-v2/style.json?key=nnMHkYJatv2AnsuLqnbN"}
        centerCoordinate={[39.29067144628581,8.562990740516645]}
        zoomEnabled
        >
          <MapboxGL.Camera
          zoomLevel={16}
          centerCoordinate={[39.29067144628581,8.562990740516645]}
          />
        </MapboxGL.MapView>
       
      </View>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1
  }
});