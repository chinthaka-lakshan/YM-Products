import React, { useState } from "react";
import "./topBar.css";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi"; // Logout icon
import Sidebar from "../Sidebar/Sidebar";

const TopBar = () => {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="topbar">
      <Sidebar/>
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
