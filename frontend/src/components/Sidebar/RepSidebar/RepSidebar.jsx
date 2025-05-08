import React from 'react';
import "./RepSidebar.css";
import Logo from "../../../assets/YM.png";
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import RepeatIcon from "@mui/icons-material/Repeat";
import StorefrontIcon from "@mui/icons-material/Storefront";

const RepSidebar = () => {
    const location = useLocation();

    return (
        <div className='RepSidebar'>
            <div className='Top'>
                <img src={Logo} className='Logo'/>
            </div>
            <div className='Bottom'>
                <ul>
                    <Link to="/repDashboard" style={{textDecoration:"none"}}>
                        <li className={location.pathname === "/repDashboard" ? "active" : ""}>
                            <DashboardIcon className='Icon'/>
                            <span>Rep Dashboard</span>
                        </li>
                    </Link>
                    <Link to="/repOrdersHistory" style={{textDecoration:"none"}}>
                        <li className={location.pathname === "/repOrdersHistory" ? "active" : ""}>
                            <ShoppingBagIcon className='Icon'/>
                            <span>Orders</span>
                        </li>
                    </Link>
                    <Link to="/repReturns" style={{textDecoration:"none"}}>
                        <li className={location.pathname === "/repReturns" ? "active" : ""}>
                            <RepeatIcon className='Icon'/>
                            <span>Returns</span>
                        </li>
                    </Link>
                    <Link to="/repShops" style={{textDecoration:"none"}}>
                        <li className={location.pathname === "/repShops" ? "active" : ""}>
                            <StorefrontIcon className='Icon'/>
                            <span>Shops</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default RepSidebar;