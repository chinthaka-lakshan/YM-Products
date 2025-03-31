import React, { useState } from "react";
import "./topBar.css";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu, FiLogOut } from "react-icons/fi"; // Icons
import Sidebar from "../Sidebar/AdminSidebar/AdminSidebar";

const TopBar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true); // ✅ State for sidebar toggle

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className={`topbar ${sidebarExpanded ? "expanded" : "collapsed"}`}>
      {/* Sidebar Component with Toggle Function */}
      <Sidebar toggleSidebar={toggleSidebar} expanded={sidebarExpanded} />

      {/* Left side - Logo */}
      <div className="topbar-left">
        <span className="logo">
          <span className="logo-highlight">YM</span> Products
        </span>
      </div>

      {/* Right side - Admin Info */}
      <div className="topbar-right">
        {/* Mobile Menu Icon */}
        <div className="menu-icon">
          <FiMenu />
        </div>

        {/* User Icon */}
        <div className="user-container" onClick={() => setShowLogout(!showLogout)}>
          <FaUserCircle className="admin-icon" />
          <span className="admin-name">Admin</span>

          {/* Logout option (hidden until clicked) */}
          {showLogout && (
            <div className="logout-dropdown">
              <FiLogOut className="logout-icon" />
              <span className="logout-text">Log Out</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
