import moment from 'moment';

async function CustomBid(auction, setEndTime, bid, setAuction, username, title) {
    const incrementalBid = parseInt(bid);
    const bidDetails = {user: username, type: "Auction", bid: incrementalBid.toString(), time: moment().format("HH:mm:ss"), date: moment().format("YYYY-MM-DD")}
    const newBid = auction?.Bids;

    const deviceusername = await fetch(`https://backend.carologyauctions.net/deviceusername`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: username
        })
    })
    const fbdata = await deviceusername.json()
    if (fbdata) {
        await fetch(`https://backend.carologyauctions.net/p2p`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: `You are now the highest bidder for ${title}`,
                text: 'Highest Bidder',
                id: fbdata.deviceId
            })
        })
    } else {
        console.log("Something went wrong")
    }
    if (newBid && newBid.length > 0) {
        var lastBidder = newBid[newBid.length - 1].user
        const deviceusername2 = await fetch(`https://backend.carologyauctions.net/deviceusername`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: lastBidder
            })
        })
        const fbdata2 = await deviceusername2.json()
        console.log(fbdata2)
        if (fbdata2) {
            await fetch(`https://backend.carologyauctions.net/p2p`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: `You have been outbidded for ${title}`,
                    text: 'Highest Bidder',
                    id: fbdata2.deviceId
                })
            })
        } else {
            console.log("Something went wrong")
        }
    }

    newBid.push(bidDetails)
    const response = await fetch(`https://backend.carologyauctions.net/edit/auction/${auction._id}`, {
                                    method: 'PUT',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({
                                    Current_Bid: incrementalBid.toString(),
                                    Bids: newBid
                                    })
                                });
    const data = await response.json();
    if (data.status === "200") {
        if (JSON.parse(data?.response?.Allow_Auction_Sniping) && minutes === 0 && seconds > 0)
        {
        let newStartingTime = moment(data?.response?.Auction_Start_Date).format("YYYY-MM-DD")+" "+data?.response?.Auction_Start_Time+":00"
        let newEndTime = new Date(newStartingTime).getTime() + 60000 * (parseInt(data?.response.Total_Bidding_Duration || 10) + parseInt(auction?.Incremental_Time)); 
        setEndTime(newEndTime);
        }
        setAuction(data.response);
    } else if (data.status === '500') {
        console.log(data.error)
    }
}

export default CustomBid