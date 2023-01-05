/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { ToastProvider } from 'react-native-toast-notifications'
AppRegistry.registerComponent(appName, () => App);
