import { ScrollView, StyleSheet, View, Alert, Animated, TextInput, TouchableOpacity } from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import { Text, Button, ProgressBar } from 'react-native-paper';
import CustomTable from '../../components/CustomTable';
import CustomBlueprint from '../../components/CustomBlueprint';
import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';
import moment from 'moment';
import AuctionTimer from '../../components/AuctionTimer';
import CustomBid from '../../components/CustomBid';
import Theme from '../../components/Theme';
import { AuthContext } from '../../Context/AuthContext';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auctionCheck from '../../components/AuctionCheck.js/AuctionCheck';

const good = ['Original Paint', 'Good']
const average = ['Sticker or Foil', 'Repainted', 'Average']
const damaged = ['Dented and Painted', 'Faded', 'Scratches', 'Dents', 'Rust', 'Hailed', 'Damaged']
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const calcTimeLeft = t => {
  if (!t) return 0;

  const left = t - new Date().getTime();
  if (left < 0) return 0;

  return left;
};




const Vehicle = ({route, navigation}) => {
  const [auction, setAuction] = useState(route.params.auction)
  const [bid, setBid] = useState(null);
  const { id } = route.params;
  const {userInfo} = useContext(AuthContext);
  const [vehicle, setVehicle] = useState(null)
  const [blueprint, setBlueprint] = useState()
  const [layout1, setLayout1] = useState(null)
  const [layout2, setLayout2] = useState(null)
  const [layout3, setLayout3] = useState(null)
  const [layout4, setLayout4] = useState(null)
  const [layout5, setLayout5] = useState(null)
  const [layout6, setLayout6] = useState(null)
  const [userAuction, setUserAuction] = useState('')

  const ref = React.useRef();

  const [end, setEndTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(end));

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hours, setHours] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    auctionCheck(userInfo.username, setUserAuction)
    setTimeLeft(calcTimeLeft(end));
    console.log("Here")
    const timer = setInterval(() => {
      const targetLeft = calcTimeLeft(end);
      setTimeLeft(targetLeft);
      setMinutes(Math.floor(targetLeft / 60000) % 60);
        setSeconds(Math.floor(targetLeft / 1000) % 60);
        setHours(Math.floor((targetLeft / (1000 * 60 * 60)) % 24));
        console.log(targetLeft)
      if (targetLeft === 0) {
        //fetchNegotiations();
        clearInterval(timer);
      }
   
    }, 1000);
      
      return () => clearInterval(timer);
  }, [end])


  const getAuction = async () => {
    console.log("ran after 10 secs")
    fetch(`https://backend.carologyauctions.net/auction/${auction?._id}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      setAuction(data.response)
      const startingTime = moment(data.response?.Auction_Start_Date).format("YYYY-MM-DD")+"T"+data.response?.Auction_Start_Time+":00"
      const endTime = new Date(startingTime).getTime() + 60000 * parseInt(data.response.Total_Bidding_Duration || 10); 
      setEndTime(endTime)
      setPercentage((new Date(startingTime).getTime()/endTime)*100)
    })
  }

  const fetchData = () => {
    fetch(`https://backend.carologyauctions.net/vehicle/${id}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      setVehicle(data.data)
      setBlueprint(1)
    })
  }

  useEffect(() => {
    let auctionInterval = setInterval(() => {
      getAuction();
    }, 1000);
    fetchData();
    return () => {
      clearInterval(auctionInterval);
    }
  }, [auction])
  
  /* const startingTime = moment(auction?.Auction_Start_Date).format("YYYY-MM-DD")+"T"+auction?.Auction_Start_Time+":00";
  const endTime =  new Date(startingTime).getTime() + 60000 * parseInt(auction?.Total_Bidding_Duration || 10); 
  const percentage = (((new Date().getTime())/endTime)*100)
  const [timeLeft, setEndTime] = AuctionTimer(endTime, auction) 

  const minutes = Math.floor(timeLeft / 60000) % 60;
  const seconds = Math.floor(timeLeft / 1000) % 60;
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24); */

  const colorize = (state) => {
    if (good.includes(state)) {
      return 'green'
    } else if (average.includes(state)) {
      return 'yellow'
    } else if (damaged.includes(state)) {
      return 'red'
    }
    return 'white'
  }

  const scrollToComponent = (x) => {
    let scrollers = {
      1: layout1-35,
      2: layout2-35,
      3: layout3-35,
      4: layout4-35,
      5: layout5-35,
      6: layout6-35,
    }
    ref.current.scrollTo({ y: scrollers[x], animated: true });
  }

  const getAuctionAccess = async (username) => {
    const sendReq = await fetch(`https://backend.carologyauctions.net/accounts/auction/request`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username
            })
        })
    console.log(sendReq)
    setUserAuction('pending')
  }

  return (
    <AnimatedScrollView ref={ref} style={styles.root} stickyHeaderIndices={[4]} showsVerticalScrollIndicator={true}>
        <Text>Vehicle</Text>
        <CustomCarousel images={vehicle?.Images} />
        <View style={styles.bidPanel}>
          <View style={{width: '100%', paddingTop: 10, flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontSize: Theme.fontSize.massive, color: Theme.colors.primary}}>
              CURRENT BID 
            </Text>
          </View>
          <View style={{width: '100%', paddingBottom: 10, flexDirection: 'row', justifyContent: 'center'}}>
            {
              auction?.Bids.length > 0 ? auction?.Bids[auction?.Bids?.length - 1].user === userInfo.username ? 
              <Text style={[styles.priceBox,{fontSize: Theme.fontSize.massive, color: 'green'}]}>
                {auction?.Current_Bid} {auction?.Currency}
              </Text>
              : 
              <Text style={[styles.priceBox,{fontSize: Theme.fontSize.massive, color: 'red'}]}>
                {auction?.Current_Bid} {auction?.Currency}
              </Text>
              : 
              <Text style={[styles.priceBox,{fontSize: Theme.fontSize.massive}]}>
                {auction?.Current_Bid} {auction?.Currency}
              </Text>
            }

          </View>
          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
            {auction?.Bids.length > 0 ? auction?.Bids[auction?.Bids?.length - 1].user === userInfo.username ? <Text><Ionicons name={'md-caret-up'} color={'green'} size={20} />Highest bidder</Text> : <Text><Ionicons name={'md-caret-down'} color={'red'} size={20} />You are not the highest bidder</Text> : null}
          </View>
        </View>
        <View style={styles.bidPanel}>
          <ProgressBar progress={percentage > 1 ? 1 : percentage} color={'white'} />
          <View style={styles.timer}>
          { auction.Status === 'Pre-Negotiation' ?
          <> 
            <Text><View style={styles.timeBox}><Text style={styles.timerText}>{String(hours).length > 1 ? hours: `0${hours}`}</Text></View>  <View style={styles.timeBox}><Text style={styles.timerText}>{String(minutes).length > 1 ? minutes: `0${minutes}`}</Text></View>  <View style={styles.timeBox}><Text style={styles.timerText}>{String(seconds).length > 1 ? seconds : `0${seconds}`}</Text></View></Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{padding: 10}}>Hours</Text>
              <Text style={{padding: 10, paddingLeft: 25}}>Minutes</Text>
              <Text style={{padding: 10, paddingLeft: 15}}>Seconds</Text>
            </View>
            {userAuction === 'inactive' ? <View>
                      <Text style={{color: 'red'}}>Your user '{userInfo.username}' currently doesnt have access to auctions.</Text>
                      <TouchableOpacity
                        style={styles.bidButton2}
                        onPress={() => {
                          getAuctionAccess(userInfo?.username);
                        }}
                      >
                        <Text style={{ borderWidth: 1, borderColor: Theme.colors.table, borderRadius: 10, padding: 10 }}>
                          Request Access?
                        </Text>
                      </TouchableOpacity>
                    </View>
              : 
              userAuction === 'pending' ? <View><Text style={{color: 'orange'}}>
                Your request is still pending! We will be contacting you shortly so kindly wait a little longer. Thanks!
              </Text>
              </View>
              :
            <>

            <View style={{width: '100%', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between'}}> 
            <TouchableOpacity style={styles.bidButton} onPress={() => {
              !(auction?.Bids.length > 0) ? 
              Alert.alert(
                "Are your sure?",
                `You are about to top the bid with ${auction?.Set_Incremental_Price} ${auction?.Currency}, confirm?`,
                [
                  {
                    text: "Yes",
                    onPress: () => {
                      CustomBid( auction, setEndTime, (parseInt(auction?.Current_Bid) + parseInt(auction?.Set_Incremental_Price)), setAuction, userInfo.username, `${vehicle?.Vehicle_Manufacturer} ${vehicle?.Model} (${vehicle?.Manufacturing_Year})`);
                      getAuction();
                      setBid(null);
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
                `You are already the highest bidder. Do you still want to top the bid with ${auction?.Set_Incremental_Price} ${auction?.Currency}?`,
                [
                  {
                    text: "Yes",
                    onPress: () => {
                      CustomBid( auction, setEndTime, (parseInt(auction?.Current_Bid) + parseInt(auction?.Set_Incremental_Price)), setAuction, userInfo.username, `${vehicle?.Vehicle_Manufacturer} ${vehicle?.Model} (${vehicle?.Manufacturing_Year})`);
                      getAuction();
                      setBid(null);
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
                `You are about to top the bid with ${auction?.Set_Incremental_Price} ${auction?.Currency}, confirm?`,
                [
                  {
                    text: "Yes",
                    onPress: () => {
                      CustomBid( auction, setEndTime, (parseInt(auction?.Current_Bid) + parseInt(auction?.Set_Incremental_Price)), setAuction, userInfo.username, `${vehicle?.Vehicle_Manufacturer} ${vehicle?.Model} (${vehicle?.Manufacturing_Year})`);
                      getAuction();
                      setBid(null);
                    },
                  },
                  {
                    text: "No",
                  },
                ]
              )
            }}>
              <Text style={{borderWidth: 1, borderColor: Theme.colors.table, borderRadius: 10, padding: 10}}>NEXT BID</Text>
            </TouchableOpacity> 
            <TextInput 
                value={auction?.Set_Incremental_Price} 
                mode='outlined'
                keyboardType='numeric'
                editable={false} 
                selectTextOnFocus={false}
                style={styles.bidText}
              /> 
            </View>
            <View style={{width: '100%', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity style={styles.bidButton} onPress={() => {
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
                        CustomBid(auction, setEndTime, parseInt(bid), setAuction, userInfo.username, `${vehicle?.Vehicle_Manufacturer} ${vehicle?.Model} (${vehicle?.Manufacturing_Year})`);
                        getAuction();
                        setBid(null);
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
                        CustomBid(auction, setEndTime, parseInt(bid), setAuction, userInfo.username, `${vehicle?.Vehicle_Manufacturer} ${vehicle?.Model} (${vehicle?.Manufacturing_Year})`);
                        getAuction();
                        setBid(null);
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
                        CustomBid(auction, setEndTime, parseInt(bid), setAuction, userInfo.username, `${vehicle?.Vehicle_Manufacturer} ${vehicle?.Model} (${vehicle?.Manufacturing_Year})`);
                        getAuction();
                        setBid(null);
                      },
                    },
                    {
                      text: "No",
                    },
                  ]
                )
              }}>
                <Text style={{borderWidth: 1, borderColor: Theme.colors.table, borderRadius: 10, padding: 10}}>CUSTOM BID</Text>
              </TouchableOpacity> 
              <TextInput 
                value={bid} 
                placeholder='BID'
                placeholderTextColor={Theme.colors.primaryShadow} 
                onChangeText={setBid}
                mode='outlined'
                keyboardType='numeric'
                style={styles.bidText}
              />
            </View>
            </>}
          </> :
            <Text style={styles.timerText}>Auction Completed</Text>
          }
          </View>
        </View>
          
        <View style={{marginBottom: 20, borderWidth: 2, borderColor: Theme.colors.primaryShadow}}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <Button mode='contained' onPress={()=>{scrollToComponent(1)}}><Text style={{fontSize: Theme.fontSize.paragraph}}>General</Text></Button>
            <Button mode='contained' onPress={()=>{scrollToComponent(2)}}><Text style={{fontSize: Theme.fontSize.paragraph}}>Vehicle Info</Text></Button>
            <Button mode='contained' onPress={()=>{scrollToComponent(3)}}><Text style={{fontSize: Theme.fontSize.paragraph}}>Exterior</Text></Button>
            <Button mode='contained' onPress={()=>{scrollToComponent(4)}}><Text style={{fontSize: Theme.fontSize.paragraph}}>Interior</Text></Button>
            <Button mode='contained' onPress={()=>{scrollToComponent(5)}}><Text style={{fontSize: Theme.fontSize.paragraph}}>Driving</Text></Button>
            <Button mode='contained' onPress={()=>{scrollToComponent(6)}}><Text style={{fontSize: Theme.fontSize.paragraph}}>Technical</Text></Button>
          </ScrollView>
        </View>

        <View onLayout={event => {setLayout1(event.nativeEvent.layout.y);}}></View>
        <CustomTable header={"General Details"} icon={"protection"} values={[
          {"Vehicle Manufacturer": [vehicle?.Vehicle_Manufacturer]},
          {"Model": [vehicle?.Model]},
          {"Manufacturing Year": [vehicle?.Manufacturing_Year]},
          {"Year Of Registration": [vehicle?.Year_Of_Registration]},
          {"Color": [vehicle?.Color]},
          {"Chassis Number": [vehicle?.Chassis_Number]},
          {"Registration Number": [vehicle?.Registration_Number]},
          {"Engine Number": [vehicle?.Engine_Number]},
          ]} 
          pagination={false} />
        <View onLayout={event => {setLayout2(event.nativeEvent.layout.y);}}></View>
        <CustomTable header={"Vehicle Information"}  icon={"cluster"} values={[
          {"Trim": [vehicle?.Vehicle_Information?.Trim]},
          {"Body Type": [vehicle?.Vehicle_Information?.Body_Type?.Value,vehicle?.Vehicle_Information?.Body_Type?.Comment]},
          {"Options": [vehicle?.Vehicle_Information?.Options?.Value,vehicle?.Vehicle_Information?.Options?.Comment]},
          {"Odometer": [vehicle?.Vehicle_Information?.Odometer]},
          {"Regional Specs": [vehicle?.Vehicle_Information?.Regional_Specs?.Value,vehicle?.Vehicle_Information?.Regional_Specs?.Comment]},
          {"Bank Finance": [vehicle?.Vehicle_Information?.Bank_Finance?.Value,vehicle?.Vehicle_Information?.Bank_Finance?.Comment]},
          {"User Type": [vehicle?.Vehicle_Information?.User_Type?.Value,vehicle?.Vehicle_Information?.User_Type?.Comment]},
          {"Service History": [vehicle?.Vehicle_Information?.Service_History?.Value,vehicle?.Vehicle_Information?.Service_History?.Comment]},
          {"Service Type": [vehicle?.Vehicle_Information?.Service_Type?.Value,vehicle?.Vehicle_Information?.Service_Type?.Comment]},
          {"Number Of Owners": [vehicle?.Vehicle_Information?.Number_Of_Owners?.Value,vehicle?.Vehicle_Information?.Number_Of_Owners?.Comment]},
          {"Number Of Keys": [vehicle?.Vehicle_Information?.Number_Of_Keys?.Value,vehicle?.Vehicle_Information?.Number_Of_Keys?.Comment]},
          {"Number Of Seats": [vehicle?.Vehicle_Information?.Number_Of_Seats?.Value,vehicle?.Vehicle_Information?.Number_Of_Seats?.Comment]},
          {"Paint Condition": [vehicle?.Vehicle_Information?.Paint_Condition?.Value,vehicle?.Vehicle_Information?.Paint_Condition?.Comment]},
          {"Accident History": [vehicle?.Vehicle_Information?.Accident_History?.Value,vehicle?.Vehicle_Information?.Accident_History?.Comment]},
          {"Chassis": [vehicle?.Vehicle_Information?.Chassis?.Value,vehicle?.Vehicle_Information?.Chassis?.Comment]},
          {"Registered In UAE": [vehicle?.Vehicle_Information?.Registered_In_UAE?.Value,vehicle?.Vehicle_Information?.Registered_In_UAE?.Comment]},
          {"Engine Type": [vehicle?.Vehicle_Information?.Engine_Type?.Value,vehicle?.Vehicle_Information?.Engine_Type?.Comment]},
          {"Number Of Cylinders": [vehicle?.Vehicle_Information?.Number_Of_Cylinders?.Value,vehicle?.Vehicle_Information?.Number_Of_Cylinders?.Comment]},       
          {"Engine Capacity": [vehicle?.Vehicle_Information?.Engine_Capacity]},        
          {"Transmission Type": [vehicle?.Vehicle_Information?.Transmission_Type?.Value,vehicle?.Vehicle_Information?.Transmission_Type?.Comment]},
          {"Powertrain": [vehicle?.Vehicle_Information?.Powertrain?.Value,vehicle?.Vehicle_Information?.Powertrain?.Comment]}
        ]}
        pagination={false} />
        <View onLayout={event => {setLayout3(event.nativeEvent.layout.y);}}></View>
        <Text style={{fontSize: Theme.fontSize.tableHeader}}>Exterior Body</Text>
        <CustomTable header={"Left"} icon={"coupeCar2"} values={[
           {"Front Fender": [vehicle?.Car_Exterior?.Left_Side_Body_Details?.Front_Fender?.Condition,vehicle?.Car_Exterior?.Left_Side_Body_Details?.Front_Fender?.Value,vehicle?.Car_Exterior?.Left_Side_Body_Details?.Front_Fender?.Comment]},
           {"Front Door": [vehicle?.Car_Exterior?.Left_Side_Body_Details?.Front_Door?.Condition,vehicle?.Car_Exterior?.Left_Side_Body_Details?.Front_Door?.Value,vehicle?.Car_Exterior?.Left_Side_Body_Details?.Front_Door?.Comment]},
           {"Rear Door": [vehicle?.Car_Exterior?.Left_Side_Body_Details?.Rear_Door?.Condition,vehicle?.Car_Exterior?.Left_Side_Body_Details?.Rear_Door?.Value,vehicle?.Car_Exterior?.Left_Side_Body_Details?.Rear_Door?.Comment]},
           {"Rear Fender": [vehicle?.Car_Exterior?.Left_Side_Body_Details?.Rear_Fender?.Condition,vehicle?.Car_Exterior?.Left_Side_Body_Details?.Rear_Fender?.Value,vehicle?.Car_Exterior?.Left_Side_Body_Details?.Rear_Fender?.Comment]}, 
        ]} pagination={false}/> 
        <CustomTable header={"Right"} icon={"coupeCar"} values={[
          {"Front Fender": [vehicle?.Car_Exterior?.Right_Side_Body_Details?.Front_Fender?.Condition,vehicle?.Car_Exterior?.Right_Side_Body_Details?.Front_Fender?.Value,vehicle?.Car_Exterior?.Right_Side_Body_Details?.Front_Fender?.Comment]},
          {"Front Door": [vehicle?.Car_Exterior?.Right_Side_Body_Details?.Front_Door?.Condition,vehicle?.Car_Exterior?.Right_Side_Body_Details?.Front_Door?.Value,vehicle?.Car_Exterior?.Right_Side_Body_Details?.Front_Door?.Comment]},
          {"Rear Door": [vehicle?.Car_Exterior?.Right_Side_Body_Details?.Rear_Door?.Condition,vehicle?.Car_Exterior?.Right_Side_Body_Details?.Rear_Door?.Value,vehicle?.Car_Exterior?.Right_Side_Body_Details?.Rear_Door?.Comment]},
          {"Rear Fender": [vehicle?.Car_Exterior?.Right_Side_Body_Details?.Rear_Fender?.Condition,vehicle?.Car_Exterior?.Right_Side_Body_Details?.Rear_Fender?.Value,vehicle?.Car_Exterior?.Right_Side_Body_Details?.Rear_Fender?.Comment]},
        ]} pagination={false}/>
        <CustomTable header={"Middle"} icon={"coupeCar3"} values={[
          {"Front Bumper": [vehicle?.Car_Exterior?.Middle_Body_Details?.Front_Bumper?.Condition,vehicle?.Car_Exterior?.Middle_Body_Details?.Front_Bumper?.Value,vehicle?.Car_Exterior?.Middle_Body_Details?.Front_Bumper?.Comment]},
          {"Show Grill": [vehicle?.Car_Exterior?.Middle_Body_Details?.Show_Grill?.Condition,vehicle?.Car_Exterior?.Middle_Body_Details?.Show_Grill?.Value,vehicle?.Car_Exterior?.Middle_Body_Details?.Show_Grill?.Comment]},
          {"Hood": [vehicle?.Car_Exterior?.Middle_Body_Details?.Hood?.Condition,vehicle?.Car_Exterior?.Middle_Body_Details?.Hood?.Value,vehicle?.Car_Exterior?.Middle_Body_Details?.Hood?.Comment]},
          {"Roof": [vehicle?.Car_Exterior?.Middle_Body_Details?.Roof?.Condition,vehicle?.Car_Exterior?.Middle_Body_Details?.Roof?.Value,vehicle?.Car_Exterior?.Middle_Body_Details?.Roof?.Comment]},
          {"Trunk Or Tailgate": [vehicle?.Car_Exterior?.Middle_Body_Details?.Trunk_Or_Tailgate?.Condition,vehicle?.Car_Exterior?.Middle_Body_Details?.Trunk_Or_Tailgate?.Value,vehicle?.Car_Exterior?.Middle_Body_Details?.Trunk_Or_Tailgate?.Comment]},
          {"Rear Bumper": [vehicle?.Car_Exterior?.Middle_Body_Details?.Rear_Bumper?.Condition,vehicle?.Car_Exterior?.Middle_Body_Details?.Rear_Bumper?.Value,vehicle?.Car_Exterior?.Middle_Body_Details?.Rear_Bumper?.Comment]},
        ]} pagination={false}/>
        <CustomTable header={"Glasses"} icon={"windscreen"} values={[
          {"Left Front Window": [vehicle?.Car_Exterior?.Glasses?.Left_Front_Window?.Condition,vehicle?.Car_Exterior?.Glasses?.Left_Front_Window?.Value,vehicle?.Car_Exterior?.Glasses?.Left_Front_Window?.Comment]},     
          {"Left Rear Window": [vehicle?.Car_Exterior?.Glasses?.Left_Rear_Window?.Condition,vehicle?.Car_Exterior?.Glasses?.Left_Rear_Window?.Value,vehicle?.Car_Exterior?.Glasses?.Left_Rear_Window?.Comment]},
          {"Right Front Window": [vehicle?.Car_Exterior?.Glasses?.Right_Front_Window?.Condition,vehicle?.Car_Exterior?.Glasses?.Right_Front_Window?.Value,vehicle?.Car_Exterior?.Glasses?.Right_Front_Window?.Comment]}, 
          {"Right Rear Window": [vehicle?.Car_Exterior?.Glasses?.Right_Rear_Window?.Condition,vehicle?.Car_Exterior?.Glasses?.Right_Rear_Window?.Value,vehicle?.Car_Exterior?.Glasses?.Right_Rear_Window?.Comment]},     
          {"Sun Or Moon Roof": [vehicle?.Car_Exterior?.Glasses?.Sun_Or_Moon_Roof?.Condition,vehicle?.Car_Exterior?.Glasses?.Sun_Or_Moon_Roof?.Value,vehicle?.Car_Exterior?.Glasses?.Sun_Or_Moon_Roof?.Comment]},
          {"Front Windshield": [vehicle?.Car_Exterior?.Glasses?.Front_Windshield?.Condition,vehicle?.Car_Exterior?.Glasses?.Front_Windshield?.Value,vehicle?.Car_Exterior?.Glasses?.Front_Windshield?.Comment]},
          {"Rear Windshield": [vehicle?.Car_Exterior?.Glasses?.Rear_Windshield?.Condition,vehicle?.Car_Exterior?.Glasses?.Rear_Windshield?.Value,vehicle?.Car_Exterior?.Glasses?.Rear_Windshield?.Comment]}, 
        ]} pagination={false}/>
        <CustomTable header={"Light and Mirrors"} icon={'light'} values={[
          {"Left Side View Mirror": [vehicle?.Car_Exterior?.Light_And_Mirrors?.Left_Side_View_Mirror?.Condition,vehicle?.Car_Exterior?.Light_And_Mirrors?.Left_Side_View_Mirror?.Value,vehicle?.Car_Exterior?.Light_And_Mirrors?.Left_Side_View_Mirror?.Comment]},
          {"Right Side View Mirror": [vehicle?.Car_Exterior?.Light_And_Mirrors?.Right_Side_View_Mirror?.Condition,vehicle?.Car_Exterior?.Light_And_Mirrors?.Right_Side_View_Mirror?.Value,vehicle?.Car_Exterior?.Light_And_Mirrors?.Right_Side_View_Mirror?.Comment]},
          {"Left Front Head Light": [vehicle?.Car_Exterior?.Light_And_Mirrors?.Left_Front_Head_Light?.Condition,vehicle?.Car_Exterior?.Light_And_Mirrors?.Left_Front_Head_Light?.Value,vehicle?.Car_Exterior?.Light_And_Mirrors?.Left_Front_Head_Light?.Comment]},
          {"Right Front Head Light": [vehicle?.Car_Exterior?.Light_And_Mirrors?.Right_Front_Head_Light?.Condition,vehicle?.Car_Exterior?.Light_And_Mirrors?.Right_Front_Head_Light?.Value,vehicle?.Car_Exterior?.Light_And_Mirrors?.Right_Front_Head_Light?.Comment]},
          {"Left Tail Light": [vehicle?.Car_Exterior?.Light_And_Mirrors?.Left_Tail_Light?.Condition,vehicle?.Car_Exterior?.Light_And_Mirrors?.Left_Tail_Light?.Value,vehicle?.Car_Exterior?.Light_And_Mirrors?.Left_Tail_Light?.Comment]},
          {"Right Tail Light": [vehicle?.Car_Exterior?.Light_And_Mirrors?.Right_Tail_Light?.Condition,vehicle?.Car_Exterior?.Light_And_Mirrors?.Right_Tail_Light?.Value,vehicle?.Car_Exterior?.Light_And_Mirrors?.Right_Tail_Light?.Comment]},          
        ]} pagination={false}/>
        <CustomTable header={"Rims"} icon={"rim"} values={[
          {"Front Left": [vehicle?.Car_Exterior?.Rims?.Front_Left?.Condition,vehicle?.Car_Exterior?.Rims?.Front_Left?.Value,vehicle?.Car_Exterior?.Rims?.Front_Left?.Comment]},
          {"Front Right": [vehicle?.Car_Exterior?.Rims?.Front_Right?.Condition,vehicle?.Car_Exterior?.Rims?.Front_Right?.Value,vehicle?.Car_Exterior?.Rims?.Front_Right?.Comment]},
          {"Rim Type": [vehicle?.Car_Exterior?.Rims?.Rim_Type?.Value,vehicle?.Car_Exterior?.Rims?.Rim_Type?.Comment]},
          {"Rear Left": [vehicle?.Car_Exterior?.Rims?.Rear_Left?.Condition,vehicle?.Car_Exterior?.Rims?.Rear_Left?.Value,vehicle?.Car_Exterior?.Rims?.Rear_Left?.Comment]},
          {"Rear Right": [vehicle?.Car_Exterior?.Rims?.Rear_Right?.Condition,vehicle?.Car_Exterior?.Rims?.Rear_Right?.Value,vehicle?.Car_Exterior?.Rims?.Rear_Right?.Comment]},
        ]} pagination={false}/>
        <CustomTable header={"Tyres"} icon={"tyres"} values={[
          {"Front Left": [vehicle?.Car_Exterior?.Tyres?.Front_Left?.Condition,vehicle?.Car_Exterior?.Tyres?.Front_Left?.Value,vehicle?.Car_Exterior?.Tyres?.Front_Left?.Comment]},
          {"Front Right": [vehicle?.Car_Exterior?.Tyres?.Front_Right?.Condition,vehicle?.Car_Exterior?.Tyres?.Front_Right?.Value,vehicle?.Car_Exterior?.Tyres?.Front_Right?.Comment]},
          {"Rear Left": [vehicle?.Car_Exterior?.Tyres?.Rear_Left?.Condition,vehicle?.Car_Exterior?.Tyres?.Rear_Left?.Value,vehicle?.Car_Exterior?.Tyres?.Rear_Left?.Comment]},
          {"Rear Right": [vehicle?.Car_Exterior?.Tyres?.Rear_Right?.Condition,vehicle?.Car_Exterior?.Tyres?.Rear_Right?.Value,vehicle?.Car_Exterior?.Tyres?.Rear_Right?.Comment]},
        ]} pagination={false}/>
        <View onLayout={event => {setLayout4(event.nativeEvent.layout.y);}}></View>
        <CustomTable header={"Interior Details"} icon={"carSeat"} values={[
          {"Seat Type": [vehicle?.Car_Interior?.Seat_Type?.Value,vehicle?.Car_Interior?.Seat_Type?.Comment]},
          {"Seats Condition": [vehicle?.Car_Interior?.Seats_Condition?.Condition,vehicle?.Car_Interior?.Seats_Condition?.Value,vehicle?.Car_Interior?.Seats_Condition?.Comment]},
          {"Seat Belt": [vehicle?.Car_Interior?.Seat_Belt?.Condition,vehicle?.Car_Interior?.Seat_Belt?.Value,vehicle?.Car_Interior?.Seat_Belt?.Comment]},
          {"Sun Or Moon Roof": [vehicle?.Car_Interior?.Sun_Or_Moon_Roof?.Condition,vehicle?.Car_Interior?.Sun_Or_Moon_Roof?.Value,vehicle?.Car_Interior?.Sun_Or_Moon_Roof?.Comment]},
          {"Convertible": [vehicle?.Car_Interior?.Convertible?.Condition,vehicle?.Car_Interior?.Convertible?.Value,vehicle?.Car_Interior?.Convertible?.Comment]},
          {"Steering Wheel": [vehicle?.Car_Interior?.Steering_Wheel?.Condition,vehicle?.Car_Interior?.Steering_Wheel?.Value,vehicle?.Car_Interior?.Steering_Wheel?.Comment]},
          {"Horn": [vehicle?.Car_Interior?.Horn?.Condition,vehicle?.Car_Interior?.Horn?.Value,vehicle?.Car_Interior?.Horn?.Comment]}, 
          {"Dashboard": [vehicle?.Car_Interior?.Dashboard?.Condition,vehicle?.Car_Interior?.Dashboard?.Value,vehicle?.Car_Interior?.Dashboard?.Comment]},
          {"AC Vents": [vehicle?.Car_Interior?.AC_Vents?.Condition,vehicle?.Car_Interior?.AC_Vents?.Value,vehicle?.Car_Interior?.AC_Vents?.Comment]},
          {"Gear knob": [vehicle?.Car_Interior?.Gear_knob?.Condition,vehicle?.Car_Interior?.Gear_knob?.Value,vehicle?.Car_Interior?.Gear_knob?.Comment]},
          {"Glovebox": [vehicle?.Car_Interior?.Glovebox?.Condition,vehicle?.Car_Interior?.Glovebox?.Value,vehicle?.Car_Interior?.Glovebox?.Comment]},
          {"Console Box": [vehicle?.Car_Interior?.Console_Box?.Condition,vehicle?.Car_Interior?.Console_Box?.Value,vehicle?.Car_Interior?.Console_Box?.Comment]},
          {"Roof Liner": [vehicle?.Car_Interior?.Roof_Liner?.Condition,vehicle?.Car_Interior?.Roof_Liner?.Value,vehicle?.Car_Interior?.Roof_Liner?.Comment]},
          {"Front Left Door": [vehicle?.Car_Interior?.Door_Trim_Or_Switches?.Front_Left_Door?.Condition,vehicle?.Car_Interior?.Door_Trim_Or_Switches?.Front_Left_Door?.Value,vehicle?.Car_Interior?.Door_Trim_Or_Switches?.Front_Left_Door?.Comment]},
          {"Front Right Door": [vehicle?.Car_Interior?.Door_Trim_Or_Switches?.Front_Right_Door?.Condition,vehicle?.Car_Interior?.Door_Trim_Or_Switches?.Front_Right_Door?.Value,vehicle?.Car_Interior?.Door_Trim_Or_Switches?.Front_Right_Door?.Comment]},
          {"Rear Left Door": [vehicle?.Car_Interior?.Door_Trim_Or_Switches?.Rear_Left_Door?.Condition,vehicle?.Car_Interior?.Door_Trim_Or_Switches?.Rear_Left_Door?.Value,vehicle?.Car_Interior?.Door_Trim_Or_Switches?.Rear_Left_Door?.Comment]},
          {"Rear Right Door": [vehicle?.Car_Interior?.Door_Trim_Or_Switches?.Rear_Right_Door?.Condition,vehicle?.Car_Interior?.Door_Trim_Or_Switches?.Rear_Right_Door?.Value,vehicle?.Car_Interior?.Door_Trim_Or_Switches?.Rear_Right_Door?.Comment]},
          {"Cluster": [vehicle?.Car_Interior?.Cluster_And_Warning_Lights?.Cluster?.Condition,vehicle?.Car_Interior?.Cluster_And_Warning_Lights?.Cluster?.Value,vehicle?.Car_Interior?.Cluster_And_Warning_Lights?.Cluster?.Comment]}, 
          {"Warning Lights": [vehicle?.Car_Interior?.Cluster_And_Warning_Lights?.Warning_Lights?.Condition,vehicle?.Car_Interior?.Cluster_And_Warning_Lights?.Warning_Lights?.Value,vehicle?.Car_Interior?.Cluster_And_Warning_Lights?.Warning_Lights?.Comment]},
        ]}
        pagination={false}/>
        <View onLayout={event => {setLayout5(event.nativeEvent.layout.y);}}></View>
        <CustomTable header={"Driving Conditions"} icon={"generalDrivingCondition"} values={[
          {"Air Conditioning": [vehicle?.General_Driving_Condition?.Air_Conditioning?.Condition,vehicle?.General_Driving_Condition?.Air_Conditioning?.Value,vehicle?.General_Driving_Condition?.Air_Conditioning?.Comment]},
          {"Engine": [vehicle?.General_Driving_Condition?.Engine?.Condition,vehicle?.General_Driving_Condition?.Engine?.Value,vehicle?.General_Driving_Condition?.Engine?.Comment]},
          {"Transmission": [vehicle?.General_Driving_Condition?.Transmission?.Condition,vehicle?.General_Driving_Condition?.Transmission?.Value,vehicle?.General_Driving_Condition?.Transmission?.Comment]},
          {"Turbo Or Supercharger": [vehicle?.General_Driving_Condition?.Turbo_Or_Supercharger?.Condition,vehicle?.General_Driving_Condition?.Turbo_Or_Supercharger?.Value,vehicle?.General_Driving_Condition?.Turbo_Or_Supercharger?.Comment]},
          {"Steering": [vehicle?.General_Driving_Condition?.Steering?.Condition,vehicle?.General_Driving_Condition?.Steering?.Value,vehicle?.General_Driving_Condition?.Steering?.Comment]},
          {"Braking System": [vehicle?.General_Driving_Condition?.Braking_System?.Condition,vehicle?.General_Driving_Condition?.Braking_System?.Value,vehicle?.General_Driving_Condition?.Braking_System?.Comment]},
          {"Shock Absorbers": [vehicle?.General_Driving_Condition?.Shock_Absorbers?.Condition,vehicle?.General_Driving_Condition?.Shock_Absorbers?.Value,vehicle?.General_Driving_Condition?.Shock_Absorbers?.Comment]},
          {"Rubber Or Bushes": [vehicle?.General_Driving_Condition?.Rubber_Or_Bushes?.Condition,vehicle?.General_Driving_Condition?.Rubber_Or_Bushes?.Value,vehicle?.General_Driving_Condition?.Rubber_Or_Bushes?.Comment]},
          {"Drive Axles": [vehicle?.General_Driving_Condition?.Drive_Axles?.Condition,vehicle?.General_Driving_Condition?.Drive_Axles?.Value,vehicle?.General_Driving_Condition?.Drive_Axles?.Comment]},
          {"Front Sensor": [vehicle?.General_Driving_Condition?.Drive_Assist?.Front_Sensor?.Value,vehicle?.General_Driving_Condition?.Drive_Assist?.Front_Sensor?.Comment]},
          {"Distronic": [vehicle?.General_Driving_Condition?.Drive_Assist?.Distronic?.Value,vehicle?.General_Driving_Condition?.Drive_Assist?.Distronic?.Comment]},
          {"Lane Change": [vehicle?.General_Driving_Condition?.Drive_Assist?.Lane_Change?.Value,vehicle?.General_Driving_Condition?.Drive_Assist?.Lane_Change?.Comment]},
          {"Blindspot": [vehicle?.General_Driving_Condition?.Drive_Assist?.Blindspot?.Value,vehicle?.General_Driving_Condition?.Drive_Assist?.Blindspot?.Comment]},
          {"Front Sensor": [vehicle?.General_Driving_Condition?.Park_Assist?.Front_Sensor?.Value,vehicle?.General_Driving_Condition?.Park_Assist?.Front_Sensor?.Comment]},
          {"Front Camera": [vehicle?.General_Driving_Condition?.Park_Assist?.Front_Camera?.Value,vehicle?.General_Driving_Condition?.Park_Assist?.Front_Camera?.Comment]},
          {"Rear Sensor": [vehicle?.General_Driving_Condition?.Park_Assist?.Rear_Sensor?.Value,vehicle?.General_Driving_Condition?.Park_Assist?.Rear_Sensor?.Comment]},
          {"Rear Camera": [vehicle?.General_Driving_Condition?.Park_Assist?.Rear_Camera?.Value,vehicle?.General_Driving_Condition?.Park_Assist?.Rear_Camera?.Comment]},
          {"Left Camera": [vehicle?.General_Driving_Condition?.Park_Assist?.Left_Camera?.Value,vehicle?.General_Driving_Condition?.Park_Assist?.Left_Camera?.Comment]},
          {"Right Camera": [vehicle?.General_Driving_Condition?.Park_Assist?.Right_Camera?.Value,vehicle?.General_Driving_Condition?.Park_Assist?.Right_Camera?.Comment]},
        ]} 
        pagination={false}/>
        <View onLayout={event => {setLayout6(event.nativeEvent.layout.y);}}></View>
        <CustomTable header={"Technical Conditions"} icon={"warningLights"} values={[
          {"Engine Condition": [vehicle?.Technical_Condition?.Engine_Condition?.Condition,vehicle?.Technical_Condition?.Engine_Condition?.Value,vehicle?.Technical_Condition?.Engine_Condition?.Comment]},
          {"Transmission Condition": [vehicle?.Technical_Condition?.Transmission_Condition?.Condition,vehicle?.Technical_Condition?.Transmission_Condition?.Value,vehicle?.Technical_Condition?.Transmission_Condition?.Comment]},
          {"Sign Of Leakages": [vehicle?.Technical_Condition?.Sign_Of_Leakages?.Condition,vehicle?.Technical_Condition?.Sign_Of_Leakages?.Value,vehicle?.Technical_Condition?.Sign_Of_Leakages?.Comment]},
          {"Exhaust": [vehicle?.Technical_Condition?.Exhaust?.Condition,vehicle?.Technical_Condition?.Exhaust?.Value,vehicle?.Technical_Condition?.Exhaust?.Comment]},
        ]} 
        pagination={false}/>

      <Text style={{fontSize: Theme.fontSize.tableHeader}}>Blueprint</Text> 
      <View style={{marginTop: 20}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{fontSize: Theme.fontSize.text}}><Entypo name={"controller-stop"} color={"green"} size={24} />Original Paint</Text>
          <Text style={{fontSize: Theme.fontSize.text, paddingRight: 29}}><Entypo name={"controller-stop"} color={"white"} size={24} />Not Applicable</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{fontSize: Theme.fontSize.text}}><Entypo name={"controller-stop"} color={"orange"} size={24} />Repainted</Text>
          <Text style={{fontSize: Theme.fontSize.text}}><Entypo  name={"controller-stop"} color={"red"} size={24} />Repair and Repainted</Text>
        </View>
      </View>
      { blueprint ? 
        <CustomBlueprint 
          colors={{
            "FLD": colorize(vehicle?.Car_Exterior?.Left_Side_Body_Details?.Front_Fender?.Condition),
            "BLD": colorize(vehicle?.Car_Exterior?.Left_Side_Body_Details?.Rear_Door?.Condition),
            "FL": colorize(vehicle?.Car_Exterior?.Left_Side_Body_Details?.Front_Fender?.Condition),
            "BL": colorize(vehicle?.Car_Exterior?.Left_Side_Body_Details?.Rear_Fender?.Condition),
            "FRD": colorize(vehicle?.Car_Exterior?.Right_Side_Body_Details?.Front_Fender?.Condition),
            "BRD": colorize(vehicle?.Car_Exterior?.Right_Side_Body_Details?.Rear_Door?.Condition),
            "FR": colorize(vehicle?.Car_Exterior?.Right_Side_Body_Details?.Front_Fender?.Condition),
            "BR": colorize(vehicle?.Car_Exterior?.Right_Side_Body_Details?.Rear_Fender?.Condition),
            "F": colorize(vehicle?.Car_Exterior?.Middle_Body_Details?.Front_Bumper?.Condition),
            "R": colorize(vehicle?.Car_Exterior?.Middle_Body_Details?.Rear_Bumper?.Condition),
            "FB": colorize(vehicle?.Car_Exterior?.Middle_Body_Details?.Hood?.Condition),
            "M": colorize(vehicle?.Car_Exterior?.Middle_Body_Details?.Roof?.Condition),
            "RB": colorize(vehicle?.Car_Exterior?.Middle_Body_Details?.Trunk_Or_Tailgate?.Condition)
          }}
        />
        : <></>}
    </AnimatedScrollView>
  )
}

const styles = StyleSheet.create({
    root: {    
      padding: 20,
    },
    timer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20
    },
    timerText: {
      fontSize: 38
    },
    buyNow: {
      fontSize: 25,
      textAlign: 'center',
      paddingVertical: 10
    },
    bidPanel: {
      padding: 10,
      backgroundColor: Theme.colors.primaryShadow,
      marginBottom: 20,
      marginTop: 20,
      borderRadius: 5
    },
    navHead: {
      position: 'relative'
    },
    navHeaderFixed: {
      position: 'absolute', 
      top: 0
    },
    bidText: {
      width: 110, 
      height: 50, 
      borderWidth: 1, 
      borderColor: Theme.colors.primary, 
      paddingHorizontal: 10,
    },
    bidButton: { 
      borderWidth: 1, 
      height: 50, 
      borderColor: Theme.colors.primary, 
      width: 140,
      backgroundColor: Theme.colors.primary, 
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    timeBox: {
      backgroundColor: Theme.colors.primaryShadow,
      borderWidth: 2,
      borderColor: Theme.colors.primary,
      padding: 10,
      borderRadius: 10
    },
    priceBox: {
      borderWidth: 2,
      borderColor: Theme.colors.primary,
      padding: 10,
      borderRadius: 10,
      marginTop: 10
    },
    bidButton2: { 
      borderWidth: 1, 
      maxHeight: 50, 
      borderColor: Theme.colors.primary, 
      width: 140,
      backgroundColor: Theme.colors.primary, 
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
  })
  

export default Vehicle