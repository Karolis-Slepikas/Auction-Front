import React, {useContext, useEffect, useState} from 'react';
import http from "../plugins/http"
import MyContext from "../context/MyContext";
import ProductCard from "./ProductCard";

const AllAuctions = () => {

    const [getItemList, setItemList] = useState([])
    const {setUser} = useContext(MyContext)

    useEffect(() => {
        http.get(`allauctions`).then(res => {
            console.log(res)
            if (res.success) {
                setUser(res.findUser)
                setItemList(res.list)
            }
        })
    }, [])

    async function deleteAuction(id){
        http.post({id}, `delete`).then(res => {
            console.log(res)
            setItemList(res.list)

        })

    }

    console.log(getItemList)

    return (
        <div className="d-flex f-wrap j-center">
            {getItemList &&
                getItemList.map((item, index) =>
                    <ProductCard item={item} key={index} productId={deleteAuction} />
                )}
        </div>
    );
};

export default AllAuctions;