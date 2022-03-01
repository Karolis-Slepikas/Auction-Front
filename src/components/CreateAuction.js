import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import http from "../plugins/http"

const CreateAuction = () => {

    const nav = useNavigate()
    const [getValue, setValue] = useState("")

    const ref = {
        photo: useRef(),
        title: useRef(),
        price: useRef(),
        time: getValue
    }

    console.log(getValue)

    function createAuction() {
        const item = {
            photo: ref.photo.current.value,
            title: ref.title.current.value,
            price: Number(ref.price.current.value),
            time: ref.time
        }
        http.post(item, "create").then(res => {
            console.log(res)
            if(res.success){
                nav('/allauctions')
            }
        })

    }


    return (
        <div className="registerField d-flex f-column j-ard al-center">
            <input type="text" ref={ref.photo} placeholder="Auctioned item photo"/>
            <input type="text" ref={ref.title} placeholder="About item"/>
            <input type="text" ref={ref.price} placeholder="Start price"/>
            <div className="d-flex f-column">
                <h5>Auction time</h5>
                <div className="dropdown">
                    <select onChange={(e) => setValue(e.target.value)} required>
                        <option value="0">Choose time</option>
                        <option value="1">1 min</option>
                        <option value="10">10 min</option>
                        <option value="60">1 hour</option>
                        <option value="300">5 hours</option>
                        <option value="720">12 hours</option>
                        <option value="1440">24 hours</option>
                    </select>
                </div>
            </div>
            <button onClick={createAuction}>Put item to auction</button>
        </div>
    );
};

export default CreateAuction;