import moment from 'moment';

async function CustomBid(auction, setEndTime, bid, setAuction, username) {
    const incrementalBid = parseInt(bid);
    const bidDetails = {user: username, type: "Auction", bid: incrementalBid.toString(), time: moment().format("HH:mm:ss"), date: moment().format("YYYY-MM-DD")}
    const newBid = auction?.Bids;
    newBid.push(bidDetails)
    const response = await fetch(`http://142.93.231.219/edit/auction/${auction._id}`, {
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