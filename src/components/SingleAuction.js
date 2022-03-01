import React, {useRef, useEffect, useState, useContext} from 'react';
import http from "../plugins/http";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import MyContext from "../context/MyContext";

const SingleAuction = () => {

    const [getItem, setItem] = useState([])
    const [getTime, setTime] = useState([])
    const [getBid, setBid] = useState([])
    const [getMessage, setMessage] = useState()
    let [currentTime, setCurrentTime] = useState()

    const {id} = useParams()
    const {setUser} = useContext(MyContext)

    const nav = useNavigate()
    const bid = useRef()

    useEffect(() => {
        http.get(`openItem/${id}`).then(res => {
            setItem(res.item)
            setBid(res.item.bids)
            setCurrentTime(res.item.time)
        })
    }, [getBid])

    const myInterval = setInterval(setCountDown, 1000)

    function setCountDown() {
        let time = currentTime - Date.now()

        if (time < 0) {
            setTime(["Auction is ended!"])
            clearInterval(myInterval)
            return
        }

        const timeHours = Math.floor(time / 1000 / 60 / 60)
        time -= timeHours * 1000 * 60 * 60

        const timeMinute = Math.floor(time / 1000 / 60)
        time -= timeMinute * 1000 * 60

        const timeSecond = Math.floor(time / 1000)

        setTime(timeHours + ':' + timeMinute + ':' + timeSecond)

        clearInterval(myInterval)
    }

    async function makeBid(id) {
        const bidSum = {
            id,
            bid: Number(bid.current.value)
        }
        http.post(bidSum, "makeBid").then(res => {
            setMessage(res.message)
            if (res.success) {
                setBid([...getBid, res.bids])
                setUser(res.updatedUser)
                // nav("/allauctions")
            }
        })
        console.log(getItem)
        console.log(getBid)
    }


    return (
        <div>
            {getItem &&
                <div className="d-flex productInfo f-column">
                    <div className="d-flex">
                        <div>
                            <img src={getItem.photo} alt=""/>
                        </div>
                        <div className="d-flex j-btw f-column">
                            <div className="d-flex j-btw f-column">
                                <div>
                                    <h3>{getItem.title}</h3>
                                    <h5>Auction made by: {getItem.owner}</h5>
                                    <h5>Current price: {getItem.price} Eur</h5>
                                </div>
                                <div>
                                    <div>{getTime}</div>
                                </div>
                            </div>
                            {getMessage && <div>{getMessage}</div>}
                            <div className="bidField d-flex j-center al-center">
                                <div>
                                    <input type="text" ref={bid} placeholder="Bid sum"/>
                                </div>
                                <div>
                                    <button onClick={() => makeBid(getItem._id)}>Make bid</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex f-column j-center column-reverse">
                        {getBid.map((x, index) => <div key={index} className="bidsCard d-flex j-ard">
                            <div>{x.user}</div>
                            <div>{x.bid}</div>
                            <div>{new Date(x.bidTime).toLocaleTimeString('lt-LT')}</div>
                        </div>)}
                    </div>
                </div>}
        </div>
    );
};

export default SingleAuction;