import { View } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import Theme from '../../components/Theme';
import { ScrollView } from 'react-native';
import CartPrice from '../../components/CartPrice';

const Invoices = ({navigation}) => {
    const [invoices, setInvoices] = useState([])
    const {userInfo} = useContext(AuthContext);

    const fetchInvoices = () => {
        fetch(`http://142.93.231.219/invoices/${userInfo.username}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setInvoices(data.response)
        })
    }

    useEffect(()=>{
        let invoicesInterval = setInterval(fetchInvoices, 3000)

        return () => {
          clearInterval(invoicesInterval); 
        }
    },[])


  return (
    <ScrollView  style={styles.root}>
        {invoices.length > 0 && (
            invoices.map((invoice, index) =>    
                <View key={"Invoice"+invoice._id+index}>
                    <Card onPress={() => navigation.navigate('VehicleCart', {id: invoice?._id})}>
                        <View style={styles.head}> 
                            <Card.Cover style={styles.image} source={{ uri: `http://142.93.231.219/images/${invoice?.Images[0]}` }} />
                            <Card.Content style={styles.content}>
                                <Title style={{fontSize: 15}}>{invoice?.Vehicle_Manufacturer} {invoice?.Model} {invoice?.Manufacturing_Year}</Title>
                                <CartPrice id={invoice?._id} />
                                <Paragraph>{invoice?.Status === "Post-Negotiation" ? "Awaiting confirmation" : invoice?.Status === "Accepted" ? "Accepted" : invoice?.Status === "Cancelled" ? "Cancelled" : null}</Paragraph>
                            </Card.Content> 
                        </View>
                    </Card>
                </View>
            ).reverse()
        )}
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    head: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Theme.colors.primary,
        padding: 10,
    },
    image: {
        flex:1,
        width: 50,
        height: 100,
        borderRadius: 5
    },
    content: {
        flex:1.5,
        width: 80, height: 140,
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    root: {    
        padding: 20,
    },
});

export default Invoices