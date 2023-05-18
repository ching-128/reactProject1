import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";

const MyOrder = () => {
    const [ allorders, setAllorders ] = useState( [] );

    const getOrder = () => {
        fetch( "http://localhost:1234/order" )
            .then( response => response.json() )
            .then( orderArray => {
                setAllorders( orderArray );
            } )
    }
    useEffect( () => {
        getOrder();
    }, [ 1 ] );

    return (
        <>
            <AdminHeader />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h3 className="text-info">Order Management : {allorders.length}</h3>
                    </div>
                </div>
                {
                    allorders.map( ( order, index ) => {
                        return (
                            <>
                                <div className="row my-5" key={index}>
                                    <div className="col-lg-4">
                                        <h5>{order.customerInfo.name}</h5>
                                        <p>{order.customerInfo.mobile}</p>
                                        <p>{order.customerInfo.email}</p>
                                        <p>{order.customerInfo.address}</p>
                                    </div>
                                    <div className="col-lg-8">
                                        <h4>Order Item : {order.length}</h4>
                                    </div>
                                </div>
                            </>
                        )
                    } )
                }
            </div>

        </>
    )
}
export default MyOrder;