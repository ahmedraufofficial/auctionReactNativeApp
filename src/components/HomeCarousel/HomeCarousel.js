import * as React from 'react';
import {useContext, useEffect, useState, useRef} from 'react';
import {
  Text, 
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Button, 
  StyleSheet,
} from 'react-native';
import { Animated,ImageBackground,Alert } from 'react-native';
import Theme from '../Theme';
import bg from '../../../assets/images/bg.png';
import classifieds from '../../../assets/images/classifieds.png';
import evaluation from '../../../assets/images/evaluation.png';
import auction from '../../../assets/images/auction.png';
import { Dimensions } from 'react-native';
import LogOut from '../../../assets/images/LogOut.png';
import { AuthContext } from '../../Context/AuthContext';
import mainBoard from '../../../assets/images/mainBoard.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Menu from '../Menu';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
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



const HomeCarousel = ({navigation}) => {

    const {userInfo, logout, isLoading} = useContext(AuthContext);
    const translation = useRef(new Animated.Value(0)).current;
    const board = useRef(new Animated.Value(1)).current;
    useEffect(()=>{
      Animated.timing(translation, {
        toValue: -200,
        useNativeDriver: true
      }).start();
      setTimeout(animate, 1000);
    },[])

    const animate = () => {
      Animated.timing(board, {
        toValue: 1.2,
        useNativeDriver: true
      }).start()
    }

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

    const dropAlert = () => {
      Alert.alert(
        "Account Inactive",
        "Kindly wait for your account to be verified and activated. Thank you!",
        [
          {text: "Try Again"}
        ]
      )
    }

    return (
        <ImageBackground 
        source={bg}
        style={{ flex: 1,
          width: null,
          height: null,
          }}
      >
        <Menu navigation={navigation} />
        <Animated.View 
            style={{
              width: 200,
              backgroundColor: 'white',
              transform: [{ translateX: translation}],
              position: 'absolute',
              zIndex: 100,
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
        <Animated.View style={{ flex: 1, transform: [{ scale: board }], alignItems: 'center', justifyContent: 'center' }}>
          <Image source={mainBoard} style={{  width: 300, height: 200, position: 'absolute', top: 150}} resizeMode="contain" />
          <Text numberOfLines={1} style={{color: 'gold', position: 'absolute', top: 200, left: windowWidth*0.225, fontSize: 9, width: 110, transform: [{ rotate: '6deg' }],}}>
            Welcome {userInfo?.username}
          </Text>
          <TouchableOpacity style={{width: 150, height: 100, position: 'absolute',top: 150}} onPress={()=>showMenu()} />
          <TouchableOpacity style={{width: 130, height: 100, position: 'absolute',top: 150, right: 0}} onPress={() => navigation.navigate("Notifications")} />
          <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              top:  288
          }}>
          <TouchableOpacity style={{width: 100, height: 200}} onPress={() => navigation.navigate("Classifieds")}>
            <Image source={classifieds} style={{ width: 100, height: 200, position: 'relative'}} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={{width: 100, height: 200}} onPress={() => userInfo?.status === 'Active' ? navigation.navigate("Live Auctions") : dropAlert()}>
            <Image source={auction} style={{ width: 100, height: 200, position: 'relative'}} resizeMode="contain" /> 
          </TouchableOpacity>
          <TouchableOpacity style={{width: 100, height: 200}} onPress={() => navigation.navigate("Evaluation")}>
            <Image source={evaluation} style={{ width: 100, height: 200, position: 'relative'}} resizeMode="contain" />
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={{top: windowHeight*0.7, position: 'absolute'}} onPress={logout}>
            <Image source={LogOut} style={{ width: 200, position: 'relative', height: 80}} resizeMode="contain" />
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground >

      );
}

export default HomeCarousel;

/* export default class HomeCarousel extends React.Component {
    static contextType = AuthContext;
    constructor(props){
        super(props);
        this.state = {
          username: props.username,
          logout: props.logout,
          navigation: props.navigation,
      }
    }
    
    render() {
      const {userInfo, logout, isLoading} = this.context;
      return (
          <ImageBackground 
          source={bg}
          style={{ flex: 1,
            width: null,
            height: null,
            }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={mainBoard} style={{  width: 300, height: 200, position: 'absolute', top: 150}} resizeMode="contain" />
            <Text style={{color: 'gold', position: 'absolute', top: 200, left: windowWidth*0.225, fontSize: 11, transform: [{ rotate: '6deg' }],}}>
              Welcome {username}
            </Text>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                top:  288
            }}>
            <TouchableOpacity style={{width: 100, height: 200}} onPress={() => navigation.navigate("Classifieds")}>
              <Image source={classifieds} style={{ width: 100, height: 200, position: 'relative'}} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity style={{width: 100, height: 200}} onPress={() => navigation.navigate("Live Auctions")}>
              <Image source={auction} style={{ width: 100, height: 200, position: 'relative'}} resizeMode="contain" /> 
            </TouchableOpacity>
            <TouchableOpacity style={{width: 100, height: 200}} onPress={() => navigation.navigate("Evaluation")}>
              <Image source={evaluation} style={{ width: 100, height: 200, position: 'relative'}} resizeMode="contain" />
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={{top: windowHeight*0.01, position: 'absolute'}} onPress={logout}>
              <Image source={LogOut} style={{ width: 200, position: 'relative', height: 80}} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </ImageBackground >

        );
    }
}
 */