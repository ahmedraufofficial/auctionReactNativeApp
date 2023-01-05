import { ScrollView, Text, ImageBackground, StyleSheet, Button, View, Alert} from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import { DataTable } from 'react-native-paper';
import Theme from '../../components/Theme';
import firebase from 'react-native-firebase';

const Notifications = ({route, navigation}) => {

  const [notifications, setNotification] = useState([])

  const getNotif = async (x) => {
    fetch(`http://142.93.231.219/notification/all/${x}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
      setNotification(data.response)
    })
  }

  const getToken = async() => {
    const firebaseToken = await firebase.messaging().getToken()
    getNotif(firebaseToken);
  }


  useEffect(()=>{
    getToken();
  }, [])

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.root}>
      <View>
        <Text>
          NOTIFICATIONS
        </Text>

          {
            notifications && notifications.map((notification, index) => {
              return (
                <View style={{flexDirection: 'row', marginTop: 10}} key={index+"N"}>
                  <Text style={{width: 140}}>{notification.time.replace('T',' ').split('.')[0]}</Text> 
                  <Text>{notification.notification}</Text>
                </View>
              )
            }).reverse()
          }

        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 15,
    paddingVertical: 15
  },
})

export default Notifications