import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Providers from './navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Providers />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
