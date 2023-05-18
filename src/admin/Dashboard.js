import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";

const Dashboard = () => {
    const [ allProduct, updateAllproduct ] = useState( [] );
    const [allorders, setAllorders] = useState([]);

    const getOrder = () =>{
        fetch( "http://localhost:1234/order" )
        .then(response=>response.json())
        .then(orderArray=>{
            setAllorders(orderArray);
        })
    }

    const getProduct = () => {
        fetch( "http://localhost:1234/product" )
            .then( response => response.json() )
            .then( productArray => {
                updateAllproduct( productArray );
            } )
    }

    useEffect( () => {
        getProduct();
        getOrder();
    }, [ 1 ] );

    return (
        <>
            <AdminHeader />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center m-4">
                        <h1 className="text-primary">Dashboard</h1>
                    </div>
                    <div className="col-lg-2"></div>
                    <div className="col-lg-4">
                        <div className="p-4 rounded shadow-lg text-center">
                            <i className="fa fa-suitcase fa-3x text-primary mb-2"></i>
                            <h3>Total product - {allProduct.length}</h3>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="p-4 rounded shadow-lg text-center">
                            <i className="fa fa-headset fa fa-3x text-primary mb-2"></i>
                            <h4>Total Orders - {allorders.length}</h4>
                        </div>
                    </div>
                    <div className="col-lg-2"></div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;