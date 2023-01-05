import { View, ScrollView, StyleSheet } from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import { Text, Divider } from 'react-native-paper';
import CustomCard from '../../components/CustomCard/CustomCard';
import { AuthContext } from '../../Context/AuthContext';
import CustomNegotiationCard from '../../components/CustomNegotiationCard';
import Theme from '../../components/Theme';
import Menu from '../../components/Menu';
const Auctions = ({navigation}) => {
  const {userInfo} = useContext(AuthContext);

  const [auctions, setAuctions] = useState([])
  const [negotiations, setNegotiations] = useState([])

  const fetchNegotiations = () => {
    fetch(`http://142.93.231.219/prenegotiations`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      setNegotiations(data.data)
      var count = 0;
      data.data.map((item)=>(
        item.Buy_Now_Price ? null : count = count + 1
      ));
      //setNegotiationsCount(count);
    })
  }

  const fetchAuctions = () => {
    fetch(`http://142.93.231.219/auctions`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setAuctions(data.data)
      })
}

  useEffect(()=>{
      let negotiationInterval = setInterval(fetchNegotiations, 3000)
      let auctionInterval = setInterval(fetchAuctions, 3000)
      return () => {
        clearInterval(negotiationInterval);
        clearInterval(auctionInterval); 
      }
  },[])

  return (
    <ScrollView>
      <Menu navigation={navigation} />
      <View>
        <Text style={styles.header}>Negotiations</Text>
      </View>
      <View style={styles.root}>
        {
          negotiations.length > 0 && (
            negotiations.map((negotiation) => 
              negotiation.Status !== 'Post-Negotiation' ? 
              <View style={styles.card} key={negotiation._id}>
                <CustomNegotiationCard style={styles.card} data={negotiation} navigation={navigation}/>
              </View>
              :
              null
            )
          )
        }
      </View>
      <View>
        <Divider style={styles.divider} />
      </View>
      <View>
        <Text style={styles.header}>Auctions</Text>
      </View>
      <View style={styles.root}>
        {
          auctions?.map((auction) => (
            auction.Status === 'Pre-Negotiation' ? 
            <View style={styles.card} key={auction._id}>
              <CustomCard data={auction} navigation={navigation}/>
            </View>
            :
            null
          ))
        }
      </View>
      <View style={{marginBottom: 250}}>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {    
    padding: 20,
  },
  divider: {
    backgroundColor: Theme.colors.secondary,
    height: 3
  },
  header: {
    fontSize: 18,
    paddingTop: 30,
    paddingHorizontal:20,
    color: Theme.colors.primary
  },
  card: {
    marginTop: 20
  }
})

export default Auctions