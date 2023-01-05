/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView, StyleSheet,
  Text
} from 'react-native';
import Navigation from './src/components/Navigation';
import { AuthProvider } from './src/Context/AuthContext';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase';
import Toast from "react-native-toast-notifications";

const App = gestureHandlerRootHOC(() => {
  
  useEffect(() => {
    getToken();
    createChannel();
    notificationListener();
  }, [])

  const [deviceId, setDeviceId] = useState("")

  const getToken = async() => {
    const firebaseToken = await firebase.messaging().getToken()
    setDeviceId(firebaseToken)
  }

  const createChannel = () => {
    const channel = new firebase.notifications.Android.Channel(
      'channelId',
      'channelName',
      firebase.notifications.Android.Importance.Max
    ).setDescription('Description')

    firebase.notifications().android.createChannel(channel);
  }
  
  const notificationListener = () => {
    firebase.notifications().onNotification((notification) => {
      if(Platform.OS === 'android'){
        const localNotification = new firebase.notifications.Notification({
          sound: 'default',
          show_in_foreground: true,
        }).setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setSubtitle(notification.subtitle)
        .setBody(notification.body)
        .setData(notification.data)
        .android.setChannelId('channelId')
        .android.setPriority(firebase.notifications.Android.Priority.High)

        firebase.notifications().displayNotification(localNotification).catch((err) =>
          console.log(err))
      }
    })
  }


  return (

      <AuthProvider deviceId={deviceId}>
          <Navigation deviceId={deviceId} />
          <Toast ref={(ref) => global['toast'] = ref} />
      </AuthProvider>

  )
});


export default App;
