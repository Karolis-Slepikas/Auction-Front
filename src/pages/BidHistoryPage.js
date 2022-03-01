import React from 'react';
import AuctionHistory from "../components/AuctionHistory";
import BidHistory from "../components/BidHistory";

const BidHistoryPage = () => {

    return (
        <div className="d-flex">
            <div className="flex1">
                <AuctionHistory/>
            </div>
            <div className="flex1">
                <BidHistory/>
            </div>
        </div>
    );
};

export default BidHistoryPage;