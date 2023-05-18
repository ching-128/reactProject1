import React, { useEffect } from "react";
import { Link, Routes, Route, HashRouter } from "react-router-dom";
import Mycart from "./Cart";
import Home from "./Home";
import LoginPage from "./Login";
function PublicApp () {
    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/cart" element={<Mycart />} />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default PublicApp;
