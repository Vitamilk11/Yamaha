
import React from 'react';
import { Outlet } from 'react-router';

import Navbar from '../Navbar/Navbar';
import './Layout.css';

function Layout({ tab, setTab, onCreatePost }) {
    return (
        <div>
          
            <div className="layout-container">
                <Navbar tab={tab} setTab={setTab} />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;



