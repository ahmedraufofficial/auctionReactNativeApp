import { View, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Theme from '../Theme'
import { TextInput } from 'react-native-paper';
import { useTogglePasswordVisibility } from './useTogglePasswordVisibility';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomInput = ({value, setValue, placeholder, secureTextEntry, width}) => {
  
  const styles = StyleSheet.create({
    container: {
      width: width ? width : '100%',
      marginVertical: 5,
    }
  })

  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

  return (
    <View style={styles.container}>
      {/* <Ionicons name={iconName} color={color} size={24} /> */}
      { 
        secureTextEntry ? 
        <View style={{position: 'relative', marginBottom:70}} >
          <TextInput 
            value={value} 
            label={placeholder} 
            style={{position: 'absolute', width: '100%', zIndex: 1}} 
            onChangeText={setValue}
            secureTextEntry={passwordVisibility}
            mode='outlined'
            theme={{colors: {placeholder: Theme.colors.secondary}}}
          /> 
          <Pressable style={{position: 'absolute', right: 10, top: 22, zIndex: 4}} onPress={handlePasswordVisibility}>
            <Ionicons name={rightIcon} size={22} color="#232323" />
          </Pressable>
        </View>:
          <TextInput 
            value={value} 
            label={placeholder} 
            style={styles.input} 
            onChangeText={setValue}
            mode='outlined'
            theme={{colors: {placeholder: Theme.colors.secondary}}}
        />
      }
    </View>
  )
}


export default CustomInput