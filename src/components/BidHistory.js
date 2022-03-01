import React, {useEffect, useState} from 'react';
import http from "../plugins/http";

const BidHistory = () => {

    const[getBidHistory, setBidHistory] = useState([])

    useEffect(()=> {
        http.get(`bidshistory`).then(res => {
            setBidHistory(res.auction.myBids)
        })
    },[])


    console.log(getBidHistory)

    return (
        <div className="mar-10">
            <h5 className="d-flex j-center">Your bid history</h5>
            {getBidHistory &&
                getBidHistory.map((bid, index) =>
                    <div key={index}>
                        <div className="bidHistory d-flex j-ard al-center">
                            <img src={bid.item.photo} alt=""/>
                            <h6>Bid Sum: {bid.bids.bid}</h6>
                            <h5>When bid was made: {new Date(bid.bids.bidTime).toLocaleTimeString('lt-LT')}</h5>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default BidHistory;