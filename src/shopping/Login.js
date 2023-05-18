import React, { useState, useEffect } from "react";
import PublicHeader from "./ShoppingHeader";

const LoginPage = () => {
    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ msg, setMsg ] = useState( "" );

    const loginCheck = () => {
        if ( email == "" || password == "" ) {
            setMsg( "Enter Login  Deatils..." );
        } else {
            setMsg("Please wait Processing...");
            let url = "http://localhost:1234/account?email=" + email + "&password=" + password;
            fetch( url )
                .then( response => response.json() )
                .then( userinfo => {
                    if(userinfo.length == 0){
                        setMsg("Invalid or Not exists...")
                    }else{
                        setMsg("Sucuss ! wait Redirecting...")
                        localStorage.setItem("fullname",userinfo[0].name);
                        localStorage.setItem("vid",userinfo[0].id);
                        window.location.href ="http://localhost:3000/#/";
                        window.location.reload();
                    }
                } )
        }
    }
    return (
        <>
            <PublicHeader />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <p className="text-center">{msg}</p>
                        <div className="card border-0 shadow-lg">
                            <div className="card-header bg-primary text-white h3">
                                Vendor Login
                            </div>
                            <div className="card-body">
                                <div className="mb-4">
                                    <label htmlFor="" className="form-label">E-mail Id</label>
                                    <input type="email" className="form-control" onChange={e => setEmail( e.target.value )} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="" className="form-label">Password</label>
                                    <input type="password" className="form-control" onChange={e => setPassword( e.target.value )} />
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <button className="btn btn-danger" onClick={loginCheck}>Login</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        </>
    )
}
export default LoginPage;