import { useEffect, useState } from 'react';
import * as React from 'react';

const auctionCheck = async (username, setValue) => {
    const getUser = async () => {
        fetch(`https://backend.carologyauctions.net/accounts/auction/${username}`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          //setValue(data.response)
          data?.auction ? setValue(data?.auction) : setValue('inactive')
        })
      }
    getUser();
}

export default auctionCheck