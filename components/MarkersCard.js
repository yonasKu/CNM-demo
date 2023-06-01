import { StyleSheet, Text, View } from 'react-native'
import React, { useState,TouchableOpacity } from 'react'
import MapboxGL, {
  Camera,
  PointAnnotation,
  MarkerVieW,
  Images,
} from '@rnmapbox/maps';


const MarkersCard = () => {
  const [markers, setMarkers] = useState([
    
  ]);
  const filteredMarkers = markers.filter(marker => marker.type === selectedType)
  
  const featureCollection = {
    type: 'FeatureCollection',
    features: filteredMarkers.map(marker => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: marker.coordinates,
      },
      properties: {
        title: marker.title,
        description: marker.description,
        id: marker.id,
      },
    })),
  };
  const symbolLayerStyle = {
    iconAllowOverlap: true,
    //iconAnchor: 'bottom',
    iconSize: 0.75,
    iconImage: 'foo',
    textSize: 12, // adjust the offset of the text to show the callout properly
    textAllowOverlap: true,
  };


  const handleMarkerPress = event => {
    const {properties} = event.features[0];
    setSelectedMarker(properties);
  };



  return (
    <>
            {markers.map(marker => (
              <MapboxGL.PointAnnotation
                key={marker.id}
                id={marker.id}
                coordinate={marker.coordinates}
                onSelected={() => setSelectedMarker(marker)}>
                <MapboxGL.Callout style={styles.calloutContainer}>
                  <View style={{backgroundColor: 'white'}}>
                    <Text style={styles.calloutTitle}>{marker.title}</Text>
                    <Text style={styles.calloutDescription}>
                      {marker.description}
                    </Text>
                    <TouchableOpacity
                      style={styles.calloutButton}
                      onPress={() => console.log('Button pressed')}>
                      <Text style={styles.calloutButtonText}>Press me</Text>
                    </TouchableOpacity>
                  </View>
                </MapboxGL.Callout>
              </MapboxGL.PointAnnotation>
            ))}

    </>
  )
}

export default MarkersCard

const styles = StyleSheet.create({})