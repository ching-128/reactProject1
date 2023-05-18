import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
// Importing the Bootstrap 5 CSS
import 'bootstrap/dist/css/bootstrap.min.css';

//Importing the Bootstrap 5 JS
// import 'bootstrap/dist/js/bootstrap.js';

//Importing the icons
import './icon/css/all.css';

import AdminApp from './admin/AdminApp';
import PublicApp from './shopping/App';

import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
if ( localStorage.getItem( "fullname" ) == null ) {
    root.render(
        <React.StrictMode>
            <PublicApp />
        </React.StrictMode>
    );
} else {
    root.render(
        <React.StrictMode>
            <AdminApp />
        </React.StrictMode>
    );
}

reportWebVitals();

