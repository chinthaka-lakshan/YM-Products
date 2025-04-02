import { ChevronLeft, ChevronRight, MoreVert } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import RepeatIcon from "@mui/icons-material/Repeat";
import StoreIcon from "@mui/icons-material/Store";

import { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import from react-router
import "./RepSidebar.css";

const SidebarContext = createContext();

export default function Sidebar({ onToggle }) {
    const [expanded, setExpanded] = useState(true);
    const navigate = useNavigate(); // Hook to navigate programmatically
    const location = useLocation(); // Hook to get current location

    const toggleSidebar = () => {
        setExpanded(!expanded);
        onToggle(!expanded);
    };

    const menuItems = [
        { icon: <DashboardIcon />, text: "Dashboard", path: "/repdashboard" },
        // { icon: <InventoryIcon />, text: "Distribution Stock", path: "/distribution" },
        // { icon: <ShoppingCartIcon />, text: "Purchase Stock", path: "/purchase" },
        { icon: <StorefrontIcon />, text: "Orders", path: "/repOrdersHistory" },
        { icon: <RepeatIcon />, text: "Returns", path: "/repReturns" },
        { icon: <StoreIcon />, text: "Shops", path: "/repShops" },
        // { icon: <PeopleIcon />, text: "Representative", path: "/repregistration" },
        // { icon: <AttachMoneyIcon />, text: "Cash Flow Analysis", path: "/cash-flow" },
    ];

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <aside className={`sidebar ${expanded ? "" : "collapsed"}`}>
            <nav className="sidebar-nav">
                <div className="sidebar-header">
                    <h2 className="sidebar-title">{expanded ? "DeepNix" : "D"}</h2>
                    {/* <button onClick={toggleSidebar} className="toggle-btn">
                        {expanded ? <ChevronLeft /> : <ChevronRight />}
                    </button> */}
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="sidebar-menu">
                        {menuItems.map((item, index) => (
                            <SidebarItem 
                                key={index} 
                                icon={item.icon} 
                                text={item.text} 
                                active={location.pathname === item.path}
                                onClick={() => handleNavigation(item.path)}
                            />
                        ))}
                    </ul>
                </SidebarContext.Provider>

                <div className="sidebar-footer">
                    <div className={`profile-info ${expanded ? "expanded" : "collapsed"}`}>
                        <h4 className="profile-name">constGenius</h4>
                        <span className="profile-email">constgenius@gmail.com</span>
                    </div>
                    <MoreVert />
                </div>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, active, onClick }) {
    const { expanded } = useContext(SidebarContext);

    return (
        <li 
            className={`sidebar-item ${active ? "active" : ""}`}
            onClick={onClick}
        >
            {icon}
            <span className={`sidebar-text ${expanded ? "expanded" : "collapsed"}`}>{text}</span>
        </li>
    );
}