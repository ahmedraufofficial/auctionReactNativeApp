import { View, StyleSheet, Alert, TouchableOpacity, Text, Dimensions } from 'react-native';
import { useContext, useState } from 'react';
import React from 'react';
import Logo from '../../../assets/images/thumbnail_Logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../Context/AuthContext';
import Theme from '../../components/Theme';

const windowHeight = Dimensions.get('window').height;
const ChangePassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [postOtp, setPostOtp] = useState(false);
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const {isLoading, register} = useContext(AuthContext);

    return (
        <View style={styles.root}>
            <View>
            {
                postOtp ? <Text>Add OTP and new password</Text>: <Text>Add your email address</Text>
            }
            </View>
            <CustomInput placeholder='Email' value={email} setValue={setEmail} />
            {
                !postOtp ? 
                <CustomButton text={'Get OTP'} onPress={async () => {
                    if (email === '') 
                    {Alert.alert("Fill in the 'Email' field")} else {
                    const response = await fetch(`http://142.93.231.219/forgot-password`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            email
                        })
                    })
                    const data = await response.json()
                    if (data) {
                        if (data.status === '200')
                        {
                            Alert.alert("OTP sent. Kindly check your email.")
                            setPostOtp(!postOtp)
                        } else if (data.status === 'error') {
                            Alert.alert(data.error)
                        }
                    }
                }}} />
                : <></>    
            }
            {
                postOtp ? <>
                    <CustomInput placeholder='New Password' value={password} setValue={setPassword} secureTextEntry={true} />
                    <CustomInput placeholder='OTP' value={otp} setValue={setOtp} secureTextEntry={true} />
                    <CustomButton text={'Reset Password'} onPress={async () => {
                    if (email === '' || otp === '' || password === '') 
                    {Alert.alert("Fill in the missing fields")} else {
                    const response = await fetch(`http://142.93.231.219/reset-password`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            email,
                            otp,
                            password
                        })
                    })
                    const data = await response.json()
                    if (data) {
                        if (data.status === '200')
                        {
                            Alert.alert(
                                "Password successfully reset",
                                "Go back to 'Sign In' screen",
                                [
                                  {
                                    text: "Yes",
                                    onPress: () => {
                                        navigation.navigate('SignIn')
                                    },
                                  }
                                ]
                              )
                        } else if (data.status === 'error') {
                            Alert.alert(data.error)
                        }
                    }
                }}} />
                </> : <></>

            }
            <View>
                <CustomButton text={'Profile'} onPress={() => navigation.navigate('Profile')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'white',
      width: "100%",
      height: windowHeight
    },
    logo: {
      width: '70%',
      maxWidth: 300,
      maxHeight: 200,
    },
    link: {
        color: Theme.colors.primary
    }
})

export default ChangePassword