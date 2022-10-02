import { StyleSheet } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import Theme from '../Theme';
import { Text } from 'react-native-paper';

const CustomButton = ({ onPress, text }) => {
  return (
    <Button style={styles.container} theme={Theme} dark={Theme.dark} mode='contained' onPress={onPress}>
      <Text>{text}</Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  }
})


export default CustomButton