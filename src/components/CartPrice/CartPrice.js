import { View, Text } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'

const CartPrice = ({id}) => {
    const [negotiation, setNegotiation] = useState()

    const getNegotiation = async () => {
        fetch(`https://backend.carologyauctions.net/negotiation/vehicle/${id}`)
            .then(response => {
            return response.json()
            })
            .then(data => {
                setNegotiation(data.response)
            })
    }

    useEffect(()=>{
        getNegotiation();
    },[])
        
  return (
    <View>
      <Text>Last Bid: {negotiation?.Bids.length > 0 ? negotiation?.Bids[negotiation?.Bids?.length - 1].bid : null} AED</Text>
      <Text>Date: {negotiation?.Bids.length > 0 ? negotiation?.Bids[negotiation?.Bids?.length - 1].date : null} </Text>
      <Text>Time: {negotiation?.Bids.length > 0 ? negotiation?.Bids[negotiation?.Bids?.length - 1].time : null} </Text>
    </View>
  )
}

export default CartPrice