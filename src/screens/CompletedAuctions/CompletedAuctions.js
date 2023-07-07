import { View, ScrollView, StyleSheet } from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import { Text } from 'react-native-paper';
import CustomNegotiationCard from '../../components/CustomNegotiationCard';
import Theme from '../../components/Theme';

const CompletedAuctions = ({navigation}) => {

  const [negotiations, setNegotiations] = useState([])

  const fetchNegotiations = () => {
    fetch(`https://backend.carologyauctions.net/prenegotiations`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      setNegotiations(data.data.filter((negotiation) => negotiation.Status === 'Post-Negotiation'))
      var count = 0;
      data.data.map((item)=>(
        item.Buy_Now_Price ? null : count = count + 1
      ));
    })
  }


  useEffect(()=>{
      setInterval(fetchNegotiations, 4000)
  },[])

  return (
    <ScrollView>
      <View>
        <Text style={styles.header}>Completed Auctions</Text>
      </View>
      <View style={styles.root}>
        {
          negotiations.length > 0 && (
            negotiations.map((negotiation) => 
                <View style={styles.card} key={negotiation._id}>
                    <CustomNegotiationCard style={styles.card} data={negotiation} navigation={navigation}/>
                </View>
            ).reverse()
          )
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
  header: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal:20,
    color: Theme.colors.primary
  },
  card: {
    marginVertical: 10
  }
})

export default CompletedAuctions