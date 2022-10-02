import React, {createContext, useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({children, deviceId}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const register = (email, password, number, username) => {
        setIsLoading(true);
        fetch('http://142.93.231.219/register', {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
              username,
              number
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.json())
          .then(json => {
            Alert.alert(json.message);
            setIsLoading(false);
          });
    };

    const login = (email, password) => {
        fetch('http://142.93.231.219/login', {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
                deviceId: deviceId,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(response => response.json())
            .then(json => {
            if(json.token) {
               /*  if(json?.data?.status === 'Inactive') {
                    Alert.alert(
                        "Account Inactive",
                        "Kindly wait for your account to be verified and activated. Thank you!",
                        [
                          {text: "Try Again"}
                        ]
                      );
                } else { */
                    setUserInfo(json.data);
                    AsyncStorage.setItem('userInfo', JSON.stringify(json.data))
                    setIsLoading(false);
                /* } */
            } else {
                Alert.alert(
                    "Incorrect 'Email' or 'Password'",
                    "Kindly re-enter you credentials!",
                    [
                      {text: "Try Again"}
                    ]
                  );
            }
        });
    }

    const logout = () => {
        setIsLoading(true);
        AsyncStorage.removeItem('userInfo');
        setUserInfo();
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            if(userInfo){
                setUserInfo(userInfo);
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        isLoggedIn(); 
    }, [])
    

    return (<AuthContext.Provider value={{isLoading, userInfo, register, login, logout}}>{children}</AuthContext.Provider>);
};