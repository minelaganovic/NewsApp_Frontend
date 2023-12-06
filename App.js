/*import { StatusBar } from 'expo-status-bar';
import React from 'react';
import RootNavigation from './src/navigation';

const App = () => {
  return (
    <RootNavigation/>
  )
}

export default App*/

import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image,Text, View, StyleSheet } from 'react-native';
import RootNavigation from './src/navigation';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './src/redux';
import EStyleSheet from 'react-native-extended-stylesheet';

export const reduxPersistStore = persistStore(reduxStore);

const App = () => {

  useEffect(() => {
    EStyleSheet.build();
  }, []);

  return (
  <Provider store={reduxStore}>
    <PersistGate persistor={reduxPersistStore}>  
        <RootNavigation />
   </PersistGate>
    </Provider>
  )
}

export default App;
