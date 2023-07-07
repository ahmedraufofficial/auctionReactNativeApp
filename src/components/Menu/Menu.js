import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Theme from '../Theme';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Animated } from 'react-native';
import {useContext, useEffect, useState, useRef} from 'react';
import { AuthContext } from '../../Context/AuthContext';

const Menu = ({navigation, screen}) => {
    const translation = useRef(new Animated.Value(0)).current;
    const {userInfo, logout, isLoading} = useContext(AuthContext);
    useEffect(()=>{
      Animated.timing(translation, {
        toValue: -200,
        useNativeDriver: true
      }).start();

    },[])

    const showMenu = () => {
      Animated.timing(translation, {
        toValue: 0,
        useNativeDriver: true
      }).start();
    }

    const hideMenu = () => {
      Animated.timing(translation, {
        toValue: -200,
        useNativeDriver: true
      }).start();
    }

    const styles = StyleSheet.create({
        backgroundImage: {
          flex: 1,
          alignSelf: 'stretch',
          width: null,
        },
        menuItem: {
          padding: 15
        }
    })
    
  return (
    <View style={{zIndex: 100}}>
        <TouchableOpacity onPress={()=>showMenu()} style={{position: 'absolute', top: screen == 'Home' ? 30 : 0, left: 0, zIndex: 2, backgroundColor: 'white', padding: 2, borderBottomRightRadius: 10, borderTopRightRadius: screen == 'Home' ? 10 : 0}}>
                <Ionicons name={'home-outline'}  color={Theme.colors.primary} size={25} />
        </TouchableOpacity>
        <Animated.View 
            style={{
              width: 200,
              backgroundColor: 'white',
              transform: [{ translateX: translation}],
              position: 'absolute',
              zIndex: 100,
              top: screen == 'Home' ? 30 : 0,
              borderBottomRightRadius: 50,
              borderRightWidth: 2,
              borderBottomWidth: 2,
              borderColor: Theme.colors.primary
            }}
          >
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Live Auctions")}>
              <Text>Live Auctions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Classifieds")}>
              <Text>Classifieds</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Evaluation")}>
              <Text>Evaluation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Auctioned")}>
              <Text>Completed Auctions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Cart")}>
              <Text>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Profile")}>
              <Text>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Notifications")}>
              <Text>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("About")}>
              <Text>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Toc")}>
              <Text>Terms and condition</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={logout}>
              <Text>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuItem, {alignSelf: 'center'}]} onPress={()=>hideMenu()}>
              <Ionicons name={'md-arrow-back-sharp'} color={Theme.colors.primary} size={25} />
            </TouchableOpacity>
          </Animated.View>
    </View>
  )
}

export default Menu