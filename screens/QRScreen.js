import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from '@rneui/themed';

const QRScreen = () => {
  const categories = ['All', 'Electronics', 'Clothing', 'Books'];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategorySelection = category => {
    setSelectedCategory(category);
    // Perform search with selected category
  };
  return (
    <View style={styles.container}>
      <Text>QRScreen</Text>
      <View></View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderRadius: 50,
    backgroundColor: 'silver',
    padding: 3,
  },

});
