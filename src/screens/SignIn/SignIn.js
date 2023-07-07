import { View, Image, StyleSheet, useWindowDimensions, TouchableOpacity, Text, Alert, Animated } from 'react-native';
import { useContext, useState, useRef, useEffect } from 'react';
import React from 'react';
import Logo from '../../../assets/images/thumbnail_Logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../Context/AuthContext';
import Theme from '../../components/Theme';
import { ImageBackground } from 'react-native';
import bg from '../../../assets/images/bg.png';
import classifieds from '../../../assets/images/classifieds.png';
import evaluation from '../../../assets/images/evaluation.png';
import auction from '../../../assets/images/auction.png';
import { Dimensions } from 'react-native';
import Sign from '../../../assets/images/Sign.png';
import mainBoard from '../../../assets/images/mainBoard.png';

const API_URL = 'https://backend.carologyauctions.net';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLoading, login} = useContext(AuthContext);
  const [signIn, setSignIn] = useState(false);
  const board = useRef(new Animated.Value(1)).current;
  useEffect(()=>{
    setTimeout(animate, 1000);
  },[])

  const animate = () => {
    Animated.timing(board, {
      toValue: 1.2,
      useNativeDriver: true
    }).start()
  }

  /* const onLoggedIn = token => {
    console.log("HERE")
    fetch(`${API_URL}/private`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
    })
    .then(async res => { 
        try {
            const jsonRes = await res.json();
            if (res.status === 200) {
              console.warn(jsonRes.message)
                //setMessage(jsonRes.message);
            }
        } catch (err) {
            console.log(err);
        };
    })
    .catch(err => {
        console.log(err);
    });
}
 */
  const {height} = useWindowDimensions();
  
  return (

    <ImageBackground 
      source={bg}
      style={{ flex: 1,
        width: null,
        height: null,
        }}
    >
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={{ flex: 1, alignItems: 'center', transform: [{ scale: board }], justifyContent: 'center' }}>
      <Image source={mainBoard} style={{  width: 300, height: 200, position: 'absolute', top: 150}} resizeMode="contain" />

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

      <TouchableOpacity style={{width: 100, height: 200 }} onPress={() => 
        Alert.alert(
          "Kindly 'Sign In'",
          "If you dont have an account, please 'Register'",
          [
            {text: "Try Again"}
          ]
        )}>
        <Image source={auction} style={{ width: 100, height: 200, position: 'relative'}} resizeMode="contain" /> 
      </TouchableOpacity>

      <TouchableOpacity style={{width: 100, height: 200}} onPress={() =>                 
        Alert.alert(
          "Kindly 'Sign In'",
          "If you dont have an account, please 'Register'",
          [
            {text: "Try Again"}
          ]
        )}>
        <Image source={evaluation} style={{ width: 100, height: 200, position: 'relative',}} resizeMode="contain" />
      </TouchableOpacity>
      </View>
      </Animated.View>


      {
        signIn ? 
        <View style={styles.root}>
          <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain" />
          <CustomInput placeholder='Email' value={email} setValue={setEmail} />
          <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} />
          <CustomButton text={'Sign In'} onPress={() => {login(email,password)}} />
          <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.link}>Forgot password?</Text>
              </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={{color: Theme.colors.secondary}}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>Register</Text>
              </TouchableOpacity>
          </View>
          <View>
            <CustomButton text={'Back to Home'} onPress={() => setSignIn(!signIn)} />
          </View>
        </View> : 
        <>
          <TouchableOpacity style={{top: windowHeight*0.01, position: 'absolute'}} onPress={() => setSignIn(!signIn)}>
            <Image source={Sign} style={{ width: 200, position: 'relative', height: 80,}} resizeMode="contain" />
          </TouchableOpacity>
        </>
      }

    </View>
  </ImageBackground >
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    width: "100%",
    height: windowHeight,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  link: {
    color: Theme.colors.primary
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  }
})

export default SignIn