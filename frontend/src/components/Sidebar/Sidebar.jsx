import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png";
import { createContext, useContext, useState } from "react";
import "./Sidebar.css"; // Importing the CSS file

const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true);
    
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <div className="sidebar-header">
                    <img src={logo} className={`sidebar-logo ${expanded ? "expanded" : "collapsed"}`} alt="Logo" />
                    <button onClick={() => setExpanded((curr) => !curr)} className="toggle-btn">
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="sidebar-menu">{children}</ul>
                </SidebarContext.Provider>

                <div className="sidebar-footer">
                    <img src={profile} className="profile-pic" alt="Profile" />
                    <div className={`profile-info ${expanded ? "expanded" : "collapsed"}`}>
                        <div className="profile-text">
                            <h4 className="profile-name">constGenius</h4>
                            <span className="profile-email">constgenius@gmail.com</span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, active, alert }) {
    const { expanded } = useContext(SidebarContext);

    return (
        <li className={`sidebar-item ${active ? "active" : ""}`}>
            {icon}
            <span className={`sidebar-text ${expanded ? "expanded" : "collapsed"}`}>{text}</span>
            {alert && <div className="sidebar-alert"></div>}

            {!expanded && (
                <div className="sidebar-tooltip">{text}</div>
            )}
        </li>
    );
}
