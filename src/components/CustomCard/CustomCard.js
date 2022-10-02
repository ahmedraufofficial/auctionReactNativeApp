import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { View, Alert } from 'react-native';
import Theme from '../Theme';
import moment from 'moment';
import AuctionTimer from '../AuctionTimer';
import { useState, useEffect } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import CustomInput from '../CustomInput';
import CustomBid from '../CustomBid';
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

//const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
const CustomCard = ({data, navigation}) => {
    const {userInfo} = useContext(AuthContext);
    const [auction, setAuction] = useState(data)
    const [bid, setBid] = useState(null);

    const getAuction = async () => {
        fetch(`http://142.93.231.219/auction/${auction?._id}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setAuction(data.response)
        })
    }

    useEffect(() => {
        let auctionInterval = setTimeout(getAuction, 1000);
        return () => {
            clearInterval(auctionInterval);
        }
    }, [auction]);

    const startingTime = moment(auction?.Auction_Start_Date).format("YYYY-MM-DD")+"T"+auction?.Auction_Start_Time+":00"
    const endTime = new Date(startingTime).getTime() + 60000 * parseInt(auction.Total_Bidding_Duration || 10); 
    const [timeLeft, setEndTime] = AuctionTimer(endTime, auction);

    const minutes = Math.floor(timeLeft / 60000) % 60;
    const seconds = Math.floor(timeLeft / 1000) % 60;
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);

    const leftSwipeAuction = () => {
        return (
            <View style={{backgroundColor: Theme.colors.primaryShadow, width: 300, paddingHorizontal: 15, flexDirection: 'row'}}>      
                <View  style={{ flex: 2, marginTop: 20, paddingLeft: 10}}>
                <TextInput 
                  value={bid} 
                  placeholder='CUSTOM BID'
                  placeholderTextColor={Theme.colors.primary} 
                  onChangeText={setBid}
                  mode='outlined'
                  keyboardType='numeric'
                  style={styles.bidText}
                />
                </View> 
                <View  style={{ flex: 1, marginTop: 20, paddingLeft: 10}}>
                <Button style={{ borderColor: Theme.colors.primary, borderWidth: 1 }} onPress={() => {
                !(parseInt(bid) > 0) ? 
                Alert.alert(
                  "Re-check Bid",
                  "Bid value is incorrect or 0",
                  [
                    {text: "Try Again"}
                  ]
                ) 
                :
                parseInt(bid) < parseInt(auction?.Current_Bid) ? 
                Alert.alert(
                  "Re-check Bid",
                  "Bid value is less than the current bid",
                  [
                    {text: "Try Again"}
                  ]
                ) 
                :
                parseInt(bid) < parseInt(auction?.Current_Bid) + parseInt(auction?.Set_Incremental_Price) ? 
                Alert.alert(
                  "Re-check Bid",
                  `Bid value should be greater than ${parseInt(auction?.Current_Bid || 0) + parseInt(auction?.Set_Incremental_Price) - 1}`,
                  [
                    {text: "Try Again"}
                  ]
                ) 
                :
                (parseInt(bid) % parseInt(auction?.Set_Incremental_Price)) != 0 ? 
                Alert.alert(
                  "Re-check Bid",
                  `Bid value should be in multiples of ${parseInt(auction?.Set_Incremental_Price)}`,
                  [
                    {text: "Try Again"}
                  ]
                ) 
                :
                !(auction?.Bids.length > 0) ? 
                Alert.alert(
                  "Are your sure?",
                  `You are about to bid ${bid} ${auction?.Currency}, confirm?`,
                  [
                    {
                      text: "Yes",
                      onPress: () => {
                        CustomBid( auction, setEndTime, parseInt(bid), setAuction, userInfo.username);
                        setBid(null);
                        getAuction();
                      },
                    },
                    {
                      text: "No",
                    },
                  ]
                )
                :
                auction?.Bids[auction?.Bids?.length - 1].user === userInfo.username ? 
                Alert.alert(
                  "Are your sure?",
                  `You are already the highest bidder. Do you still want to bid ${bid} ${auction?.Currency}?`,
                  [
                    {
                      text: "Yes",
                      onPress: () => {
                        CustomBid(auction, setEndTime, parseInt(bid), setAuction, userInfo.username);
                        setBid(null);
                        getAuction();
                      },
                    },
                    {
                      text: "No",
                    },
                  ]
                )
                :
                Alert.alert(
                  "Are your sure?",
                  `You are about to bid ${bid} ${auction?.Currency}, confirm?`,
                  [
                    {
                      text: "Yes",
                      onPress: () => {
                        CustomBid(auction, setEndTime, parseInt(bid), setAuction, userInfo.username);
                        setBid(null);
                        getAuction();
                      },
                    },
                    {
                      text: "No",
                    },
                  ]
                )
              }}>
                <Text style={{borderWidth: 1, borderColor: Theme.colors.table, borderRadius: 10, padding: 10}}>BID</Text>
              </Button> 
{/*                     <Button style={{ borderColor: Theme.colors.primary, borderWidth: 1 }} onPress={() => {
                        CustomBid( auction, setEndTime, parseInt(bid), setAuction, userInfo.username);
                    }}>Bid</Button> */}
                </View>
            </View>
        )
    }

    const rightSwipe = () => {
        return ( 
            <View style={{backgroundColor: Theme.colors.primaryShadow, padding:15}}>       
                <Button style={styles.swipeLeft} onPress={() => navigation.navigate('Vehicle', {id: auction?.Vehicle_Id, auction})}>View</Button>
            </View>
        )
    }

    return (
        <Swipeable
            renderLeftActions={auction?.Status === 'Pre-Negotiation' ? leftSwipeAuction : null}
            renderRightActions={rightSwipe}
        >
            <Card onPress={() => navigation.navigate('Vehicle', {id: auction?.Vehicle_Id, auction})}>
                <View style={styles.head}> 
                    { auction?.Bids.length > 0 ? auction?.Bids[auction?.Bids?.length - 1].user === userInfo.username ? <Text style={styles.bidder}><Ionicons name={'md-caret-up'} color={'green'} size={15} />Bid</Text> : <Text style={styles.bidder}><Ionicons name={'md-caret-down'} color={'red'} size={15} />Bid</Text> : null}
                    { auction.Status === 'Pre-Negotiation' ? <Text style={styles.status}><Ionicons name={'md-ellipse'} color={'green'} size={10} />Active</Text> : <Text style={styles.status}><Ionicons name={'md-ellipse'} color={'red'} size={10} />Completed</Text> }
                    <Card.Cover style={styles.image} source={{ uri: `http://142.93.231.219/images/${auction?.Images[0]}` }} />
                    { auction.Auction_Type === 'Reserved' ? <Text style={{position: 'absolute', fontSize: Theme.fontSize.text, left: 10, top: 10, color: 'white', backgroundColor: 'red', paddingHorizontal: 5, }}>Reserve</Text> : <Text style={{position: 'absolute', fontSize: Theme.fontSize.text, left: 10, top: 10, color: 'white', backgroundColor: 'green', paddingHorizontal: 5, }}>No-Reserve</Text>}
                    <Card.Content style={styles.content}>
                        <Title numberOfLines={1} style={{fontSize: Theme.fontSize.title, marginTop: 10,}}>{auction?.Vehicle_Title}</Title>
                        <Paragraph style={{fontSize: Theme.fontSize.text}}>{`Current Bid: ${auction?.Current_Bid} ${auction?.Currency}`}</Paragraph>
                        { auction.Status === 'Pre-Negotiation' ? 
                            <Paragraph style={{fontSize: Theme.fontSize.text}}>
                                Time Left: 
                                <Paragraph style={{fontSize: Theme.fontSize.text, color: Theme.colors.primary}}> {String(hours).length > 1 ? hours: `0${hours}`} : {String(minutes).length > 1 ? minutes: `0${minutes}`} : {String(seconds).length > 1 ? seconds : `0${seconds}`}</Paragraph>
                            </Paragraph>  :
                            <Paragraph style={{fontSize: Theme.fontSize.text, color: Theme.colors.primary}}>
                                Auction Completed
                            </Paragraph>
                        }
                    </Card.Content> 
                </View>
            </Card>
        </Swipeable>
    )
};


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
    },
    bidText: {
      width: 150, 
      height: 40, 
      borderWidth: 1, 
      borderColor: Theme.colors.primary, 
      color: 'white', 
      paddingHorizontal: 10,
    },
});

//http://142.93.231.219/images/1654809032256-IMG-20220609-WA0006.jpg

export default CustomCard