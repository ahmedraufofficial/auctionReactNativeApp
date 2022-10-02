import { StyleSheet, View, Image, Button } from 'react-native';
import { Text } from 'react-native-paper';
import React, {useContext} from 'react';
import { AuthContext } from '../../Context/AuthContext';
import HomeCarousel from '../../components/HomeCarousel';

const Home = ({navigation}) => {
    const {userInfo, logout, isLoading} = useContext(AuthContext);
    return (
        <HomeCarousel navigation={navigation} logout={logout} username={userInfo.username} />
    )
}

const styles = StyleSheet.create({
    root: {    
      padding: 20,
    },

})
  


export default Home