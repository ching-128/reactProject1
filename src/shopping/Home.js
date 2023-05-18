import React, { useState, useEffect } from "react";
import PublicHeader from "./ShoppingHeader";

const Home = () => {
    const [ allProduct, updateAllproduct ] = useState( [] );
    const getProduct = () => {
        fetch( "http://localhost:1234/product" )
            .then( response => response.json() )
            .then( productArray => {
                updateAllproduct( productArray );
            } )
    }

    const [ msg, setMsg ] = useState( "" );
    const addToCart = ( pdata ) => {
        let url = "http://localhost:1234/cart";
        let postOption = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify( pdata )
        }
        fetch( url, postOption )
            .then( response => response.json() )
            .then( serverRespose => {
                setMsg( pdata.name + " - Item Added in Cart" );
            } )
    }

    useEffect( () => {
        getProduct();
    }, [ 1 ] );

    return (
        <>
            <PublicHeader />
            <div className="container">
                <div className="row mt-5">
                    <div className="col-lg-8">
                        <p className="text-center text-danger">{msg}</p>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
                <div className="row mt-4">
                    {
                        allProduct.map( ( product, index ) => {
                            return (
                                <div className="col-lg-3" key={index}>
                                    <div className="card border-0 shadow-lg">
                                        <div className="card-header bg-info text-white">{product.name}</div>
                                        <div className="card-body">
                                            <img src={product.photo} alt={product.photo} width={240} height={150} className="rounded-1 text-center" />
                                            <p>Rs. {product.price}</p>
                                            <p>{product.details}</p>
                                        </div>
                                        <div className="card-footer text-center">
                                            <button className="btn btn-danger btn-sm" onClick={addToCart.bind( this, product )}>
                                                <i className="fa fa-shopping-cart"></i>
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        } )
                    }
                </div>
            </div>
        </>
    )
}
export default Home;