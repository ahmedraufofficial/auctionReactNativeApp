import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useContext, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import Register from '../../screens/Register';
import SignIn from '../../screens/SignIn';
import Middleware from '../../screens/Middleware';
import { AuthContext } from '../../Context/AuthContext';
import { Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Theme from '../Theme';
import Auctions from '../../screens/Auctions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Vehicle from '../../screens/Vehicle';
import Invoices from '../../screens/Invoices';
import VehicleNegotiation from '../../screens/VehicleNegotiation';
import CompletedAuctions from '../../screens/CompletedAuctions';
import Classifieds from '../../screens/Classifieds';
import AddClassifieds from '../../screens/AddClassifieds';
import EditClassifieds from '../../screens/EditClassifieds';
import ClassifiedVehicle from '../../screens/ClassifiedVehicle';
import Evaluation from '../../screens/Evaluation';
import Notifications from '../../screens/Notifications';
import ForgotPassword from '../../screens/ForgotPassword';
import Profile from '../../screens/Profile';
import ChangePassword from '../../screens/ChangePassword';
import VehicleCart from '../../screens/VehicleCart';
import About from '../../screens/About';
import Toc from '../../screens/Toc';
import logo from '../../../assets/images/logoName.png';
import { Image, Dimensions } from 'react-native';
import { useEffect } from 'react';
import firebase from 'react-native-firebase';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Home':
        iconName = 'home-outline';
        break;
      case 'Live Auctions':
        iconName = 'car-sport-outline';
        break;
      case 'Cart':
        iconName = 'cart-outline';
        break;
      case 'Auctioned':
        iconName = 'car-sport'
        break;
      default:
        break;
    }
    return <Ionicons name={iconName} color={color} size={24} />;
  };

const TabNavigation = () => {
    const {userInfo} = useContext(AuthContext);
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color}) => screenOptions(route, color),
                tabBarLabelStyle: {
                    fontSize: 13,
                    bottom: 0
                },
                tabBarStyle: { 
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    //backgroundColor: Theme.colors.secondary,
                    borderRadius: 15,
                    height: 60,
                    ... styles.shadow
                }
            })}>
            <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
            { userInfo?.status === "Active" ? <Tab.Screen name="Live Auctions" component={Auctions} /> : null }
            { userInfo?.status === "Active" ? <Tab.Screen name="Auctioned" component={CompletedAuctions} /> : null }
            { userInfo?.status === "Active" ? <Tab.Screen name="Cart" component={Invoices} /> : null }
        </Tab.Navigator>
    );
}
  
//React Native Vector Icons - Setup: Android and IOS simple (2022)
const Navigation = () => {
    const {userInfo} = useContext(AuthContext);
    const windowWidth = Dimensions.get('window').width;
    useEffect(()=>{
        //getToken();
    },[])

    const [deviceId, setDeviceId] = useState("")

    /* const getToken = async() => {
      const firebaseToken = await firebase.messaging().getToken()
      setDeviceId(firebaseToken)
      let notifInterval = setInterval(() => {
        getNotif(firebaseToken);
      }, 1000);
      return () => {
        clearInterval(notifInterval);
        }
    }

    const getNotif = async (x) => {
        fetch(`https://backend.carologyauctions.net/notifications/${x}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.response.length > 0){
                data.response.map((not) => {
                    return toast.show(not.notification)
                })
            }
        })
    } */

    return (
        <PaperProvider theme={Theme}>
            <NavigationContainer theme={Theme}>
                <Stack.Navigator>
                    {userInfo?.token ? (
                        <>
                            <Stack.Screen name="Middleware" component={TabNavigation} options={{headerShown: false}}/>
                            <Stack.Screen name="Vehicle" component={Vehicle} options={{ headerTitle: (props) => (<Text>Auction</Text>)}}/>
                            <Stack.Screen name="VehicleNegotiation" component={VehicleNegotiation} options={{ headerTitle: (props) => (<Text>Negotiation</Text>)}} />
                            <Stack.Screen name="AddClassifieds" component={AddClassifieds} options={{ headerTitle: (props) => (<Image style={{ width: 180, height: 50, bottom:2 }} source={logo}/>)}} />
                            <Stack.Screen name="EditClassifieds" component={EditClassifieds} options={{ headerTitle: (props) => (<Image style={{ width: 180, height: 50, bottom:2 }} source={logo}/>)}} />
                            <Stack.Screen name="ClassifiedVehicle" component={ClassifiedVehicle} options={{ headerTitle: (props) => (<Image style={{ width: 180, height: 50, bottom: 2 }} source={logo}/>)}} />
                            <Stack.Screen name="Evaluation" component={Evaluation} options={{ headerTitle: (props) => (<Image style={{ width: 180, height: 50, bottom:2 }} source={logo}/>)}} />
                            <Stack.Screen name="Classifieds" component={Classifieds} options={{ headerTitle: (props) => (<Image style={{ width: 180, height: 50, bottom:2 }} source={logo}/>)}} />
                            <Stack.Screen name="Notifications" component={Notifications} options={{ headerTitle: (props) => (<Image style={{ width: 180, height: 50, bottom:2 }} source={logo}/>)}} />
                            <Stack.Screen name="Profile" component={Profile} options={{ headerTitle: (props) => (<Image style={{ width: 180, height: 50, bottom:2 }} source={logo}/>)}} />
                            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown: false}}/>
                            <Stack.Screen name="VehicleCart" component={VehicleCart} options={{ headerTitle: (props) => (<Image style={{ width: 180, height: 50, bottom:2 }} source={logo}/>)}}/>
                            <Stack.Screen name="About" component={About} options={{ headerTitle: (props) => (<Image style={{ width: 180, height: 50, bottom:2 }} source={logo}/>)}}/>
                            <Stack.Screen name="Toc" component={Toc} options={{ headerTitle: (props) => (<Image style={{ width: 180, height: 50, bottom:2 }} source={logo}/>)}}/>
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
                            <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}}/>
                            <Stack.Screen name="Classifieds" component={Classifieds} options={{ headerTitle: (props) => (<Image style={{ width: 180, height: 50, bottom:2 }} source={logo}/>)}} />
                            <Stack.Screen name="Notifications" component={Notifications} options={{ headerTitle: (props) => (<Image style={{ width: 180, height: 50, bottom:2 }} source={logo}/>)}} />
                            <Stack.Screen name="ClassifiedVehicle" component={ClassifiedVehicle} options={{ headerTitle: (props) => (<Image style={{ width: 180, height: 50, bottom:2 }} source={logo}/>)}} />
                            <Stack.Screen name="About" component={About} options={{ headerTitle: (props) => (<Image style={{ width: 180, height: 50, bottom:2 }} source={logo}/>)}}/>
                            <Stack.Screen name="Toc" component={Toc} options={{ headerTitle: (props) => (<Image style={{ width: 180, height: 50, bottom:2 }} source={logo}/>)}}/>
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default Navigation;