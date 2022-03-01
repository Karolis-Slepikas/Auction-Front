import React, {useEffect, useState} from 'react';
import http from "../plugins/http";

const AuctionHistory = () => {

    const [getAuctions, setAuctions] = useState([])

    useEffect(() => {
        http.get(`auctionhistory`).then(res => {
            console.log(res)
            setAuctions(res.auction)
        })
    }, [])


    return (
        <div className="mar-10">
            <h5 className="d-flex j-center">Your auction history</h5>
            {getAuctions &&
                getAuctions.map((auction, index) =>
                    <div key={index} className="auctionHistory d-flex al-center">
                        <div>
                            <img className="historyImg" src={auction.photo} alt=""/>
                        </div>
                        <div className="mar-10">
                            <h2>{auction.title}</h2>
                            <h6>{auction.owner}</h6>
                            <h5>Current price: {auction.price} Eur</h5>
                            <h5>Auction will end: {new Date(auction.time).toLocaleTimeString('lt-LT')}</h5>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default AuctionHistory;