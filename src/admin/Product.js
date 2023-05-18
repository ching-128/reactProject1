import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import ReactPaginate from "react-paginate";

const MyProduct = () => {
    const [ allProduct, updateAllproduct ] = useState( [] );
    const getProduct = () => {
        fetch( "http://localhost:1234/product" )
            .then( response => response.json() )
            .then( productArray => {
                updateAllproduct( productArray );
            } )
    }

    //Add new product =>
    const [ pname, setPname ] = useState( "" );
    const [ pprice, setPprice ] = useState( "" );
    const [ pphoto, setPphoto ] = useState( "" );
    const [ pdetails, setDetails ] = useState( "" );
    const [ msg, setMsg ] = useState( "" );

    const save = () => {
        let url = "http://localhost:1234/product";
        let newProduct = {
            "name": pname,
            "price": pprice,
            "photo": pphoto,
            "details": pdetails
        }

        let postOption = {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify( newProduct )
        }

        fetch( url, postOption )
            .then( response => response.json() )
            .then( serverResponse => {
                setMsg( pname + "Uploaded Successfully !" );
                setPname( "" );
                setPprice( "" );
                setPphoto( "" );
                setDetails( "" );
                getProduct();
            } )
    };

    //delete product
    const deleteProduct = ( id ) => {
        let url = "http://localhost:1234/product/" + id;
        let deleteMethod = {
            headers: { "Content-Type": "application/json" },
            method: "DELETE",
        };

        fetch( url, deleteMethod )
            .then( response => response.json() )
            .then( serverRes => {
                getProduct();
            } )
    }

    //search function 
    const [ keyword, setKeyword ] = useState( "" );


    //for pagination
    const PER_PAGE = 2;
    const [ currentPage, setCurrentPage ] = useState( 0 );
    function handlePageClick ( { selected: selectedPage } ) {
        setCurrentPage( selectedPage )
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil( allProduct.length / PER_PAGE );


    useEffect( () => {
        getProduct();
    }, [ 1 ] );

    return (
        <>
            <AdminHeader />
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 mt-5">
                        <div className="p-2 shadow-lg rounded">
                            <h4 className="text-info text-center">Enter Product Details</h4>
                            <div className="my-3">
                                <label htmlFor="pname" className="form-label">Product Name</label>
                                <input type="text" className="form-control" value={pname} onChange={e => setPname( e.target.value )} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pprice" className="form-label">Product Price</label>
                                <input type="text" className="form-control" value={pprice} onChange={e => setPprice( e.target.value )} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pphoto" className="form-label">Product Photo</label>
                                <input type="text" className="form-control" value={pphoto} onChange={e => setPphoto( e.target.value )} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pdetails" className="form-label">Product Details</label>
                                <textarea cols="10" rows="5" className="form-control" value={pdetails} onChange={e => setDetails( e.target.value )}></textarea>
                            </div>
                            <div className="text-center mb-2">
                                <button className="btn btn-primary" onClick={save}>Save product</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 text-center mt-5">
                        <h3 className="text-center">Product List : {allProduct.length}</h3>

                        <input type="text" className="form-control" placeholder="seach..." onChange={e => setKeyword( e.target.value )} />

                        <p className="text-center text-danger">{msg}</p>
                        <table className="table table-bordered bg-secondary bg-opacity-10">
                            <thead>
                                <tr className="bg-light text-primary">
                                    <th>P ID</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Photo</th>
                                    <th>Details</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allProduct.filter( post => {
                                        if ( ( post.name.toLowerCase().includes( keyword.toLowerCase() ) ) ||
                                            ( post.price.toString().includes( keyword ) ) || ( post.details.includes( keyword ) ) ) {
                                            return post;
                                        }
                                    } ).slice( offset, offset + PER_PAGE ).map( ( productInfo, index ) => {
                                        return (
                                            <tr key={index}>
                                                <td>{productInfo.id}</td>
                                                <td>{productInfo.name}</td>
                                                <td>{productInfo.price}</td>
                                                <td>
                                                    <img src={productInfo.photo} alt={productInfo.photo} width={78} height={78} />
                                                </td>
                                                <td>{productInfo.details}</td>
                                                <td>
                                                    <button className="btn btn-outline-warning" onClick={deleteProduct.bind( this, productInfo.id )}>delete</button>
                                                </td>
                                            </tr>
                                        )
                                    } )
                                }
                            </tbody>
                        </table>
                        <div className="mb-4 mt-4 text-center">
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination  justify-content-center"}
                                pageClassName={"page-item "}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active primary"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProduct;