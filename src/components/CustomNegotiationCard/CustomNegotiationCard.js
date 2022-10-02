import React from 'react';
import { Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { View, Pressable } from 'react-native';
import Theme from '../Theme';
import moment from 'moment';
import { useState, useEffect, useContext } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import CustomInput from '../CustomInput';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NegotiationTimer from '../NegotiationTimer';
import { AuthContext } from '../../Context/AuthContext';

const CustomNegotiationCard = ({data, navigation}) => {
    const [negotiation, setNegotiation] = useState(data)
    const [bid, setBid] = useState(null);
    const {userInfo} = useContext(AuthContext);

    const getNegotiation = async () => {
        fetch(`http://142.93.231.219/negotiation/${negotiation?._id}`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setNegotiation(data.response)
          })
    }

    useEffect(() => {
        setTimeout(getNegotiation, 1000);
    }, [negotiation]);

    const rightSwipe = () => {
        return ( 
            <View style={{backgroundColor: Theme.colors.primaryShadow, padding:15}}>       
                <Button style={styles.swipeLeft} onPress={() => navigation.navigate('VehicleNegotiation', {id: negotiation?.Vehicle_Id, negotiation})}>View</Button>
            </View>
        )
    }

    const startingTime = moment(negotiation?.Negotiation_Start_Date).format("YYYY-MM-DDTHH:mm:ss");
    const endTime = new Date(startingTime).getTime() + 60000 * parseInt(negotiation?.Negotiation_Duration || 10); 
    const [timeLeft, setEndTime] = NegotiationTimer(endTime);
    
    const minutes = negotiation?.Buy_Now_Price ? Math.floor(timeLeft / 60000) % 60 : "-";
    const seconds = negotiation?.Buy_Now_Price ? Math.floor(timeLeft / 1000) % 60 : "-";
    const hours = negotiation?.Buy_Now_Price ? Math.floor((timeLeft / (1000 * 60 * 60)) % 24) : "-";

    return (
        <Swipeable renderRightActions={rightSwipe}>
            <View>
                <Card onPress={() => navigation.navigate('VehicleNegotiation', {id: negotiation?.Vehicle_Id, negotiation})}>
                    <View style={styles.head}> 
                        { negotiation?.Bids.length > 0 ? negotiation?.Bids[negotiation?.Bids?.length - 1].user === userInfo.username ? <Text style={styles.bidder}><Ionicons name={'md-caret-up'} color={'green'} size={15} />Bid</Text> : <Text style={styles.bidder}><Ionicons name={'md-caret-down'} color={'red'} size={15} />Bid</Text> : null }
                        { negotiation?.Status === "Post-Negotiation" ? <Text style={styles.status}><Ionicons name={'md-ellipse'} color={'red'} size={10} />Completed</Text> : negotiation?.Buy_Now_Price ? <Text style={styles.status}><Ionicons name={'md-ellipse'} color={'green'} size={10} />Active</Text> : <Text style={styles.status}><Ionicons name={'md-ellipse'} color={'orange'} size={10} />Negotiating with owner...</Text> }
                        <Card.Cover style={styles.image} source={{ uri: `http://142.93.231.219/images/${negotiation?.Images[0]}` }} />
                        <Card.Content style={styles.content}>
                            <Title numberOfLines={1} style={{fontSize: Theme.fontSize.title, marginTop: 5}}>{negotiation?.Vehicle_Title}</Title>
                            <Paragraph style={{fontSize: Theme.fontSize.text}}>
                                Current Bid
                                <Paragraph style={{fontSize: Theme.fontSize.text}}> {`${negotiation?.Current_Bid} ${negotiation?.Currency}`}</Paragraph>
                            </Paragraph>
                            <Paragraph>
                            { negotiation?.Status === "Post-Negotiation" ? 
                                <Paragraph style={{fontSize: Theme.fontSize.text, color: Theme.colors.primary}}>Negotiation Completed</Paragraph> : 
                                negotiation?.Buy_Now_Price ? 
                                <>
                                    Buy Now <Paragraph style={{fontSize: Theme.fontSize.text, color: Theme.colors.primary}}> {`${negotiation?.Buy_Now_Price} ${negotiation?.Currency}`}</Paragraph>
                                </> 
                                :
                                null
                            }
                            </Paragraph>
                            { negotiation?.Status === "Post-Negotiation" ? null : <Paragraph style={{fontSize: Theme.fontSize.text}}>Time Left:<Paragraph style={{fontSize: Theme.fontSize.text, color: Theme.colors.primary}}> {String(hours).length > 1 ? hours: `0${hours}`} : {String(minutes).length > 1 ? minutes: `0${minutes}`} : {String(seconds).length > 1 ? seconds : `0${seconds}`}</Paragraph></Paragraph>}
                        </Card.Content> 
                    </View>
                </Card>
            </View>
        </Swipeable>
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
        width: 80, height: 80,
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
    swipeLeft: {
        marginTop: 25,
        borderColor: Theme.colors.primary,
        borderWidth: 1
    },
    status: {
        position: 'absolute',
        right: 0,
        paddingBottom: 2,
        paddingRight: 4
    },
    bidder: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        paddingBottom: 2,
        paddingRight: 4 
    }
});


export default CustomNegotiationCard