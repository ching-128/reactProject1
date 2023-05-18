import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import MyOrder from './Order';
import MyProduct from './Product';

const AdminApp = () => {
      return (
            <HashRouter>
                  <Routes>
                        <Route exact path='/' element={<Dashboard />} />
                        <Route exact path='product' element={<MyProduct />} />
                        <Route exact path='order' element={<MyOrder />} />
                  </Routes>
            </HashRouter>
      )
}

export default AdminApp;
