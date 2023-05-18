import React from 'react';
import { Link } from 'react-router-dom';

const PublicHeader = () => {
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand fa-2x" to="/">
                        <i className="fa fa-shopping-bag"></i>
                        React Shopping App
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse text-end" id="mynavbar">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item ms-5">
                                <Link className="nav-link" to="/"><i className="fa fa-home"></i> Shopping</Link>
                            </li>
                            <li className="nav-item ms-5">
                                <Link className="nav-link" to="/cart"><i className="fa fa-shopping-cart"></i> My Cart</Link>
                            </li>
                            <li className="nav-item ms-5">
                                <Link className="nav-link" to="/login"><i className="fa fa-arrow-right"></i> Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default PublicHeader
