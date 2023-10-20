import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, Linking, View, Text } from 'react-native';
import * as React from 'react';

const Whatsapp = ({phoneNumber}) => {
    const handleWhatsappClick = (phoneNumber) => {
      // Replace '1234567890' with the actual phone number you want to link to.
      const url = `https://wa.me/${phoneNumber}`;
      Linking.openURL(url);
    };

    const handleTelClick = (phoneNumber) => {
        // Replace '1234567890' with the actual phone number you want to link to.
        const url = `tel:${phoneNumber}`;
        Linking.openURL(url);
      };
  
    return (
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <TouchableOpacity style={styles.squareBlock} onPress={() => {handleWhatsappClick(phoneNumber)}}>
        <Ionicons name={"logo-whatsapp"} color={"#25D366"} size={24} />
        <Text style={styles.text}>Whatsapp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.phoneBlock} onPress={() => {handleTelClick(phoneNumber)}}>
        <Ionicons name={"call"} color={"#23297A"} size={24} />
        <Text style={styles.text}>Call</Text>
      </TouchableOpacity>
      </View>
    );
  };

  const styles = {
    squareBlock: {
      width: '40%', // Customize the width of the square block as needed
      height: 50, // Customize the height of the square block as needed
      backgroundColor: '#075e54', // Customize the background color as needed
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      margin: 10,
    },
    phoneBlock: {
       // Customize the width of the square block as needed
       width: '40%',
       height: 50, // Customize the height of the square block as needed
      backgroundColor: '#0073CF', // Customize the background color as needed
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderRadius: 20,
    },
    text: {
        color: "white"
    }
  };

export default Whatsapp