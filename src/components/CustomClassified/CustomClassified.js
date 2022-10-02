import { View, Text } from 'react-native'
import React from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const CustomClassified = ({data, navigation, edit}) => {
  return (
    <Card style={{ width: 170, margin: 10 }}>
        <Card.Title title={data?.Vehicle_Manufacturer} subtitle={data?.Model + " " + data?.Year} />
        <Card.Cover style={{marginHorizontal: 10}} source={{ uri: "http://142.93.231.219/images/"+data?.Images[0] }} />
        <Card.Content>
          <Title>{data?.Price} AED</Title>
          <Paragraph>{data?.Kilometers} Km</Paragraph>
        </Card.Content>
        <Card.Actions>
        <Button onPress={() => navigation.navigate('ClassifiedVehicle', {id: data?._id})}>View</Button>
        {
          edit ? <Button onPress={() => navigation.navigate('EditClassifieds', {id: data?._id})}>Edit</Button> : <></>
        }
        </Card.Actions>
    </Card>
  )
}

export default CustomClassified