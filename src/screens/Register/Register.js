import { View, StyleSheet, Alert, TouchableOpacity, Text, Dimensions } from 'react-native';
import { useContext, useState } from 'react';
import React from 'react';
import Logo from '../../../assets/images/thumbnail_Logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../Context/AuthContext';
import Theme from '../../components/Theme';

const windowHeight = Dimensions.get('window').height;
const Register = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [number, setNumber] = useState('');
    const {isLoading, register} = useContext(AuthContext);

    return (
        <View style={styles.root}>
            <CustomInput placeholder='Email' value={email} setValue={setEmail} />
            <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} />
            <CustomInput placeholder='Confirm Password' value={confirmPassword} setValue={setConfirmPassword} secureTextEntry={true} />
            <CustomInput placeholder='Username' value={username} setValue={setUsername} />
            <CustomInput placeholder='Number' value={number} setValue={setNumber} />
            <CustomButton text={'Sign In'} onPress={() => {
                !(password === confirmPassword) ? 
                Alert.alert(
                    "Passwords don't match",
                    "Kindly re-check the entered passwords",
                    [
                    {text: "Try Again"}
                    ]
                ) 
                : 
                (email === '' || password === '' || username === '' || number === '') ?
                Alert.alert(
                    "Incomplete fields",
                    "Kindly fill in all fields for registration",
                    [
                    {text: "Try Again"}
                    ]
                ) 
                : 
                register(email, password, number, username);     
            }} />
            <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Text style={{color: Theme.colors.secondary}}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
            <View>
                <CustomButton text={'Back to Home'} onPress={() => navigation.navigate('SignIn')} />
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

export default Register