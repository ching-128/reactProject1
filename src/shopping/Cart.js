import React, { useState, useEffect } from 'react';

import PublicHeader from './ShoppingHeader';
const Mycart = () => {
    let [ allproduct, updateProduct ] = useState( [] );
    const getProduct = () => {
        fetch( "http://localhost:1234/cart" )
            .then( response => response.json() )
            .then( productArray => {
                updateProduct( productArray );
            } )
    }

    const deleteCart = ( pid ) => {
        let url = "http://localhost:1234/cart/" + pid;
        let postData = {
            method: "DELETE"
        }
        fetch( url, postData )
            .then( response => response.json() )
            .then( serverResponse => {
                getProduct();
            } )
    }

    useEffect( () => {
        getProduct();
    }, [ 1 ] );


    const [ customerName, setCustomerName ] = useState( "" );
    const [ customerNumber, setCustomerNumber ] = useState( "" );
    const [ customerEmail, setCustomerEmail ] = useState( "" );
    const [ delivaryAddress, setDelivaryAddress ] = useState( "" );
    const [ msg, setMsg ] = useState( "" );

    const save = () => {
        let url = "http://localhost:1234/order/";
        let orderData = {
            customerInfo: {
                name: customerName,
                mobile: customerNumber,
                email: customerEmail,
                address: delivaryAddress
            },
            itemList: allproduct
        }
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify( orderData )
        };

        fetch( url, postData )
            .then( response => response.json() )
            .then( serverResponse => {
                setMsg( "Order Received, order ID is : " + serverResponse.id );
            } )
    }

    return (
        <>
            <PublicHeader />
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-lg-4'>
                        <h3 className='text-center'>Customer Details</h3>
                        <div className="mb-3">
                            <label htmlFor="" className="input-label">Enter Your Name</label>
                            <input type="text" className='form-control' onChange={e => setCustomerName( e.target.value )} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="input-label">Enter Your Mobile Number</label>
                            <input type="number" className='form-control' onChange={e => setCustomerNumber( e.target.value )} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="input-label">Enter Your Email</label>
                            <input type="email" className='form-control' onChange={e => setCustomerEmail( e.target.value )} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="input-label">Enter Delivery Address</label>
                            <textarea className='form-control' cols="30" rows="5" onChange={e => setDelivaryAddress( e.target.value )} ></textarea>
                        </div>
                        <div className="mb-3">
                            <button className='btn btn-outline-primary' onClick={save}>Place Order</button>
                        </div>
                    </div>
                    <div className='col-lg-8'>
                        <h3 className='text-center'> Items in cart : {allproduct.length}</h3>
                        <p className='text-danger text-center'>{msg}</p>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th> Product</th>
                                    <th>Price</th>
                                    <th>Photo</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allproduct.map( ( product, index ) => {
                                        return (
                                            <tr key={index}>
                                                <td> {product.name}</td>
                                                <td> {product.price}</td>
                                                <td> <img src={product.photo} height="50" width="50" /></td>
                                                <td>
                                                    <button className='btn btn-danger btn-sm' onClick={deleteCart.bind( this, product.id )}> Delete </button>
                                                </td>
                                            </tr>
                                        )
                                    } )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </>
    );
};
export default Mycart;