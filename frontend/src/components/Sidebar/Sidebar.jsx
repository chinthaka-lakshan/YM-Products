import { ChevronLeft, ChevronRight, MoreVert } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import RepeatIcon from "@mui/icons-material/Repeat";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";


import { createContext, useContext, useState } from "react";
import "./Sidebar.css";

const SidebarContext = createContext();

export default function Sidebar({ onToggle }) {
    const [expanded, setExpanded] = useState(true);
    const [activeItem, setActiveItem] = useState("Dashboard"); // Add state for active item

    const toggleSidebar = () => {
        setExpanded(!expanded);
        onToggle(!expanded);
    };

    const handleItemClick = (text) => {
        setActiveItem(text); // Update active item when clicked
    };

    const menuItems = [
        { icon: <DashboardIcon />, text: "Dashboard" },
        { icon: <InventoryIcon />, text: "Distribution Stock" },
        { icon: <ShoppingCartIcon />, text: "Purchase Stock" },
        { icon: <StorefrontIcon />, text: "Orders" },
        { icon: <RepeatIcon />, text: "Returns" },
        { icon: <StoreIcon />, text: "Shops" },
        { icon: <PeopleIcon />, text: "Representative" },
        { icon: <AttachMoneyIcon />, text: "Cash Flow Analysis" },
    ];

    return (
        <aside className={`sidebar ${expanded ? "" : "collapsed"}`}>
            <nav className="sidebar-nav">
                <div className="sidebar-header">
                    <h2 className="sidebar-title">{expanded ? "DeepNix" : "D"}</h2>
                    <button onClick={toggleSidebar} className="toggle-btn">
                        {expanded ? <ChevronLeft /> : <ChevronRight />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="sidebar-menu">
                        {menuItems.map((item, index) => (
                            <SidebarItem 
                                key={index} 
                                icon={item.icon} 
                                text={item.text} 
                                active={activeItem === item.text}
                                onClick={() => handleItemClick(item.text)}
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
            onClick={onClick} // Add click handler
        >
            {icon}
            <span className={`sidebar-text ${expanded ? "expanded" : "collapsed"}`}>{text}</span>
        </li>
    );
}