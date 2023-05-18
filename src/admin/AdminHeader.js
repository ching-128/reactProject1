import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminHeader () {
      const logOut = () =>{
            localStorage.clear(); //delete all data from localstorage.
            window.location.href="http://localhost:3000/#/";
            window.location.reload();
      }
      return (
            <div className='container mt-5'>
                  <div className="row mb-2">
                        <div className="col-lg-5 text-center">
                              <h2 className=' text-capitalize text-primary'>
                                    <i className='fa fa-shopping-bag text-danger pe-2'></i>
                                    Order Management App
                              </h2>
                        </div>
                        <div className="col-lg-7 text-end">
                              <div className="btn-group">
                                    <Link to="/" className='btn btn-primary'>
                                          <i className='fa fa-home pe-1'></i>
                                          Dashboard
                                    </Link>
                                    <Link to="/product" className='btn btn-info'>
                                          <i className='fa fa-suitcase pe-1'></i>
                                          Manage Product
                                    </Link>
                                    <Link to="/order" className='btn btn-warning'>
                                          <i className='fa fa-headset pe-1'></i>
                                          Manage Order
                                    </Link>
                                    <button className='btn btn-danger' onClick={logOut}>
                                          <i className='fa fa-power-off pe-1'></i>
                                          {localStorage.getItem("fullname")}Logout
                                    </button>
                              </div>
                        </div>
                  </div>

            </div>
      )
}
