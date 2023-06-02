import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {windowHeight} from '../utils/dimensions';

import filter from 'lodash.filter';
import {SafeAreaProvider} from 'react-native-safe-area-context';



const API_ENDPOINT = `https://randomuser.me/api/?results=30`;

const SearchScreen = () => {

  const [isLoading, setIsloading] = useState('false');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFulldata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    setIsloading(true);
    fetchData(API_ENDPOINT);
  }, []);

  const fetchData = async url => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results);

      setFulldata(json.results);

      console.log(json.results);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      setError(error);
      console.log(error);
    }
  };

  const handlesearch = query => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, user => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = ({name, email}, query) => {
    const {first, last} = name;

    if (first.includes(query) || last.includes(query) || email.includes(query))
      return true;

    return false;
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color="#5500dc" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text >
          Error in fetching data ... please check your internet connection!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Feather name="search" size={24} color="black" />
          <TextInput
            placeholder="Enter place you want to Search"
            autoCapitalize="none"
            autoCorrect={false}
            value={searchQuery}
            onChangeText={query => handlesearch(query)}
          />
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item.login.username}
          renderItem={({item}) => (
            <View style={styles.itemcontainer}>
              <Image
                source={{uri: item.picture.thumbnail}}
                style={styles.image}
              />
              <TouchableOpacity>
                <Text style={styles.textName}>
                  {item.name.first}
                  {item.name.last}
                </Text>
                <Text style={styles.textEmail}>{item.email}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop:10,
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
      backgroundColor: 'white',
      padding: 10,
    },
  inputContainer: 
  {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  itemcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  image: {
    width: 75,
    height: 75,
    
  },
  textName: {
    fontSize: 22,
    marginLeft: 10,
    fontWeight: '600',
  },
  textEmail: {
    fontSize: 14,
    marginLeft: 10,
    color: 'grey',
  },
});
