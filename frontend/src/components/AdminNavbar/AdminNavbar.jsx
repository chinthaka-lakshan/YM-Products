import React, { useState } from "react";
import "./AdminNavbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AdminNavbar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const toggleLogoutPopup = () => {
    setShowLogout(!showLogout);
  };

  return (
    <div className="AdminNavbar">
      <div className="AdminNavbarContainer">
        <span className="NavbarTitle">ADMIN DASHBOARD</span>
        <div className="NavbarLog" onClick={toggleLogoutPopup}>
          <span>Admin1</span>
          <AccountCircleIcon className="ProfileIcon" />
        </div>
      </div>

      {showLogout && (
        <div className="LogoutPopup">
          <div className="PopupContent">
            <p>Are you sure you want to log out?</p>
            <button className="PopupLogoutButton">Logout</button>
            <button className="PopupCancelButton" onClick={toggleLogoutPopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;