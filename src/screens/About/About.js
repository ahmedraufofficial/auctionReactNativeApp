import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import Theme from '../../components/Theme';
import { AuthContext } from '../../Context/AuthContext';
import CustomButton from '../../components/CustomButton';
import HTMLView from 'react-native-htmlview';

const About = ({navigation}) => {
  const {userInfo, logout, isLoading} = useContext(AuthContext);
  const [about, setAbout] = useState(null)
  const fetchAbout = () => {
    fetch(`https://backend.carologyauctions.net/about`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setAbout(data.data[0]["content"])
      })
}

  useEffect(()=>{
    fetchAbout()
  },[])
  return (
    <ScrollView style={styles.root}>
      <Text style={styles.header}>About Us</Text>
      <HTMLView value={`${about}`} />
      <View style={{marginBottom: 50}}>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: 'white',
    width: "100%",
  },
  bullet: {
    fontSize: Theme.fontSize.text,
  },
  title: {
    fontSize: Theme.fontSize.title,
    textAlign: 'left',
    width: '100%',
    marginTop: 10,
    fontWeight: 'bold'
  },
  header: {
    fontSize: 18,
    color: Theme.colors.primary
  },
})

export default About