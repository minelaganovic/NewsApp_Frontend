import { registerRootComponent } from 'expo';
import {AppRegistry} from 'react-native';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

/*
 * @format
 
import { registerRootComponent } from 'expo';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (Platform.OS == "android") {
    registerRootComponent(App);
  } else {
    AppRegistry.registerComponent('main', () => App);
  }*/
