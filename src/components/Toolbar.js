import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyContext from "../context/MyContext";
import http from "../plugins/http";

const Toolbar = () => {

    const {getUser, setUser} = useContext(MyContext)

    async function loggout(){
        http.get(`loggout`).then(res => {
            if(res.success){
                setUser("")
            }
        })
    }

    return (
        <div className="toolbar d-flex f-column j-btw">
            <div className="d-flex">
                <div className="flex1 d-flex j-center">
                    <Link to="/allauctions">All auctions</Link>
                </div>
                <div className="flex1 d-flex j-ard">
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/create">Create Auction</Link>
                    <Link to="/bidhistory">Bid History</Link>
                    <Link to="/login" onClick={loggout}>Logout</Link>
                </div>
            </div>
            <div className="d-flex j-center">
                {getUser !== null &&
                <div className="profileInfo d-flex j-btw">
                        <div>Logged as: {getUser.username}</div>
                        <div className="d-flex f-column">
                        <div>Bank: {getUser.money} Eur</div>
                        </div>
                </div>}
            </div>
        </div>
    );
};

export default Toolbar;